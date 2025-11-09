'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';

export default function Presentation() {
  const [showArrow, setShowArrow] = useState(false);

  useEffect(() => {
    let timer: NodeJS.Timeout;

    const isAtBottom = () => {
      const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
      const scrollHeight = document.documentElement.scrollHeight;
      const clientHeight = document.documentElement.clientHeight;
      return scrollTop + clientHeight >= scrollHeight - 100;
    };

    const handleScroll = () => {
      // Cacher la flèche pendant le scroll
      setShowArrow(false);
      
      // Réinitialiser le timer
      clearTimeout(timer);
      
      // Montrer la flèche après 3,5 secondes d'inactivité (sauf si on est en bas)
      timer = setTimeout(() => {
        if (!isAtBottom()) {
          setShowArrow(true);
        }
      }, 3500);
    };

    // Apparition initiale après 3,5 secondes
    timer = setTimeout(() => {
      if (!isAtBottom()) {
        setShowArrow(true);
      }
    }, 3500);

    // Écouter les événements de scroll
    window.addEventListener('scroll', handleScroll);

    return () => {
      clearTimeout(timer);
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const scrollToNextSection = () => {
    const aboutSection = document.getElementById('about');
    if (aboutSection) {
      aboutSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="presentation" className="hero">
      <div style={{
        maxWidth: '1200px',
        margin: '0 auto',
        padding: '0 2rem',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: '3rem',
        minHeight: '100vh',
        justifyContent: 'center'
      }}>
        {/* Section haute: Image + Nom/Description */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '4rem',
          width: '100%',
          justifyContent: 'center'
        }}>
          {/* Photo de profil à gauche */}
          <div style={{ flex: '0 0 auto' }}>
          <div 
            style={{ position: 'relative' }}
            onMouseEnter={(e) => {
              const container = e.currentTarget.querySelector('div[data-image]') as HTMLElement;
              const text = e.currentTarget.querySelector('div[data-text]') as HTMLElement;
              if (container) {
                container.style.transform = 'scale(1.08)';
              }
              if (text) {
                text.style.opacity = '1';
                text.style.transform = 'translateX(-50%) translateY(0)';
              }
            }}
            onMouseLeave={(e) => {
              const container = e.currentTarget.querySelector('div[data-image]') as HTMLElement;
              const text = e.currentTarget.querySelector('div[data-text]') as HTMLElement;
              if (container) {
                container.style.transform = 'scale(1)';
              }
              if (text) {
                text.style.opacity = '0';
                text.style.transform = 'translateX(-50%) translateY(30px)';
              }
            }}
          >
            {/* Cercle principal avec la photo */}
            <div 
              data-image
              style={{
                width: '400px',
                height: '400px',
                borderRadius: '50%',
                overflow: 'hidden',
                border: '8px solid rgba(71, 85, 105, 0.3)',
                backdropFilter: 'blur(10px)',
                backgroundColor: 'rgba(30, 41, 59, 0.2)',
                position: 'relative',
                zIndex: 10,
                boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)',
                transition: 'transform 0.5s ease',
                transform: 'scale(1)'
              }}
            >
              <Image 
                src="/images/profile.jpg" 
                alt="Marc Xavier Marques"
                width={400}
                height={400}
                quality={60}
                priority
                loading="eager"
                sizes="(max-width: 480px) 220px, (max-width: 968px) 280px, 400px"
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover'
                }}
              />
            </div>
            
            {/* Message au survol */}
            <div 
              data-text
              style={{
                position: 'absolute',
                bottom: '-60px',
                left: '50%',
                transform: 'translateX(-50%) translateY(30px)',
                opacity: 0,
                transition: 'all 0.5s ease',
                whiteSpace: 'nowrap',
                pointerEvents: 'none',
                zIndex: 20
              }}
            >
              <span style={{
                color: 'white',
                fontSize: '24px',
                fontWeight: '700',
                letterSpacing: '1px',
                textShadow: '0 2px 10px rgba(0, 0, 0, 0.5)',
                display: 'block'
              }}>
                Bienvenue sur mon portfolio !
              </span>
            </div>
          </div>
        </div>

          {/* Contenu à droite: Nom + Description + Badge */}
          <div style={{ 
            flex: '1', 
            minWidth: 0,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            textAlign: 'center'
          }}>
            {/* Nom */}
            <h1 style={{
              fontSize: 'clamp(2.5rem, 5vw, 4rem)',
              fontWeight: '700',
              marginBottom: '1.5rem',
              background: 'linear-gradient(135deg, #f8fafc 0%, #cbd5e1 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
              lineHeight: '1.2'
            }}>
              Marc Xavier Marques
            </h1>
            
            {/* Description */}
            <p style={{
              fontSize: '1.125rem',
              color: '#cbd5e1',
              lineHeight: '1.6',
              maxWidth: '600px',
              marginBottom: '2rem'
            }}>
              Développeur Full Stack de 27 ans avec une forte affinité pour le backend. Passionné par la diversité des projets et animé par une soif d&apos;apprentissage quotidien, je m&apos;investis dans la création de solutions techniques robustes et innovantes.
            </p>
            
            {/* Badge */}
            <div style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.5rem',
              backgroundColor: 'rgba(30, 41, 59, 0.6)',
              color: '#cbd5e1',
              padding: '0.75rem 1.5rem',
              borderRadius: '2rem',
              fontSize: '1.125rem',
              fontWeight: '500',
              border: '1px solid rgba(99, 102, 241, 0.2)',
              backdropFilter: 'blur(10px)'
            }}>
              <span>Web@cadémie - Epitech</span>
            </div>
          </div>
        </div>

        {/* Section basse: Boutons, Infos, Liens - Tous centrés */}
        <div style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '2rem',
          width: '100%',
          maxWidth: '800px',
          marginTop: '4rem'
        }}>
          
          {/* Boutons */}
          <div style={{ 
            display: 'flex', 
            gap: '1rem',
            flexWrap: 'wrap',
            justifyContent: 'center'
          }}>
            <a href="#projects" className="btn-elegant btn-elegant-primary">
              Voir mes projets
            </a>
            <a href="#contact" className="btn-elegant btn-elegant-secondary">
              Me contacter
            </a>
          </div>
          
          {/* Informations personnelles */}
          <div style={{
            display: 'flex',
            gap: '2rem',
            fontSize: '0.875rem',
            color: '#94a3b8',
            flexWrap: 'wrap',
            justifyContent: 'center'
          }}>
            <span>France •</span>
            <span>27 ans •</span>
            <span>Full Stack</span>
          </div>
          
          {/* Liens sociaux */}
          <div style={{ display: 'flex', gap: '0.5rem', justifyContent: 'center' }}>
            <a
              href="https://github.com/MarquesMarco1"
              target="_blank"
              rel="noopener noreferrer"
              style={{
                width: '40px',
                height: '40px',
                backgroundColor: 'rgba(30, 41, 59, 0.3)',
                backdropFilter: 'blur(10px)',
                borderRadius: '12px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#94a3b8',
                transition: 'all 0.3s ease',
                textDecoration: 'none'
              }}
              className="social-link"
            >
              <svg style={{ width: '18px', height: '18px' }} fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.30.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
              </svg>
            </a>
            <a
              href="https://www.linkedin.com/in/marc-marques-557537316"
              target="_blank"
              rel="noopener noreferrer"
              style={{
                width: '40px',
                height: '40px',
                backgroundColor: 'rgba(30, 41, 59, 0.3)',
                backdropFilter: 'blur(10px)',
                borderRadius: '12px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#94a3b8',
                transition: 'all 0.3s ease',
                textDecoration: 'none'
              }}
              className="social-link"
            >
              <svg style={{ width: '18px', height: '18px' }} fill="currentColor" viewBox="0 0 24 24">
                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
              </svg>
            </a>
          </div>
        </div>
      </div>

      {/* Flèche pour scroller vers le bas */}
      {showArrow && (
        <button
          onClick={scrollToNextSection}
          style={{
            position: 'fixed',
            bottom: '3rem',
            right: '3rem',
            background: 'transparent',
            border: 'none',
            cursor: 'pointer',
            zIndex: 50,
            animation: 'bounce 2s ease-in-out infinite, fadeIn 0.5s ease-out',
            transition: 'all 0.3s ease',
            padding: 0
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = 'scale(1.15)';
            e.currentTarget.style.opacity = '0.8';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = 'scale(1)';
            e.currentTarget.style.opacity = '1';
          }}
          aria-label="Défiler vers le bas"
        >
          <svg
            width="120"
            height="120"
            viewBox="0 0 24 24"
            fill="none"
            stroke="white"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            style={{
              filter: 'drop-shadow(0 4px 12px rgba(0, 0, 0, 0.5))'
            }}
          >
            <line x1="12" y1="5" x2="12" y2="19" />
            <polyline points="5 12 12 19 19 12" />
          </svg>
        </button>
      )}
    </section>
  );
} 