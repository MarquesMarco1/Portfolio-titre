'use client';

import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';
import Auth from './Auth';
import type { User } from '@supabase/supabase-js';

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [showAuth, setShowAuth] = useState(false);
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Récupérer l'utilisateur connecté
    const getUser = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      setUser(user);
      setLoading(false);
    };

    getUser();

    // Écouter les changements d'authentification
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user || null);
    });

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isMenuOpen]);

  const toggleMenu = () => {
    const overlayNav = document.querySelector('.overlay-navigation');
    const navItems = document.querySelectorAll('.overlay-navigation nav li');
    const topBar = document.querySelector('.bar-top');
    const middleBar = document.querySelector('.bar-middle');
    const bottomBar = document.querySelector('.bar-bottom');

    setIsMenuOpen(!isMenuOpen);

    if (!isMenuOpen) {
      // Ouvrir le menu
      overlayNav?.classList.remove('overlay-slide-up');
      overlayNav?.classList.add('overlay-slide-down');
      
      topBar?.classList.remove('animate-out-top-bar');
      topBar?.classList.add('animate-top-bar');
      
      middleBar?.classList.remove('animate-out-middle-bar');
      middleBar?.classList.add('animate-middle-bar');
      
      bottomBar?.classList.remove('animate-out-bottom-bar');
      bottomBar?.classList.add('animate-bottom-bar');

      navItems.forEach((item, index) => {
        // Nettoyer toutes les classes d'animation précédentes
        item.classList.remove('slide-in-nav-item-reverse');
        item.classList.remove(`slide-in-nav-item-delay-${index}-reverse`);
        
        if (index === 0) {
          item.classList.add('slide-in-nav-item');
        } else {
          item.classList.add(`slide-in-nav-item-delay-${index}`);
        }
      });
    } else {
      // Fermer le menu
      overlayNav?.classList.remove('overlay-slide-down');
      overlayNav?.classList.add('overlay-slide-up');
      
      topBar?.classList.remove('animate-top-bar');
      topBar?.classList.add('animate-out-top-bar');
      
      middleBar?.classList.remove('animate-middle-bar');
      middleBar?.classList.add('animate-out-middle-bar');
      
      bottomBar?.classList.remove('animate-bottom-bar');
      bottomBar?.classList.add('animate-out-bottom-bar');

      navItems.forEach((item, index) => {
        item.classList.remove(`slide-in-nav-item-delay-${index}`);
        item.classList.remove('slide-in-nav-item');
        if (index === 0) {
          item.classList.add('slide-in-nav-item-reverse');
        } else {
          item.classList.add(`slide-in-nav-item-delay-${index}-reverse`);
        }
      });
    }
  };

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      toggleMenu(); // Fermer le menu après navigation
    }
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    setUser(null);
  };

  const handleAuthSuccess = () => {
    // L'utilisateur sera mis à jour automatiquement via onAuthStateChange
  };

  return (
    <>
      {/* Modale d'authentification */}
      {showAuth && (
        <Auth
          onClose={() => setShowAuth(false)}
          onSuccess={handleAuthSuccess}
        />
      )}
      
      {/* Icône d'authentification - juste en dessous du menu */}
      <button
        onClick={user ? handleLogout : () => setShowAuth(true)}
        className="fixed z-[999] cursor-pointer"
        style={{ 
          background: 'transparent', 
          border: 'none', 
          padding: 0,
          right: 'calc(1.5rem + 6px)',
          top: '5rem'
        }}
        title={user ? "Logout" : "Login/Register"}
        disabled={loading}
      >
        <svg 
          width="32" 
          height="32" 
          viewBox="0 0 24 24" 
          fill="none" 
          stroke={loading ? "#60A5FA" : user ? "#EF4444" : "#3B82F6"}
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className={loading ? "animate-pulse" : "hover:opacity-80 transition-opacity"}
        >
          <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
          <circle cx="12" cy="7" r="4" />
        </svg>
      </button>

      {/* Navigation Overlay */}
      <div className="overlay-navigation">
        <nav role="navigation">
          <ul>
            <li>
              <a 
                href="#presentation" 
                onClick={(e) => {
                  e.preventDefault();
                  scrollToSection('presentation');
                }}
              >
                Accueil
              </a>
            </li>
            <li>
              <a 
                href="#about" 
                onClick={(e) => {
                  e.preventDefault();
                  scrollToSection('about');
                }}
              >
                À propos
              </a>
            </li>
            <li>
              <a 
                href="#skills" 
                onClick={(e) => {
                  e.preventDefault();
                  scrollToSection('skills');
                }}
              >
                Compétences
              </a>
            </li>
            <li>
              <a 
                href="#projects" 
                onClick={(e) => {
                  e.preventDefault();
                  scrollToSection('projects');
                }}
              >
                Projets
              </a>
            </li>
            <li>
              <a 
                href="#contact" 
                onClick={(e) => {
                  e.preventDefault();
                  scrollToSection('contact');
                }}
              >
                Contact
              </a>
            </li>
          </ul>
        </nav>
      </div>

      {/* Menu Hamburger */}
      <div 
        className="menu-toggle"
        onClick={toggleMenu}
        role="button"
        aria-label="Toggle navigation menu"
        tabIndex={0}
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            toggleMenu();
          }
        }}
      >
        <span className="bar-top"></span>
        <span className="bar-middle"></span>
        <span className="bar-bottom"></span>
      </div>
    </>
  );
} 