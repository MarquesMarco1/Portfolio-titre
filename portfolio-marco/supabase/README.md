# Configuration Supabase

## 📋 Instructions de mise en place

### 1. Créer la table dans Supabase

1. Connectez-vous à votre projet Supabase : https://supabase.com/dashboard/project/jxpgymxnfufydzasreat
2. Allez dans **SQL Editor**
3. Copiez et exécutez le contenu du fichier `schema.sql`
4. Vérifiez que la table `contacts` a été créée dans **Table Editor**

### 2. Configuration des variables d'environnement

#### Frontend (`.env.local`)
```env
NEXT_PUBLIC_SUPABASE_URL=https://jxpgymxnfufydzasreat.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imp4cGd5bXhuZnVmeWR6YXNyZWF0Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjI2MTg4MjIsImV4cCI6MjA3ODE5NDgyMn0.RutnW88mfBKKfNXzLla7XlxBeVNKBrO2sgQYa0av4r8
NEXT_PUBLIC_API_URL=http://localhost:5000
```

#### Backend (`backend/.env`)
```env
SUPABASE_URL=https://jxpgymxnfufydzasreat.supabase.co
SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imp4cGd5bXhuZnVmeWR6YXNyZWF0Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjI2MTg4MjIsImV4cCI6MjA3ODE5NDgyMn0.RutnW88mfBKKfNXzLla7XlxBeVNKBrO2sgQYa0av4r8

# Email Configuration (Brevo SMTP)
SMTP_HOST=smtp-relay.brevo.com
SMTP_PORT=587
SMTP_USER=87588a002@smtp-brevo.com
SMTP_PASS=aX7NUTm3JGKOfZwF
EMAIL_FROM=no-reply@portfolio.com
EMAIL_TO=marquesmarcxavier@gmail.com

PORT=5000
```

### 3. Structure de la base de données

#### Table `contacts`
| Colonne | Type | Description |
|---------|------|-------------|
| id | BIGSERIAL | Identifiant unique (auto-incrémenté) |
| nom | VARCHAR(255) | Nom complet de l'expéditeur |
| email | VARCHAR(255) | Email de l'expéditeur (validé) |
| sujet | VARCHAR(255) | Sujet du message |
| message | TEXT | Contenu du message |
| created_at | TIMESTAMP | Date de création (UTC) |

### 4. Sécurité (RLS - Row Level Security)

- ✅ **INSERT** : Accessible publiquement (anonyme)
- ✅ **SELECT** : Uniquement pour les utilisateurs authentifiés
- ❌ **UPDATE/DELETE** : Désactivé par défaut

### 5. Test de la connexion

```bash
# Frontend
npm run dev

# Backend (dans un autre terminal)
cd backend
node server.js
```

## 🔗 Liens utiles

- Dashboard Supabase : https://supabase.com/dashboard/project/jxpgymxnfufydzasreat
- Table Editor : https://supabase.com/dashboard/project/jxpgymxnfufydzasreat/editor
- SQL Editor : https://supabase.com/dashboard/project/jxpgymxnfufydzasreat/sql

