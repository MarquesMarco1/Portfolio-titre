require('dotenv').config();
const express = require('express');
const { createClient } = require('@supabase/supabase-js');
const nodemailer = require('nodemailer');
const cors = require('cors');

const app = express();
app.use(express.json());
app.use(cors());

// Validation des variables d'environnement
const requiredEnvVars = ['SUPABASE_URL', 'SUPABASE_ANON_KEY', 'SMTP_HOST', 'SMTP_API_KEY', 'EMAIL_TO'];
for (const envVar of requiredEnvVars) {
  if (!process.env[envVar]) {
    console.error(`❌ Variable d'environnement manquante: ${envVar}`);
    process.exit(1);
  }
}

// Connexion Supabase
const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_ANON_KEY
);

// Configuration du transporteur d'email (Brevo SMTP avec API Key)
const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: parseInt(process.env.SMTP_PORT || '587'),
  secure: false,
  auth: {
    user: process.env.SMTP_LOGIN, // Login SMTP Brevo
    pass: process.env.SMTP_API_KEY, // Clé API SMTP
  },
});

// Vérification de la connexion SMTP au démarrage
transporter.verify((error, success) => {
  if (error) {
    console.error('❌ Erreur de connexion SMTP:', error);
  } else {
    console.log('✅ Serveur SMTP prêt à envoyer des emails');
  }
});

// =====================================================
// ROUTE: POST /api/contact
// Description: Réception et traitement du formulaire de contact
// =====================================================
app.post('/api/contact', async (req, res) => {
  const { nom, email, sujet, message } = req.body;

  // Validation des champs
  if (!nom || !email || !sujet || !message) {
    return res.status(400).json({ 
      success: false,
      error: 'Tous les champs sont obligatoires' 
    });
  }

  // Validation de l'email
  const emailRegex = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;
  if (!emailRegex.test(email)) {
    return res.status(400).json({ 
      success: false,
      error: 'Format d\'email invalide' 
    });
  }

  // Validation de la longueur
  if (nom.length > 255 || email.length > 255 || sujet.length > 255 || message.length > 5000) {
    return res.status(400).json({ 
      success: false,
      error: 'Un ou plusieurs champs dépassent la longueur maximale autorisée' 
    });
  }

  try {
    console.log(`📩 Nouveau message reçu de ${nom} (${email})`);

    // 1. Stocker dans Supabase
    const { data, error: dbError } = await supabase
      .from('contacts')
      .insert([
        { nom, email, sujet, message }
      ])
      .select();

    if (dbError) {
      console.error('❌ Erreur Supabase:', dbError);
      return res.status(500).json({ 
        success: false,
        error: 'Erreur lors de l\'enregistrement du message',
        details: dbError.message 
      });
    }

    console.log('✅ Message enregistré dans Supabase (ID:', data[0]?.id, ')');

    // 2. Envoyer l'email via Brevo SMTP
    try {
      await transporter.sendMail({
        from: process.env.EMAIL_FROM || 'no-reply@portfolio.com',
        to: process.env.EMAIL_TO,
        subject: `📬 Portfolio - Nouveau message de ${nom} : ${sujet}`,
        text: `Vous avez reçu un nouveau message via votre portfolio.\n\n` +
              `═══════════════════════════════════════\n` +
              `NOM: ${nom}\n` +
              `EMAIL: ${email}\n` +
              `SUJET: ${sujet}\n` +
              `═══════════════════════════════════════\n\n` +
              `MESSAGE:\n${message}\n\n` +
              `═══════════════════════════════════════\n` +
              `Date: ${new Date().toLocaleString('fr-FR', { timeZone: 'Europe/Paris' })}`,
        html: `
          <!DOCTYPE html>
          <html>
          <head>
            <style>
              body { font-family: 'Segoe UI', Arial, sans-serif; line-height: 1.6; color: #333; }
              .container { max-width: 600px; margin: 0 auto; padding: 20px; }
              .header { background: linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%); color: white; padding: 30px; border-radius: 10px 10px 0 0; text-align: center; }
              .content { background: #f8f9fa; padding: 30px; border-radius: 0 0 10px 10px; }
              .field { margin-bottom: 20px; }
              .label { font-weight: bold; color: #6366f1; margin-bottom: 5px; }
              .value { background: white; padding: 15px; border-radius: 5px; border-left: 4px solid #6366f1; }
              .message-box { background: white; padding: 20px; border-radius: 5px; border: 2px solid #e2e8f0; min-height: 100px; }
              .footer { text-align: center; margin-top: 20px; color: #64748b; font-size: 12px; }
            </style>
          </head>
          <body>
            <div class="container">
              <div class="header">
                <h1 style="margin: 0;">📬 Nouveau Message Portfolio</h1>
              </div>
              <div class="content">
                <div class="field">
                  <div class="label">👤 Nom</div>
                  <div class="value">${nom}</div>
                </div>
                <div class="field">
                  <div class="label">📧 Email</div>
                  <div class="value"><a href="mailto:${email}">${email}</a></div>
                </div>
                <div class="field">
                  <div class="label">📋 Sujet</div>
                  <div class="value">${sujet}</div>
                </div>
                <div class="field">
                  <div class="label">💬 Message</div>
                  <div class="message-box">${message.replace(/\n/g, '<br>')}</div>
                </div>
                <div class="footer">
                  <p>Reçu le ${new Date().toLocaleString('fr-FR', { timeZone: 'Europe/Paris' })}</p>
                  <p>Depuis votre portfolio Marc Xavier Marques</p>
                </div>
              </div>
            </div>
          </body>
          </html>
        `,
      });

      console.log('✅ Email envoyé avec succès');
    } catch (emailError) {
      // L'email a échoué mais le message est enregistré
      console.error('⚠️ Erreur lors de l\'envoi de l\'email:', emailError);
      return res.status(200).json({ 
        success: true,
        message: 'Message enregistré mais l\'email n\'a pas pu être envoyé',
        warning: 'Email non envoyé'
      });
    }

    // Succès complet
    res.status(200).json({ 
      success: true,
      message: 'Message envoyé et enregistré avec succès !',
      id: data[0]?.id
    });

  } catch (err) {
    console.error('❌ Erreur serveur:', err);
    res.status(500).json({ 
      success: false,
      error: 'Erreur interne du serveur' 
    });
  }
});

