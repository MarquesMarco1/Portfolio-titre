'use client';

import { useState } from 'react';

interface CardData {
  id: number;
  title: string;
  icon: string;
  gradient: string;
  shortText: string;
  fullText: string;
}

export default function About() {
  const [expandedCard, setExpandedCard] = useState<number | null>(null);

  const cards: CardData[] = [
    {
      id: 1,
      title: "Mon Parcours",
      gradient: "from-blue-500 to-cyan-600",
      icon: "rectangle",
      shortText: "Un parcours diversifié entre droit, ingénierie audio et développement web. Depuis novembre 2023, je me spécialise à la Web@cadémie Epitech...",
      fullText: "Mon parcours reflète une quête constante de passion et d'accomplissement. J'ai débuté avec <strong>2 ans de droit</strong> à <strong>Paris 2 Panthéon-Assas</strong>, avant de m'orienter vers ma passion créative avec <strong>3 ans d'ingénierie du son et d'audio production</strong> à la <strong>SAE Institute Paris</strong>. Depuis <strong>novembre 2023</strong>, je me consacre pleinement au développement web et à l'informatique à la <strong>Web@cadémie d'Epitech</strong>, où je perfectionne mes compétences techniques depuis maintenant 2 ans. Cette formation intensive me permet de combiner créativité et expertise technique, tout en me préparant à poursuivre une carrière solide dans le <strong>développement web et l'informatique</strong>, domaines qui incarnent ma véritable vocation."
    },
    {
      id: 2,
      title: "Mes Langues",
      gradient: "from-violet-500 to-purple-600",
      icon: "oval",
      shortText: "Maîtrise parfaite de 4 langues : français, anglais, espagnol et portugais. Un atout stratégique pour collaborer à l'international...",
      fullText: "Ma maîtrise de quatre langues - français, anglais, espagnol et portugais - constitue un véritable atout stratégique dans ma carrière de développeur. Cette polyvalence linguistique me permet non seulement de collaborer efficacement avec des équipes internationales, mais aussi d'accéder à une documentation technique diversifiée et de comprendre les nuances culturelles essentielles en gestion de projet. Dans un secteur où la collaboration mondiale est la norme, cette compétence me distingue et ouvre des portes vers des opportunités professionnelles enrichissantes. Je peux ainsi travailler sans barrière linguistique avec des clients et des équipes du monde entier, transformant cette diversité en force opérationnelle."
    },
    {
      id: 3,
      title: "Ma Mission",
      gradient: "from-indigo-500 to-purple-600",
      icon: "square",
      shortText: "Créer des expériences web exceptionnelles en combinant design moderne et technologies performantes...",
      fullText: "Créer des expériences web exceptionnelles en combinant design moderne et technologies performantes. Je m'efforce de transformer les idées en solutions digitales innovantes. Mon objectif est de développer des applications web qui non seulement répondent aux besoins des utilisateurs, mais les dépassent. Je crois fermement en l'importance de l'accessibilité, de la performance et de l'expérience utilisateur dans chaque projet. Chaque ligne de code que j'écris est une opportunité de créer quelque chose de significatif et d'impactant pour les utilisateurs finaux."
    },
    {
      id: 4,
      title: "Ma Recherche",
      gradient: "from-orange-500 to-red-600",
      icon: "square",
      shortText: "À la recherche d'un emploi innovant et stimulant où chaque jour sera une nouvelle opportunité d'apprentissage...",
      fullText: "Je recherche activement un emploi <strong>innovant et stimulant</strong> qui nourrira ma soif constante d'apprentissage. Peu importe la nature du projet ou les exigences du client, je suis animé par une <strong>curiosité insatiable</strong> et une volonté d'excellence. Chaque nouveau défi représente pour moi une opportunité de croissance professionnelle et d'acquisition de nouvelles compétences. Mon objectif est de rejoindre une équipe dynamique où je pourrai non seulement mettre à profit mes compétences actuelles, mais surtout <strong>apprendre et évoluer quotidiennement</strong>. Je suis convaincu que c'est dans la diversité des projets et des technologies que l'on devient un développeur complet et polyvalent."
    },
    {
      id: 5,
      title: "Mes Passions",
      gradient: "from-emerald-500 to-teal-600",
      icon: "circle",
      shortText: "Sportif accompli avec 14 ans de karaté, 4 ans de football et 5 ans de tennis. Un esprit de compétition qui me pousse à me surpasser chaque jour...",
      fullText: "Le sport a façonné ma personnalité et ma vision du dépassement de soi. J'ai pratiqué le <strong>karaté pendant 14 ans</strong>, le <strong>football pendant 4 ans</strong> et le <strong>tennis pendant 5 ans</strong>. Ces disciplines m'ont inculqué des valeurs fondamentales : <strong>la discipline, la persévérance et l'esprit de compétition</strong>. J'adore les défis et me mesurer à moi-même pour progresser constamment. Ce <strong>mindset sportif</strong> est devenu un atout majeur dans mon parcours en informatique. Chaque jour, je l'applique pour me surpasser techniquement, relever de nouveaux défis de développement et maintenir une rigueur professionnelle exemplaire. Le même esprit qui m'animait sur le tatami ou le terrain me pousse aujourd'hui à exceller dans chaque ligne de code que j'écris."
    }
  ];

  return (
    <section id="about" className="section">
      <div style={{ maxWidth: '100%', width: '100%', padding: '0 1.5rem' }}>
        <div className="section-inner">
          <div className="section-header">
            <h2 className="section-title">À propos de moi</h2>
            <p className="section-subtitle">
              Découvrez mon parcours et mes motivations
            </p>
          </div>
          
          <div style={{ 
            display: 'flex', 
            gap: '1rem',
            width: '100%',
            justifyContent: 'center',
            flexWrap: 'wrap'
          }}>
            {cards.map((card) => (
              <div 
                key={card.id}
                onClick={() => setExpandedCard(card.id)}
                style={{
                  position: 'relative',
                  background: 'linear-gradient(135deg, rgba(30, 41, 59, 0.4), rgba(15, 23, 42, 0.6))',
                  backdropFilter: 'blur(20px)',
                  border: '1px solid rgba(71, 85, 105, 0.3)',
                  borderRadius: '20px',
                  padding: '1.5rem',
                  cursor: 'pointer',
                  transition: 'all 0.4s ease',
                  minHeight: '200px',
                  display: 'flex',
                  flexDirection: 'column',
                  overflow: 'hidden',
                  flex: '1',
                  minWidth: '250px'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-8px)';
                  e.currentTarget.style.borderColor = 'rgba(99, 102, 241, 0.5)';
                  e.currentTarget.style.boxShadow = '0 20px 40px rgba(99, 102, 241, 0.2)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.borderColor = 'rgba(71, 85, 105, 0.3)';
                  e.currentTarget.style.boxShadow = 'none';
                }}
              >
                {/* Effet de lumière en arrière-plan */}
                <div style={{
                  position: 'absolute',
                  top: '-50%',
                  right: '-50%',
                  width: '200%',
                  height: '200%',
                  background: `radial-gradient(circle, ${card.gradient.includes('blue') ? 'rgba(59, 130, 246, 0.1)' : card.gradient.includes('violet') ? 'rgba(139, 92, 246, 0.1)' : card.gradient.includes('indigo') ? 'rgba(99, 102, 241, 0.1)' : card.gradient.includes('orange') ? 'rgba(249, 115, 22, 0.1)' : 'rgba(16, 185, 129, 0.1)'} 0%, transparent 70%)`,
                  pointerEvents: 'none',
                  opacity: 0.5
                }} />

                {/* Contenu */}
                <div style={{ position: 'relative', zIndex: 1 }}>
                  {/* Titre */}
                  <h3 style={{
                    fontSize: '1.375rem',
                    fontWeight: '700',
                    marginBottom: '0.75rem',
                    color: '#f8fafc',
                    lineHeight: '1.3'
                  }}>
                    {card.title}
                  </h3>

                  {/* Séparateur */}
                  <div style={{
                    width: '40px',
                    height: '3px',
                    background: `linear-gradient(90deg, ${card.gradient.includes('blue') ? '#3b82f6' : card.gradient.includes('violet') ? '#8b5cf6' : card.gradient.includes('indigo') ? '#6366f1' : card.gradient.includes('orange') ? '#f97316' : '#10b981'}, transparent)`,
                    marginBottom: '0.75rem',
                    borderRadius: '2px'
                  }} />

                  {/* Texte */}
                  <p style={{
                    fontSize: '0.9rem',
                    color: '#cbd5e1',
                    lineHeight: '1.6',
                    flex: 1
                  }}>
                    {card.shortText}
                  </p>

                  {/* Indicateur "Cliquer pour en savoir plus" */}
                  <div style={{
                    marginTop: '1rem',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.5rem',
                    color: '#94a3b8',
                    fontSize: '0.85rem',
                    fontWeight: '500'
                  }}>
                    <span>En savoir plus</span>
                    <svg style={{ width: '16px', height: '16px' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Modal pour la carte agrandie */}
      {expandedCard && (
        <div 
          style={{
            position: 'fixed',
            inset: 0,
            backgroundColor: 'rgba(0, 0, 0, 0.75)',
            backdropFilter: 'blur(12px)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 9999,
            padding: '20px',
            animation: 'fadeIn 0.3s ease-out'
          }}
          onClick={() => setExpandedCard(null)}
        >
          <div 
            style={{
              position: 'relative',
              width: '100%',
              maxWidth: '800px',
              background: 'linear-gradient(135deg, rgba(30, 41, 59, 0.95), rgba(15, 23, 42, 0.98))',
              backdropFilter: 'blur(20px)',
              borderRadius: '32px',
              padding: '50px',
              border: '1px solid rgba(99, 102, 241, 0.2)',
              boxShadow: '0 25px 60px -12px rgba(99, 102, 241, 0.3), 0 0 0 1px rgba(71, 85, 105, 0.3)',
              animation: 'slideUp 0.3s ease-out',
              overflow: 'hidden'
            }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Effet de lumière d'ambiance */}
            <div style={{
              position: 'absolute',
              top: '-50%',
              right: '-30%',
              width: '80%',
              height: '80%',
              background: `radial-gradient(circle, ${cards.find(c => c.id === expandedCard)?.gradient.includes('blue') ? 'rgba(59, 130, 246, 0.15)' : cards.find(c => c.id === expandedCard)?.gradient.includes('violet') ? 'rgba(139, 92, 246, 0.15)' : cards.find(c => c.id === expandedCard)?.gradient.includes('indigo') ? 'rgba(99, 102, 241, 0.15)' : cards.find(c => c.id === expandedCard)?.gradient.includes('orange') ? 'rgba(249, 115, 22, 0.15)' : 'rgba(16, 185, 129, 0.15)'} 0%, transparent 70%)`,
              pointerEvents: 'none',
              opacity: 0.6
            }} />

            {/* Bouton fermer */}
            <button
              onClick={() => setExpandedCard(null)}
              style={{
                position: 'absolute',
                top: '24px',
                right: '24px',
                width: '44px',
                height: '44px',
                borderRadius: '12px',
                background: 'linear-gradient(135deg, rgba(51, 65, 85, 0.6), rgba(30, 41, 59, 0.8))',
                border: '1px solid rgba(99, 102, 241, 0.2)',
                color: '#cbd5e1',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '20px',
                fontWeight: '300',
                transition: 'all 0.3s ease',
                zIndex: 10,
                backdropFilter: 'blur(10px)'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = 'linear-gradient(135deg, rgba(99, 102, 241, 0.3), rgba(139, 92, 246, 0.3))';
                e.currentTarget.style.borderColor = 'rgba(99, 102, 241, 0.5)';
                e.currentTarget.style.transform = 'scale(1.05)';
                e.currentTarget.style.color = '#f8fafc';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = 'linear-gradient(135deg, rgba(51, 65, 85, 0.6), rgba(30, 41, 59, 0.8))';
                e.currentTarget.style.borderColor = 'rgba(99, 102, 241, 0.2)';
                e.currentTarget.style.transform = 'scale(1)';
                e.currentTarget.style.color = '#cbd5e1';
              }}
            >
              ×
            </button>

            {/* Contenu de la carte agrandie */}
            {cards.find(c => c.id === expandedCard) && (
              <div style={{ 
                position: 'relative', 
                zIndex: 1,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                textAlign: 'center'
              }}>
                <h2 style={{ 
                  fontSize: '36px', 
                  fontWeight: '700', 
                  marginBottom: '16px', 
                  color: '#f8fafc',
                  background: 'linear-gradient(135deg, #f8fafc 0%, #cbd5e1 100%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text'
                }}>
                  {cards.find(c => c.id === expandedCard)?.title}
                </h2>
                
                {/* Séparateur coloré avec lueur */}
                <div style={{
                  width: '80px',
                  height: '4px',
                  background: `linear-gradient(90deg, ${cards.find(c => c.id === expandedCard)?.gradient.includes('blue') ? '#3b82f6' : cards.find(c => c.id === expandedCard)?.gradient.includes('violet') ? '#8b5cf6' : cards.find(c => c.id === expandedCard)?.gradient.includes('indigo') ? '#6366f1' : cards.find(c => c.id === expandedCard)?.gradient.includes('orange') ? '#f97316' : '#10b981'}, ${cards.find(c => c.id === expandedCard)?.gradient.includes('blue') ? '#3b82f6' : cards.find(c => c.id === expandedCard)?.gradient.includes('violet') ? '#8b5cf6' : cards.find(c => c.id === expandedCard)?.gradient.includes('indigo') ? '#6366f1' : cards.find(c => c.id === expandedCard)?.gradient.includes('orange') ? '#f97316' : '#10b981'})`,
                  marginBottom: '32px',
                  borderRadius: '2px',
                  boxShadow: `0 0 20px ${cards.find(c => c.id === expandedCard)?.gradient.includes('blue') ? 'rgba(59, 130, 246, 0.4)' : cards.find(c => c.id === expandedCard)?.gradient.includes('violet') ? 'rgba(139, 92, 246, 0.4)' : cards.find(c => c.id === expandedCard)?.gradient.includes('indigo') ? 'rgba(99, 102, 241, 0.4)' : cards.find(c => c.id === expandedCard)?.gradient.includes('orange') ? 'rgba(249, 115, 22, 0.4)' : 'rgba(16, 185, 129, 0.4)'}`
                }} />
                
                <p 
                  style={{ 
                    fontSize: '17px', 
                    color: '#e2e8f0', 
                    lineHeight: '1.9',
                    letterSpacing: '0.2px',
                    maxWidth: '100%'
                  }}
                  dangerouslySetInnerHTML={{ 
                    __html: cards.find(c => c.id === expandedCard)?.fullText || '' 
                  }}
                />
              </div>
            )}
          </div>
        </div>
      )}
    </section>
  );
} 