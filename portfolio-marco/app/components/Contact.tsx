'use client';

import { useState } from 'react';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [copiedText, setCopiedText] = useState<string | null>(null);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const copyToClipboard = async (text: string, label: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedText(label);
      setTimeout(() => setCopiedText(null), 2000);
    } catch (err) {
      console.error('Erreur lors de la copie:', err);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      // Envoi au backend
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000'}/api/contact`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          nom: formData.name,
          email: formData.email,
          sujet: formData.subject,
          message: formData.message,
        }),
      });

      const data = await response.json();

      if (response.ok && data.success) {
        setIsSubmitting(false);
        setSubmitStatus('success');
        setFormData({ name: '', email: '', subject: '', message: '' });
        
        // Réinitialiser après 5 secondes
        setTimeout(() => {
          setSubmitStatus('idle');
        }, 5000);
      } else {
        throw new Error(data.error || 'Erreur lors de l\'envoi du message');
      }
    } catch (error) {
      console.error('Erreur:', error);
      setIsSubmitting(false);
      setSubmitStatus('error');
      
      // Réinitialiser après 5 secondes
      setTimeout(() => {
        setSubmitStatus('idle');
      }, 5000);
    }
  };

  const contactInfo = [
    {
      icon: (
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
        </svg>
      ),
      value: 'marquesmarcxavier@gmail.com',
      href: 'mailto:marquesmarcxavier@gmail.com',
      gradient: 'from-blue-500 to-cyan-500'
    },
    {
      icon: (
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
        </svg>
      ),
      value: '06 15 84 11 75',
      href: 'tel:+33615841175',
      gradient: 'from-green-500 to-emerald-500'
    }
  ];

  return (
    <section id="contact" className="section bg-gradient-to-br from-slate-950 via-indigo-950/40 to-slate-950">
      {/* Background Effects */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-dots-pattern opacity-30"></div>
        <div className="absolute top-20 left-20 w-80 h-80 bg-gradient-to-r from-blue-500/20 to-cyan-500/20 rounded-full blur-3xl animate-float"></div>
        <div className="absolute bottom-20 right-20 w-72 h-72 bg-gradient-to-r from-purple-500/15 to-pink-500/15 rounded-full blur-3xl animate-float" style={{ animationDelay: '2s' }}></div>
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="max-w-7xl mx-auto">
          
          {/* Header */}
          <div className="text-center" style={{ marginBottom: '5rem' }}>
            <h2 className="section-title">
              Contactez-moi
            </h2>
            <p className="section-subtitle" style={{ marginBottom: '3rem' }}>
              Une idée de projet ? Une opportunité ? N&apos;hésitez pas à me contacter
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-16 items-start">
            
            {/* Informations de contact */}
            <div className="space-y-8">
              <div className="card relative overflow-hidden">
                <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-blue-500/10 to-cyan-500/10 rounded-full blur-3xl"></div>
                
                <div className="relative z-10 text-center">
                  <h3 className="text-3xl font-bold text-white mb-8">
                    Discutons de votre projet
                  </h3>
                  <p className="text-xl text-gray-300 leading-relaxed" style={{ marginBottom: '3rem' }}>
                    Que ce soit pour un projet web, une collaboration ou simplement pour échanger 
                    sur le développement, je serais ravi de vous répondre.
                  </p>
                  
                  {/* Informations de contact */}
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', textAlign: 'center' }}>
                    {contactInfo.map((info, index) => (
                      <button
                        key={index}
                        onClick={() => copyToClipboard(info.value, index === 0 ? 'email' : 'phone')}
                        style={{
                          width: '100%',
                          maxWidth: '500px',
                          margin: '0 auto',
                          background: 'rgba(255, 255, 255, 0.05)',
                          backdropFilter: 'blur(10px)',
                          border: '1px solid rgba(255, 255, 255, 0.1)',
                          borderRadius: '1rem',
                          padding: '1.25rem 1.5rem',
                          cursor: 'pointer',
                          transition: 'all 0.3s ease',
                          boxShadow: '0 10px 40px rgba(0, 0, 0, 0.3)'
                        }}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.transform = 'scale(1.02)';
                          e.currentTarget.style.background = 'rgba(255, 255, 255, 0.08)';
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.transform = 'scale(1)';
                          e.currentTarget.style.background = 'rgba(255, 255, 255, 0.05)';
                        }}
                        title="Cliquer pour copier"
                      >
                        <div style={{ 
                          color: '#9ca3af', 
                          fontSize: '0.75rem', 
                          marginBottom: '0.75rem', 
                          textTransform: 'uppercase',
                          letterSpacing: '0.05em'
                        }}>
                          {index === 0 ? 'Email' : 'Téléphone'}
                        </div>
                        {copiedText === (index === 0 ? 'email' : 'phone') ? (
                          <div style={{ 
                            color: '#a78bfa', 
                            fontSize: '1.5rem', 
                            fontWeight: '700'
                          }}>
                            ✓ Adresse copiée !
                          </div>
                        ) : (
                          <div style={{ 
                            color: '#a78bfa', 
                            fontSize: '1.5rem', 
                            fontWeight: '700'
                          }}>
                            {info.value}
                          </div>
                        )}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Disponibilité */}
              <div className="card text-center">
                <div className="flex items-center justify-center space-x-3 mb-4">
                  <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse"></div>
                  <span className="text-green-300 font-semibold">Disponible pour de nouveaux projets</span>
                </div>
                <p className="text-gray-400 text-sm">
                  Je réponds généralement dans les 24h
                </p>
              </div>
            </div>

            {/* Formulaire de contact */}
            <div className="card relative overflow-hidden">
              <div className="absolute bottom-0 left-0 w-64 h-64 bg-gradient-to-br from-purple-500/10 to-pink-500/10 rounded-full blur-3xl"></div>
              
              <div className="relative z-10">
                <h3 className="text-3xl font-bold text-white mb-8 text-center">
                  Envoyez-moi un message
                </h3>
                
                {submitStatus === 'success' && (
                  <div className="mb-8 p-6 bg-gradient-to-r from-green-500 to-emerald-500 rounded-2xl animate-fade-in text-center">
                    <div className="flex flex-col items-center space-y-3">
                      <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center text-green-500 text-3xl font-bold shadow-lg">
                        ✓
                      </div>
                      <div>
                        <div className="text-white text-xl font-bold mb-1">Message envoyé avec succès !</div>
                        <div className="text-green-50 text-sm">Je vous répondrai dans les plus brefs délais</div>
                      </div>
                    </div>
                  </div>
                )}

                {submitStatus === 'error' && (
                  <div className="mb-8 p-6 bg-red-500/20 border border-red-500/30 rounded-2xl animate-fade-in">
                    <div className="flex items-center space-x-3">
                      <div className="w-12 h-12 bg-red-500 rounded-xl flex items-center justify-center text-white text-xl">
                        ✕
                      </div>
                      <div>
                        <div className="text-red-300 font-semibold">Erreur d&apos;envoi</div>
                        <div className="text-red-400 text-sm">Une erreur est survenue. Veuillez réessayer ou me contacter directement par email.</div>
                      </div>
                    </div>
                  </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label htmlFor="name" className="block text-white font-semibold mb-3">
                        Nom complet *
                      </label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        required
                        className="w-full p-4 bg-gradient-to-r from-slate-800/50 to-slate-700/50 backdrop-blur-sm rounded-xl text-white placeholder-gray-400 focus:bg-slate-700/50 focus:outline-none transition-all duration-300"
                        placeholder="Votre nom"
                      />
                    </div>
                    <div>
                      <label htmlFor="email" className="block text-white font-semibold mb-3">
                        Email *
                      </label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        required
                        className="w-full p-4 bg-gradient-to-r from-slate-800/50 to-slate-700/50 backdrop-blur-sm rounded-xl text-white placeholder-gray-400 focus:bg-slate-700/50 focus:outline-none transition-all duration-300"
                        placeholder="votre@email.com"
                      />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="subject" className="block text-white font-semibold mb-3">
                      Sujet *
                    </label>
                    <input
                      type="text"
                      id="subject"
                      name="subject"
                      value={formData.subject}
                      onChange={handleInputChange}
                      required
                      className="w-full p-4 bg-gradient-to-r from-slate-800/50 to-slate-700/50 backdrop-blur-sm rounded-xl text-white placeholder-gray-400 focus:bg-slate-700/50 focus:outline-none transition-all duration-300"
                      placeholder="Objet de votre message"
                    />
                  </div>

                  <div>
                    <label htmlFor="message" className="block text-white font-semibold mb-3">
                      Message *
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleInputChange}
                      required
                      rows={6}
                      className="w-full p-4 bg-gradient-to-r from-slate-800/50 to-slate-700/50 backdrop-blur-sm rounded-xl text-white placeholder-gray-400 focus:bg-slate-700/50 focus:outline-none transition-all duration-300 resize-none"
                      placeholder="Décrivez votre projet ou votre demande..."
                    ></textarea>
                  </div>

                  <div className="flex justify-center">
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className={`btn-elegant btn-elegant-primary ${isSubmitting ? 'opacity-75 cursor-not-allowed' : ''}`}
                    >
                      {isSubmitting ? 'Envoi en cours...' : 'Envoyer le message'}
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>

          {/* Section FAQ rapide */}
          <div style={{ marginTop: '8rem', marginBottom: '4rem' }}>
            <div className="text-center" style={{ marginBottom: '4rem' }}>
              <h3 className="text-3xl font-bold text-white mb-4">
                Questions fréquentes
              </h3>
              <p className="text-gray-400">Quelques réponses pour aller plus vite</p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                {
                  question: "Quel est votre tarif ?",
                  answer: "Je propose des tarifs adaptés selon le projet. Contactez-moi pour un devis personnalisé.",
                  icon: (
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
                    </svg>
                  ),
                  gradient: 'from-yellow-500 to-orange-500'
                },
                {
                  question: "Quels délais de livraison ?",
                  answer: "Les délais varient selon la complexité. En général, 2-8 semaines pour un projet complet.",
                  icon: (
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  ),
                  gradient: 'from-blue-500 to-cyan-500'
                },
                {
                  question: "Travaillez-vous en équipe ?",
                  answer: "Oui, je peux travailler seul ou intégrer votre équipe selon les besoins du projet.",
                  icon: (
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                    </svg>
                  ),
                  gradient: 'from-green-500 to-emerald-500'
                }
              ].map((faq, index) => (
                <div key={index} className="card text-center group">
                  <div className="flex justify-center mb-4">
                    <div className={`w-12 h-12 bg-gradient-to-br ${faq.gradient} rounded-xl flex items-center justify-center text-white group-hover:scale-110 transition-transform duration-300 shadow-lg`}>
                      {faq.icon}
                    </div>
                  </div>
                  <h4 className="text-xl font-bold text-white mb-4 group-hover:text-gradient transition-all duration-300">
                    {faq.question}
                  </h4>
                  <p className="text-gray-400 leading-relaxed">
                    {faq.answer}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact; 