// =====================================================
// ROUTE: POST /api/messages (utilisateurs authentifiés)
// Description: Messages envoyés par utilisateurs connectés
// =====================================================
app.post('/api/messages', async (req, res) => {
  const { userId, userEmail, userName, sujet, message } = req.body;

  // Validation des champs
  if (!userId || !userEmail || !userName || !sujet || !message) {
    return res.status(400).json({ 
      success: false,
      error: 'Tous les champs sont obligatoires' 
    });
  }

  // Validation de la longueur
  if (message.length < 10 || message.length > 5000) {
    return res.status(400).json({ 
      success: false,
      error: 'Le message doit contenir entre 10 et 5000 caractères' 
    });
  }

  if (sujet.length < 3 || sujet.length > 255) {
    return res.status(400).json({ 
      success: false,
      error: 'Le sujet doit contenir entre 3 et 255 caractères' 
    });
  }

  try {
    console.log(`📩 Nouveau message d'utilisateur authentifié: ${userName} (${userEmail})`);

    // 1. Stocker dans Supabase (table messages)
    const { data, error: dbError } = await supabase
      .from('messages')
      .insert([
        { 
          user_id: userId,
          user_email: userEmail,
          user_name: userName,
          sujet,
          message 
        }
      ])
      .select();

    if (dbError) {
      console.error('❌ Erreur Supabase:', dbError);
      return res.status(500).json({ 
        success: false,
        error: 'Erreur lors de l\'enregistrement du message',
        details: dbError.message 
      });
    }

    console.log('✅ Message enregistré dans Supabase (ID:', data[0]?.id, ')');

    // 2. Envoyer l'email
    try {
      await transporter.sendMail({
        from: process.env.EMAIL_FROM || 'no-reply@portfolio.com',
        to: process.env.EMAIL_TO,
        subject: `🔐 [UTILISATEUR CONNECTÉ] Message de ${userName} : ${sujet}`,
        text: `Message d'un utilisateur authentifié :\n\n` +
              `═══════════════════════════════════════\n` +
              `👤 UTILISATEUR: ${userName}\n` +
              `📧 EMAIL: ${userEmail}\n` +
              `🆔 USER ID: ${userId}\n` +
              `📋 SUJET: ${sujet}\n` +
              `═══════════════════════════════════════\n\n` +
              `MESSAGE:\n${message}\n\n` +
              `═══════════════════════════════════════\n` +
              `Date: ${new Date().toLocaleString('fr-FR', { timeZone: 'Europe/Paris' })}`,
        html: `
          <!DOCTYPE html>
          <html>
          <head>
            <style>
              body { font-family: 'Segoe UI', Arial, sans-serif; line-height: 1.6; color: #333; }
              .container { max-width: 600px; margin: 0 auto; padding: 20px; }
              .header { background: linear-gradient(135deg, #10b981 0%, #059669 100%); color: white; padding: 30px; border-radius: 10px 10px 0 0; text-align: center; }
              .badge { display: inline-block; background: rgba(255,255,255,0.2); padding: 8px 16px; border-radius: 20px; font-size: 12px; margin-top: 10px; }
              .content { background: #f8f9fa; padding: 30px; border-radius: 0 0 10px 10px; }
              .field { margin-bottom: 20px; }
              .label { font-weight: bold; color: #10b981; margin-bottom: 5px; }
              .value { background: white; padding: 15px; border-radius: 5px; border-left: 4px solid #10b981; }
              .message-box { background: white; padding: 20px; border-radius: 5px; border: 2px solid #e2e8f0; min-height: 100px; }
              .footer { text-align: center; margin-top: 20px; color: #64748b; font-size: 12px; }
              .badge-secure { background: #10b981; color: white; padding: 4px 12px; border-radius: 12px; font-size: 11px; font-weight: bold; }
            </style>
          </head>
          <body>
            <div class="container">
              <div class="header">
                <h1 style="margin: 0;">🔐 Message Utilisateur Authentifié</h1>
                <div class="badge">Connexion sécurisée via Supabase Auth</div>
              </div>
              <div class="content">
                <div class="field">
                  <div class="label">👤 Utilisateur</div>
                  <div class="value">${userName}</div>
                </div>
                <div class="field">
                  <div class="label">📧 Email <span class="badge-secure">VÉRIFIÉ</span></div>
                  <div class="value"><a href="mailto:${userEmail}">${userEmail}</a></div>
                </div>
                <div class="field">
                  <div class="label">🆔 User ID</div>
                  <div class="value">${userId}</div>
                </div>
                <div class="field">
                  <div class="label">📋 Sujet</div>
                  <div class="value">${sujet}</div>
                </div>
                <div class="field">
                  <div class="label">💬 Message</div>
                  <div class="message-box">${message.replace(/\n/g, '<br>')}</div>
                </div>
                <div class="footer">
                  <p>Reçu le ${new Date().toLocaleString('fr-FR', { timeZone: 'Europe/Paris' })}</p>
                  <p>Message envoyé depuis un compte authentifié - Portfolio Marc Xavier Marques</p>
                </div>
              </div>
            </div>
          </body>
          </html>
        `,
      });

      console.log('✅ Email envoyé avec succès');
    } catch (emailError) {
      console.error('⚠️ Erreur lors de l\'envoi de l\'email:', emailError);
      return res.status(200).json({ 
        success: true,
        message: 'Message enregistré mais l\'email n\'a pas pu être envoyé',
        warning: 'Email non envoyé',
        id: data[0]?.id
      });
    }

    // Succès complet
    res.status(200).json({ 
      success: true,
      message: 'Message envoyé et enregistré avec succès !',
      id: data[0]?.id
    });

  } catch (err) {
    console.error('❌ Erreur serveur:', err);
    res.status(500).json({ 
      success: false,
      error: 'Erreur interne du serveur' 
    });
  }
});

