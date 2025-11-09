# 📌 Portfolio - Marc Xavier Marques

> Portfolio one-page moderne et responsive développé avec Next.js et Supabase, présentant mes compétences en développement Full Stack.

![Next.js](https://img.shields.io/badge/Next.js-15.3.3-black?style=flat-square&logo=next.js)
![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue?style=flat-square&logo=typescript)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4.0-38B2AC?style=flat-square&logo=tailwind-css)
![Supabase](https://img.shields.io/badge/Supabase-Cloud-3ECF8E?style=flat-square&logo=supabase)

## 🧾 Description du projet

Portfolio interactif one-page présentant mon parcours en tant que développeur Full Stack étudiant à **Web@cadémie by Epitech**. Le site met en avant mes projets, compétences techniques et expériences à travers une interface moderne et intuitive avec un backend cloud déployable.

### ✨ Fonctionnalités principales

- 🎨 **Design moderne** avec animations fluides et glassmorphism
- 📱 **Responsive design** adapté à tous les écrans (mobile, tablet, desktop)
- 🎯 **Navigation smooth** avec menu hamburger animé
- 🌀 **Galerie de projets 3D** interactive et immersive
- 📧 **Formulaire de contact** fonctionnel avec envoi d'emails
- 🗄️ **Base de données cloud** Supabase pour stocker les messages
- ⚡ **Performance optimisée** avec Next.js 15 et App Router
- 🔐 **Sécurité renforcée** avec Row Level Security (RLS)

## 🚀 Stack technique

### Frontend
- **[Next.js 15.3.3](https://nextjs.org/)** - Framework React avec App Router
- **[TypeScript 5](https://www.typescriptlang.org/)** - Typage statique
- **[Tailwind CSS 4](https://tailwindcss.com/)** - Framework CSS utilitaire
- **[React 19](https://reactjs.org/)** - Bibliothèque UI

### Backend
- **[Express 5.1.0](https://expressjs.com/)** - Framework Node.js
- **[Supabase](https://supabase.com/)** - Base de données PostgreSQL cloud
- **[Nodemailer 7.0.5](https://nodemailer.com/)** - Envoi d'emails via SMTP
- **[Brevo SMTP](https://www.brevo.com/)** - Service d'envoi d'emails

### DevOps & Outils
- **[ESLint](https://eslint.org/)** - Linting et qualité du code
- **[PostCSS](https://postcss.org/)** - Traitement CSS
- **[Git](https://git-scm.com/)** - Contrôle de version
- **[dotenv](https://github.com/motdotla/dotenv)** - Gestion des variables d'environnement

## ⚡ Démarrage rapide

### Prérequis
- **Node.js** 18+ installé
- Compte **Supabase** (gratuit)
- Compte **Brevo** pour les emails (gratuit)

### Installation en 3 étapes

#### 1️⃣ Configuration de Supabase (2 min)

1. Allez sur https://supabase.com/dashboard/project/jxpgymxnfufydzasreat
2. Cliquez sur **SQL Editor**
3. Exécutez le script `supabase/schema.sql`

#### 2️⃣ Variables d'environnement (1 min)

**📋 Toutes les valeurs sont dans `CONFIG_ENV.md` - Prêtes à copier !**

**Script automatique** (recommandé) :
```bash
# Exécutez à la racine du projet
cat > .env.local << 'EOF'
NEXT_PUBLIC_SUPABASE_URL=https://jxpgymxnfufydzasreat.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imp4cGd5bXhuZnVmeWR6YXNyZWF0Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjI2MTg4MjIsImV4cCI6MjA3ODE5NDgyMn0.RutnW88mfBKKfNXzLla7XlxBeVNKBrO2sgQYa0av4r8
NEXT_PUBLIC_API_URL=http://localhost:5000
EOF

cat > backend/.env << 'EOF'
SUPABASE_URL=https://jxpgymxnfufydzasreat.supabase.co
SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imp4cGd5bXhuZnVmeWR6YXNyZWF0Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjI2MTg4MjIsImV4cCI6MjA3ODE5NDgyMn0.RutnW88mfBKKfNXzLla7XlxBeVNKBrO2sgQYa0av4r8
SMTP_HOST=smtp-relay.brevo.com
SMTP_PORT=587
SMTP_USER=87588a002@smtp-brevo.com
SMTP_PASS=aX7NUTm3JGKOfZwF
EMAIL_FROM=no-reply@portfolio.com
EMAIL_TO=marquesmarcxavier@gmail.com
PORT=5000
EOF
```

✅ Les fichiers sont **prêts à l'emploi** avec les vraies valeurs

#### 3️⃣ Lancement (30 sec)

```bash
# Terminal 1 - Backend
cd backend
npm install
npm start

# Terminal 2 - Frontend
npm install
npm run dev
```

Ouvrez **http://localhost:3000** 🚀

### Scripts disponibles

**Frontend**
```bash
npm run dev          # Serveur de développement
npm run build        # Build de production
npm start            # Serveur de production
npm run lint         # Vérification ESLint
```

**Backend**
```bash
npm start            # Démarrer le serveur
npm run dev          # Mode développement
npm test             # Tester l'API
```

## 📁 Structure du projet

```
portfolio-marco/
├── 📁 app/                         # Application Next.js (App Router)
│   ├── 📁 components/              # Composants React
│   │   ├── Header.tsx              # Menu de navigation animé
│   │   ├── Presentation.tsx        # Section hero
│   │   ├── About.tsx               # À propos
│   │   ├── Skills.tsx              # Compétences avec onglets
│   │   ├── Projects.tsx            # Galerie 3D interactive
│   │   ├── CV.tsx                  # Curriculum vitae
│   │   ├── Contact.tsx             # Formulaire de contact
│   │   └── Footer.tsx              # Pied de page
│   ├── globals.css                 # Styles globaux (1700+ lignes)
│   ├── layout.tsx                  # Layout + SEO
│   └── page.tsx                    # Page principale
│
├── 📁 backend/                     # API REST Express
│   ├── server.js                   # Serveur backend
│   ├── test-api.js                 # Script de test
│   ├── package.json                # Dépendances backend
│   └── README.md                   # Documentation API
│
├── 📁 lib/                         # Utilitaires
│   └── supabase.ts                 # Client Supabase
│
├── 📁 supabase/                    # Configuration BDD
│   ├── schema.sql                  # Schéma de la base
│   └── README.md                   # Doc Supabase
│
├── 📁 public/                      # Assets statiques
│   ├── images/                     # Images du portfolio
│   └── cv/                         # CV téléchargeable
│
├── .env.local                      # ⚠️ Variables frontend (à créer)
├── .env.example                    # Template de configuration
├── tailwind.config.ts              # Configuration Tailwind
├── next.config.ts                  # Configuration Next.js
├── package.json                    # Dépendances frontend
└── README.md                       # Documentation principale
```

## 🌐 Déploiement

Le projet est prêt pour le déploiement sur plusieurs plateformes :

### Plateformes recommandées

**Frontend (Next.js)**
- **Vercel** (recommandé) - Intégration native avec Next.js
- **Netlify** - Alternative simple
- **VPS** - Contrôle total

**Backend (Express)**
- **Railway** (recommandé) - Déploiement facile
- **Render** - Plan gratuit disponible
- **Heroku** - Classique et fiable
- **VPS** - Contrôle complet

### Variables de production

Configurez ces variables sur votre plateforme de déploiement :

**Frontend**
```env
NEXT_PUBLIC_SUPABASE_URL=votre_url_supabase
NEXT_PUBLIC_SUPABASE_ANON_KEY=votre_anon_key
NEXT_PUBLIC_API_URL=https://votre-backend.com
```

**Backend**
```env
SUPABASE_URL=votre_url_supabase
SUPABASE_ANON_KEY=votre_anon_key
SMTP_HOST=smtp-relay.brevo.com
SMTP_PORT=587
SMTP_USER=votre_user
SMTP_PASS=votre_pass
EMAIL_TO=votre@email.com
PORT=5000
NODE_ENV=production
```

### Checklist de déploiement

- [ ] Build de production testé localement (`npm run build`)
- [ ] Variables d'environnement configurées
- [ ] Table Supabase créée en production
- [ ] DNS configuré (si domaine personnalisé)
- [ ] SSL/HTTPS activé
- [ ] Tester le formulaire de contact en production

## 👤 Auteur

**Marc Xavier Marques**  
Développeur Full Stack - Web@cadémie by Epitech

- 🎓 **Formation** : Web@cadémie by Epitech (2023-2025)
- 🌍 **Localisation** : Paris, France
- 💼 **Statut** : Ouvert aux opportunités

## 🔗 Liens

- 📧 **Email** : [marquesmarcxavier@gmail.com](mailto:marquesmarcxavier@gmail.com)
- 📱 **Téléphone** : [+33 6 15 84 11 75](tel:+33615841175)
- 🐙 **GitHub** : [MarquesMarco1](https://github.com/orgs/MarquesMarco1)
- 🌐 **Portfolio** : [En ligne bientôt sur VPS]

## 📝 License

Ce projet est sous licence **MIT** - voir le fichier [LICENSE](LICENSE) pour plus de détails.

---

### 🛠️ Contribution

Les suggestions et améliorations sont les bienvenues ! N'hésitez pas à :

1. **Fork** le projet
2. **Créer** une branche pour votre fonctionnalité
3. **Commit** vos changements
4. **Push** vers la branche
5. **Ouvrir** une Pull Request

---

<div align="center">

**Développé avec ❤️ par Marc Xavier Marques**

*Next.js • TypeScript • Tailwind CSS*

</div>
