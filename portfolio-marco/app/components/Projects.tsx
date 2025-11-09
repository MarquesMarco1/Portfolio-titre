'use client';

import { useState } from 'react';
import Image from 'next/image';

export default function Projects() {
  const [currentProject, setCurrentProject] = useState(0);
  const [selectedProject, setSelectedProject] = useState<number | null>(null);

  const projects = [
    {
      id: 1,
      title: "E-Racing RPG",
      subtitle: "Jeu de course RPG immersif",
      description: "Jeu de simulation de course automobile avec système RPG complet. Gestion de pilote, progression, courses, garage et économie de jeu intégrée.",
      technologies: ["JavaScript", "HTML 5", "CSS 3", "Game Logic"],
      features: [
        "Système de progression de pilote",
        "Gestion de courses et saisons", 
        "Interface utilisateur moderne",
        "Économie de jeu équilibrée"
      ],
      status: "Terminé",
      category: "Jeu Web",
      image: "/images/projects/eracing-rpg.jpg",
      gradient: "from-red-500 to-orange-600",
      color: "#ef4444",
      githubUrl: "https://github.com/username/eracing-rpg",
      demoUrl: "https://eracing-rpg-demo.com"
    },
    {
      id: 2,
      title: "Puissance 4 Intelligent",
      subtitle: "Jeu classique revisité",
      description: "Version moderne du célèbre Puissance 4 avec intelligence artificielle, système de score et interface responsive élégante.",
      technologies: ["JavaScript", "HTML 5", "CSS 3", "AI Logic"],
      features: [
        "IA adaptative multi-niveaux",
        "Interface responsive moderne",
        "Système de score et historique",
        "Animations fluides"
      ],
      status: "Terminé", 
      category: "Jeu Web",
      image: "/images/projects/puissance4.jpg",
      gradient: "from-blue-500 to-cyan-600",
      color: "#3b82f6",
      githubUrl: "https://github.com/username/puissance4",
      demoUrl: "https://puissance4-demo.com"
    },
    {
      id: 3,
      title: "Free Ads Leboncoin",
      subtitle: "Plateforme d'annonces moderne",
      description: "Clone moderne de Leboncoin avec fonctionnalités avancées, interface utilisateur intuitive et gestion complète des annonces.",
      technologies: ["React", "Node.js", "Mongo DB", "Express"],
      features: [
        "Gestion complète d'annonces",
        "Système d'authentification",
        "Interface moderne et responsive",
        "Messagerie intégrée"
      ],
      status: "En développement",
      category: "Application Web",
      image: "/images/projects/free-ads.jpg",
      gradient: "from-orange-500 to-yellow-600",
      color: "#f97316",
      githubUrl: "https://github.com/username/free-ads",
      demoUrl: "https://free-ads-demo.com"
    }
  ];

  const nextProject = () => {
    setCurrentProject((prev) => (prev + 1) % projects.length);
  };

  const prevProject = () => {
    setCurrentProject((prev) => (prev - 1 + projects.length) % projects.length);
  };

  const goToProject = (index: number) => {
    setCurrentProject(index);
  };

  const openModal = (index: number) => {
    setSelectedProject(index);
  };

  const closeModal = () => {
    setSelectedProject(null);
  };

  return (
    <section id="projects" className="projects-3d-section">
      <div className="projects-3d-container">
        <div className="projects-3d-header">
          <h2 className="projects-3d-title">Mes Projets</h2>
          <p className="projects-3d-subtitle">
            Une galerie immersive de mes réalisations techniques
          </p>
        </div>
        
        <div className="projects-3d-scene" style={{ transform: 'translateY(-150px)' }}>
          <div 
            className="projects-3d-assembly"
            style={{
              '--rotation': `${currentProject * (360 / projects.length)}deg`,
              '--n': projects.length
            } as React.CSSProperties}
          >
            {projects.map((project, index) => (
              <article 
                key={project.id}
                className="project-3d-card"
                style={{
                  '--i': index,
                  '--project-color': project.color
                } as React.CSSProperties}
                onClick={() => openModal(index)}
              >
                <div className="project-3d-front">
                  <div className="project-3d-image">
                    <Image 
                      src={project.image} 
                      alt={project.title}
                      width={400}
                      height={300}
                      quality={55}
                      loading="lazy"
                      sizes="(max-width: 480px) 200px, (max-width: 768px) 240px, 280px"
                      style={{
                        width: '100%',
                        height: '100%',
                        objectFit: 'cover'
                      }}
                    />
                  </div>
                  <div className="project-3d-info">
                    <div className="project-status">
                      <span className={`status-badge ${project.status === 'Terminé' ? 'completed' : 'in-progress'}`}>
                        {project.status}
                      </span>
                    </div>
                    <h3 className="project-3d-name">{project.title}</h3>
                    <p className="project-3d-type">{project.category}</p>
                    <button 
                      className="btn-more-info"
                      onClick={(e) => {
                        e.stopPropagation();
                        openModal(index);
                      }}
                      style={{
                        marginTop: '1rem',
                        padding: '0.5rem 1rem',
                        background: 'rgba(139, 92, 246, 0.2)',
                        border: '1px solid #8b5cf6',
                        borderRadius: '8px',
                        color: '#a78bfa',
                        fontSize: '0.875rem',
                        fontWeight: '600',
                        cursor: 'pointer',
                        transition: 'all 0.3s ease'
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.background = 'rgba(139, 92, 246, 0.3)';
                        e.currentTarget.style.borderColor = '#a78bfa';
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.background = 'rgba(139, 92, 246, 0.2)';
                        e.currentTarget.style.borderColor = '#8b5cf6';
                      }}
                    >
                      En savoir plus
                    </button>
                  </div>
                </div>
                
                <div className="project-3d-back">
                  <div className="project-3d-content">
                    <h3 className="project-3d-name">{project.title}</h3>
                    <p className="project-3d-subtitle-text">{project.subtitle}</p>
                    <p className="project-3d-description">{project.description}</p>
                    
                    <div className="project-3d-technologies">
                      {project.technologies.map((tech, idx) => (
                        <span key={idx} className="tech-pill">{tech}</span>
                      ))}
                    </div>
                    
                    <div className="project-3d-actions">
                      <a 
                        href={project.githubUrl} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="btn-elegant btn-elegant-secondary"
                        style={{ fontSize: '0.8rem', padding: '0.75rem 1.5rem' }}
                      >
                        Voir le code
                      </a>
                    </div>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
        
        <div className="projects-3d-navigation">
          <div className="navigation-controls">
            <button onClick={prevProject} className="nav-arrow nav-arrow-left">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            
            <div className="project-indicators">
              {projects.map((_, index) => (
                <button
                  key={index}
                  onClick={() => goToProject(index)}
                  className={`indicator ${index === currentProject ? 'active' : ''}`}
                >
                  <span className="sr-only">Projet {index + 1}</span>
                </button>
              ))}
            </div>
            
            <button onClick={nextProject} className="nav-arrow nav-arrow-right">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>
          
          <div className="project-counter">
            <span>{currentProject + 1} / {projects.length}</span>
          </div>
        </div>
      </div>

      {/* Modal de détails du projet */}
      {selectedProject !== null && (
        <div 
          className="modal-overlay"
          onClick={closeModal}
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: 'rgba(0, 0, 0, 0.8)',
            zIndex: 9999,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '2rem',
            backdropFilter: 'blur(10px)'
          }}
        >
          <div 
            className="modal-content"
            onClick={(e) => e.stopPropagation()}
            style={{
              backgroundColor: 'rgba(30, 41, 59, 0.95)',
              borderRadius: '24px',
              maxWidth: '900px',
              maxHeight: '90vh',
              width: '100%',
              overflow: 'auto',
              border: '1px solid rgba(139, 92, 246, 0.3)',
              boxShadow: '0 25px 50px -12px rgba(139, 92, 246, 0.25)',
              position: 'relative'
            }}
          >
            {/* Bouton de fermeture */}
            <button
              onClick={closeModal}
              style={{
                position: 'absolute',
                top: '1.5rem',
                right: '1.5rem',
                width: '40px',
                height: '40px',
                borderRadius: '50%',
                backgroundColor: 'rgba(139, 92, 246, 0.2)',
                border: '1px solid #8b5cf6',
                color: '#a78bfa',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '1.5rem',
                transition: 'all 0.3s ease',
                zIndex: 10
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = 'rgba(139, 92, 246, 0.4)';
                e.currentTarget.style.transform = 'scale(1.1)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = 'rgba(139, 92, 246, 0.2)';
                e.currentTarget.style.transform = 'scale(1)';
              }}
            >
              ✕
            </button>

            <div style={{ padding: '2.5rem' }}>
              {/* Image du projet */}
              <div style={{
                width: '100%',
                height: '300px',
                borderRadius: '16px',
                overflow: 'hidden',
                marginBottom: '2rem',
                border: '2px solid rgba(139, 92, 246, 0.2)'
              }}>
                <Image 
                  src={projects[selectedProject].image}
                  alt={projects[selectedProject].title}
                  width={900}
                  height={300}
                  quality={55}
                  loading="lazy"
                  sizes="(max-width: 768px) 100vw, 900px"
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover'
                  }}
                />
              </div>

              {/* Titre et statut */}
              <div style={{ marginBottom: '1.5rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '0.5rem' }}>
                  <h2 style={{
                    fontSize: '2rem',
                    fontWeight: 'bold',
                    color: 'white',
                    margin: 0
                  }}>
                    {projects[selectedProject].title}
                  </h2>
                  <span className={`status-badge ${projects[selectedProject].status === 'Terminé' ? 'completed' : 'in-progress'}`}>
                    {projects[selectedProject].status}
                  </span>
                </div>
                <p style={{ fontSize: '1.125rem', color: '#94a3b8', margin: 0 }}>
                  {projects[selectedProject].subtitle}
                </p>
              </div>

              {/* Description */}
              <div style={{ marginBottom: '2rem' }}>
                <h3 style={{ fontSize: '1.25rem', fontWeight: '600', color: 'white', marginBottom: '0.75rem' }}>
                  Description
                </h3>
                <p style={{ fontSize: '1rem', color: '#cbd5e1', lineHeight: '1.6' }}>
                  {projects[selectedProject].description}
                </p>
              </div>

              {/* Technologies */}
              <div style={{ marginBottom: '2rem' }}>
                <h3 style={{ fontSize: '1.25rem', fontWeight: '600', color: 'white', marginBottom: '0.75rem' }}>
                  Technologies utilisées
                </h3>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
                  {projects[selectedProject].technologies.map((tech, idx) => (
                    <span key={idx} className="tech-pill" style={{
                      padding: '0.5rem 1rem',
                      backgroundColor: 'rgba(139, 92, 246, 0.2)',
                      border: '1px solid #8b5cf6',
                      borderRadius: '999px',
                      color: '#a78bfa',
                      fontSize: '0.875rem',
                      fontWeight: '500'
                    }}>
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              {/* Fonctionnalités */}
              <div style={{ marginBottom: '2rem' }}>
                <h3 style={{ fontSize: '1.25rem', fontWeight: '600', color: 'white', marginBottom: '0.75rem' }}>
                  Fonctionnalités principales
                </h3>
                <ul style={{ 
                  listStyle: 'none', 
                  padding: 0, 
                  margin: 0,
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '0.5rem'
                }}>
                  {projects[selectedProject].features.map((feature, idx) => (
                    <li key={idx} style={{
                      color: '#cbd5e1',
                      fontSize: '1rem',
                      paddingLeft: '1.5rem',
                      position: 'relative'
                    }}>
                      <span style={{
                        position: 'absolute',
                        left: 0,
                        color: '#8b5cf6'
                      }}>
                        ✓
                      </span>
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Boutons d'action */}
              <div style={{ 
                display: 'flex', 
                gap: '1rem',
                justifyContent: 'center',
                paddingTop: '1rem',
                borderTop: '1px solid rgba(139, 92, 246, 0.2)'
              }}>
                <a 
                  href={projects[selectedProject].githubUrl} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="btn-elegant btn-elegant-primary"
                  style={{ fontSize: '1rem', padding: '0.875rem 2rem' }}
                >
                  Voir le code
                </a>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
} 