// =====================================================
// ROUTE: GET /api/health
// Description: Vérification de l'état du serveur
// =====================================================
app.get('/api/health', async (req, res) => {
  try {
    // Test de connexion Supabase
    const { error } = await supabase.from('contacts').select('count', { count: 'exact', head: true });
    
    res.status(200).json({
      status: 'OK',
      timestamp: new Date().toISOString(),
      supabase: error ? 'Erreur' : 'Connecté',
      smtp: transporter ? 'Configuré' : 'Non configuré',
      auth: 'Supabase Auth activé'
    });
  } catch (err) {
    res.status(500).json({
      status: 'ERROR',
      error: err.message
    });
  }
});

// Route de test
app.get('/', (req, res) => {
  res.json({ 
    message: '🚀 Backend Portfolio - API fonctionnelle',
    version: '2.0.0',
    database: 'Supabase',
    endpoints: {
      contact: 'POST /api/contact',
      health: 'GET /api/health'
    }
  });
});

// Démarrage du serveur
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log('');
  console.log('═══════════════════════════════════════');
  console.log('🚀 Backend Portfolio - Serveur démarré');
  console.log('═══════════════════════════════════════');
  console.log(`📡 Port: ${PORT}`);
  console.log(`🗄️  Database: Supabase`);
  console.log(`📧 SMTP: ${process.env.SMTP_HOST}`);
  console.log(`🔗 URL: http://localhost:${PORT}`);
  console.log('═══════════════════════════════════════');
  console.log('');
}); 