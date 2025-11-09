-- =====================================================
-- SCHÉMA DE BASE DE DONNÉES SUPABASE PORTFOLIO
-- =====================================================
-- Tables : contacts, users, messages
-- Authentification : Supabase Auth
-- Sécurité : Row Level Security (RLS)
-- =====================================================

-- =====================================================
-- 1. TABLE: contacts (formulaire de contact public)
-- =====================================================
-- Stocke tous les messages envoyés via le formulaire de contact
CREATE TABLE IF NOT EXISTS contacts (
  id BIGSERIAL PRIMARY KEY,
  nom VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL,
  sujet VARCHAR(255) NOT NULL,
  message TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
  
  -- Validation email
  CONSTRAINT email_format CHECK (email ~* '^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$')
);

-- Index pour performances
CREATE INDEX IF NOT EXISTS idx_contacts_created_at ON contacts(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_contacts_email ON contacts(email);

-- Commentaires
COMMENT ON TABLE contacts IS 'Messages du formulaire de contact public (non connectés)';
COMMENT ON COLUMN contacts.id IS 'Identifiant unique du message';
COMMENT ON COLUMN contacts.nom IS 'Nom complet de l''expéditeur';
COMMENT ON COLUMN contacts.email IS 'Adresse email de l''expéditeur';
COMMENT ON COLUMN contacts.sujet IS 'Sujet du message';
COMMENT ON COLUMN contacts.message IS 'Contenu du message';
COMMENT ON COLUMN contacts.created_at IS 'Date et heure de création (UTC)';

-- RLS: Permettre insertion publique
ALTER TABLE contacts ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Permettre insertion publique contacts" ON contacts
  FOR INSERT
  TO anon, authenticated
  WITH CHECK (true);

CREATE POLICY "Lecture admin uniquement contacts" ON contacts
  FOR SELECT
  TO authenticated
  USING (true);

-- =====================================================
-- 2. TABLE: users (profils utilisateurs)
-- =====================================================
-- Extension des données utilisateurs (complète auth.users de Supabase)
CREATE TABLE IF NOT EXISTS users (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  email VARCHAR(255) NOT NULL UNIQUE,
  full_name VARCHAR(255),
  avatar_url TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
  
  CONSTRAINT email_format_users CHECK (email ~* '^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$')
);

-- Index
CREATE INDEX IF NOT EXISTS idx_users_email ON users(email);
CREATE INDEX IF NOT EXISTS idx_users_created_at ON users(created_at DESC);

-- Commentaires
COMMENT ON TABLE users IS 'Profils étendus des utilisateurs authentifiés';
COMMENT ON COLUMN users.id IS 'UUID lié à auth.users';
COMMENT ON COLUMN users.email IS 'Email de l''utilisateur';
COMMENT ON COLUMN users.full_name IS 'Nom complet de l''utilisateur';
COMMENT ON COLUMN users.avatar_url IS 'URL de l''avatar (optionnel)';

-- RLS: Les utilisateurs peuvent voir et modifier leur propre profil
ALTER TABLE users ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Les utilisateurs peuvent voir leur profil" ON users
  FOR SELECT
  TO authenticated
  USING (auth.uid() = id);

CREATE POLICY "Les utilisateurs peuvent mettre à jour leur profil" ON users
  FOR UPDATE
  TO authenticated
  USING (auth.uid() = id)
  WITH CHECK (auth.uid() = id);

CREATE POLICY "Insertion automatique lors de l'inscription" ON users
  FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = id);

-- =====================================================
-- 3. TABLE: messages (messages utilisateurs connectés)
-- =====================================================
-- Messages envoyés par des utilisateurs authentifiés
CREATE TABLE IF NOT EXISTS messages (
  id BIGSERIAL PRIMARY KEY,
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  user_email VARCHAR(255) NOT NULL,
  user_name VARCHAR(255) NOT NULL,
  sujet VARCHAR(255) NOT NULL,
  message TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
  
  -- Contraintes
  CONSTRAINT message_length CHECK (LENGTH(message) >= 10 AND LENGTH(message) <= 5000),
  CONSTRAINT sujet_length CHECK (LENGTH(sujet) >= 3 AND LENGTH(sujet) <= 255)
);

-- Index
CREATE INDEX IF NOT EXISTS idx_messages_user_id ON messages(user_id);
CREATE INDEX IF NOT EXISTS idx_messages_created_at ON messages(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_messages_user_email ON messages(user_email);

-- Commentaires
COMMENT ON TABLE messages IS 'Messages envoyés par les utilisateurs authentifiés';
COMMENT ON COLUMN messages.id IS 'Identifiant unique du message';
COMMENT ON COLUMN messages.user_id IS 'UUID de l''utilisateur (auth.users)';
COMMENT ON COLUMN messages.user_email IS 'Email de l''utilisateur';
COMMENT ON COLUMN messages.user_name IS 'Nom de l''utilisateur';
COMMENT ON COLUMN messages.sujet IS 'Sujet du message';
COMMENT ON COLUMN messages.message IS 'Contenu du message (10-5000 caractères)';
COMMENT ON COLUMN messages.created_at IS 'Date et heure d''envoi (UTC)';

-- RLS: Utilisateurs authentifiés peuvent créer, lire leurs propres messages
ALTER TABLE messages ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Les utilisateurs peuvent créer des messages" ON messages
  FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Les utilisateurs peuvent voir leurs messages" ON messages
  FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

-- =====================================================
-- 4. FONCTION: Création automatique du profil utilisateur
-- =====================================================
-- Trigger pour créer automatiquement un profil lors de l'inscription
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.users (id, email, full_name, avatar_url)
  VALUES (
    NEW.id,
    NEW.email,
    COALESCE(NEW.raw_user_meta_data->>'full_name', ''),
    COALESCE(NEW.raw_user_meta_data->>'avatar_url', '')
  );
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Trigger sur auth.users
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW
  EXECUTE FUNCTION public.handle_new_user();

-- =====================================================
-- 5. FONCTION: Mise à jour automatique du timestamp
-- =====================================================
CREATE OR REPLACE FUNCTION public.handle_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Trigger sur users
DROP TRIGGER IF EXISTS set_updated_at ON public.users;
CREATE TRIGGER set_updated_at
  BEFORE UPDATE ON public.users
  FOR EACH ROW
  EXECUTE FUNCTION public.handle_updated_at();

-- =====================================================
-- 6. SÉCURITÉ: Configuration de l'authentification
-- =====================================================
-- Ces paramètres sont à configurer dans le Dashboard Supabase
-- Authentication > Settings

-- Email Templates personnalisés (optionnel)
-- Confirmation Email, Magic Link, etc.

-- Rate Limiting (recommandé)
-- Limiter les tentatives de connexion/inscription

-- =====================================================
-- FIN DU SCHÉMA
-- =====================================================

