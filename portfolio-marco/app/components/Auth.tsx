'use client';

import { useState } from 'react';
import { supabase } from '@/lib/supabase';

interface AuthProps {
  onClose: () => void;
  onSuccess: () => void;
}

export default function Auth({ onClose, onSuccess }: AuthProps) {
  const [isLogin, setIsLogin] = useState(true);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    fullName: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
    setError('');
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const { error: signInError } = await supabase.auth.signInWithPassword({
        email: formData.email,
        password: formData.password,
      });

      if (signInError) throw signInError;

      setSuccess('Connexion réussie ! Bienvenue 🎉');
      setTimeout(() => {
        onSuccess();
        onClose();
      }, 1500);
    } catch (err) {
      const error = err as Error;
      setError(error.message || 'Erreur lors de la connexion');
    } finally {
      setLoading(false);
    }
  };

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    if (formData.password.length < 6) {
      setError('Le mot de passe doit contenir au moins 6 caractères');
      setLoading(false);
      return;
    }

    try {
      const { data, error: signUpError } = await supabase.auth.signUp({
        email: formData.email,
        password: formData.password,
        options: {
          data: {
            full_name: formData.fullName,
          },
          emailRedirectTo: `${window.location.origin}`,
        },
      });

      if (signUpError) throw signUpError;

      // Connexion automatique après inscription
      if (data.user && data.session) {
        setSuccess('Compte créé avec succès ! Connexion en cours... 🎉');
        setTimeout(() => {
          onSuccess();
          onClose();
        }, 1500);
      } else {
        // Compte créé mais session non disponible immédiatement
        setSuccess('Compte créé avec succès ! Vous pouvez maintenant vous connecter. ✅');
        setTimeout(() => {
          setIsLogin(true);
          setSuccess('');
          // Pré-remplir l'email pour faciliter la connexion
          setFormData(prev => ({ ...prev, password: '' }));
        }, 2500);
      }
    } catch (err) {
      const error = err as Error;
      setError(error.message || 'Erreur lors de l\'inscription');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div 
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'rgba(0, 0, 0, 0.7)',
        backdropFilter: 'blur(10px)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 9999,
        padding: '20px'
      }}
      onClick={onClose}
    >
      <div 
        style={{
          position: 'relative',
          width: '100%',
          maxWidth: '500px',
          height: '75vh',
          minHeight: '500px',
          maxHeight: '800px',
          backgroundColor: '#1e293b',
          borderRadius: '24px',
          padding: '40px',
          border: '1px solid rgba(71, 85, 105, 0.5)',
          boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)',
          overflow: 'auto'
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Bouton fermer */}
        <button
          onClick={onClose}
          style={{
            position: 'absolute',
            top: '20px',
            right: '20px',
            width: '40px',
            height: '40px',
            borderRadius: '50%',
            backgroundColor: 'rgba(51, 65, 85, 0.5)',
            border: 'none',
            color: '#94a3b8',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '20px',
            transition: 'all 0.3s ease',
            zIndex: 10
          }}
          onMouseEnter={(e) => e.currentTarget.style.backgroundColor = 'rgba(71, 85, 105, 0.7)'}
          onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'rgba(51, 65, 85, 0.5)'}
        >
          ×
        </button>

        {/* Onglets Inscription / Connexion */}
        <div style={{ 
          display: 'flex', 
          gap: '8px', 
          marginBottom: '40px',
          backgroundColor: 'rgba(15, 23, 42, 0.6)',
          padding: '6px',
          borderRadius: '16px',
          position: 'relative'
        }}>
          <button
            onClick={() => {
              setIsLogin(false);
              setError('');
              setSuccess('');
            }}
            style={{
              flex: 1,
              padding: '12px 24px',
              border: 'none',
              borderRadius: '12px',
              fontSize: '15px',
              fontWeight: '600',
              cursor: 'pointer',
              transition: 'all 0.3s ease',
              backgroundColor: !isLogin ? '#3b82f6' : 'transparent',
              color: !isLogin ? 'white' : '#94a3b8',
              transform: !isLogin ? 'scale(1.02)' : 'scale(1)',
              boxShadow: !isLogin ? '0 4px 12px rgba(59, 130, 246, 0.4)' : 'none'
            }}
          >
            Inscription
          </button>
          <button
            onClick={() => {
              setIsLogin(true);
              setError('');
              setSuccess('');
            }}
            style={{
              flex: 1,
              padding: '12px 24px',
              border: 'none',
              borderRadius: '12px',
              fontSize: '15px',
              fontWeight: '600',
              cursor: 'pointer',
              transition: 'all 0.3s ease',
              backgroundColor: isLogin ? '#3b82f6' : 'transparent',
              color: isLogin ? 'white' : '#94a3b8',
              transform: isLogin ? 'scale(1.02)' : 'scale(1)',
              boxShadow: isLogin ? '0 4px 12px rgba(59, 130, 246, 0.4)' : 'none'
            }}
          >
            Connexion
          </button>
        </div>

        {/* Icône et titre */}
        <div style={{ textAlign: 'center', marginBottom: '30px' }}>
          <div 
            style={{
              width: '60px',
              height: '60px',
              background: 'linear-gradient(135deg, #3b82f6 0%, #6366f1 100%)',
              borderRadius: '16px',
              margin: '0 auto 20px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              transition: 'transform 0.3s ease',
              transform: 'scale(1)'
            }}
          >
            <svg width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2">
              <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
              <circle cx="12" cy="7" r="4" />
            </svg>
          </div>
          <p style={{ 
            color: '#94a3b8', 
            fontSize: '14px',
            opacity: 1,
            transition: 'opacity 0.3s ease'
          }}>
            {isLogin ? 'Accédez à votre espace personnel' : 'Créez votre compte en quelques secondes'}
          </p>
        </div>

        {/* Messages */}
        {error && (
          <div style={{
            padding: '12px',
            marginBottom: '20px',
            backgroundColor: 'rgba(239, 68, 68, 0.1)',
            border: '1px solid rgba(239, 68, 68, 0.3)',
            borderRadius: '12px',
            color: '#fca5a5',
            fontSize: '14px'
          }}>
            {error}
          </div>
        )}

        {success && (
          <div style={{
            padding: '12px',
            marginBottom: '20px',
            backgroundColor: 'rgba(34, 197, 94, 0.1)',
            border: '1px solid rgba(34, 197, 94, 0.3)',
            borderRadius: '12px',
            color: '#86efac',
            fontSize: '14px'
          }}>
            {success}
          </div>
        )}

        {/* Formulaire avec animation */}
        <form 
          onSubmit={isLogin ? handleLogin : handleRegister}
          style={{
            animation: 'fadeInSlide 0.4s ease-out'
          }}
          key={isLogin ? 'login' : 'register'}
        >
          {!isLogin && (
            <div style={{ marginBottom: '20px' }}>
              <label style={{ display: 'block', color: '#cbd5e1', fontSize: '14px', marginBottom: '8px', fontWeight: '500' }}>
                Nom complet
              </label>
              <input
                type="text"
                name="fullName"
                value={formData.fullName}
                onChange={handleChange}
                required={!isLogin}
                placeholder="John Doe"
                style={{
                  width: '100%',
                  padding: '12px',
                  backgroundColor: 'rgba(30, 41, 59, 0.5)',
                  border: '1px solid rgba(71, 85, 105, 0.5)',
                  borderRadius: '12px',
                  color: 'white',
                  fontSize: '14px',
                  outline: 'none'
                }}
              />
            </div>
          )}

          <div style={{ marginBottom: '20px' }}>
            <label style={{ display: 'block', color: '#cbd5e1', fontSize: '14px', marginBottom: '8px', fontWeight: '500' }}>
              Email
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              placeholder="vous@exemple.com"
              style={{
                width: '100%',
                padding: '12px',
                backgroundColor: 'rgba(30, 41, 59, 0.5)',
                border: '1px solid rgba(71, 85, 105, 0.5)',
                borderRadius: '12px',
                color: 'white',
                fontSize: '14px',
                outline: 'none'
              }}
            />
          </div>

          <div style={{ marginBottom: '20px' }}>
            <label style={{ display: 'block', color: '#cbd5e1', fontSize: '14px', marginBottom: '8px', fontWeight: '500' }}>
              Mot de passe
            </label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
              placeholder="••••••••"
              minLength={6}
              style={{
                width: '100%',
                padding: '12px',
                backgroundColor: 'rgba(30, 41, 59, 0.5)',
                border: '1px solid rgba(71, 85, 105, 0.5)',
                borderRadius: '12px',
                color: 'white',
                fontSize: '14px',
                outline: 'none'
              }}
            />
            {!isLogin && (
              <p style={{ color: '#64748b', fontSize: '12px', marginTop: '6px' }}>
                Minimum 6 caractères
              </p>
            )}
          </div>

          <button
            type="submit"
            disabled={loading}
            style={{
              width: '100%',
              padding: '14px',
              background: 'linear-gradient(135deg, #3b82f6 0%, #6366f1 100%)',
              border: 'none',
              borderRadius: '12px',
              color: 'white',
              fontSize: '16px',
              fontWeight: '600',
              cursor: loading ? 'not-allowed' : 'pointer',
              opacity: loading ? 0.5 : 1,
              marginTop: '10px'
            }}
          >
            {loading ? 'Chargement...' : (isLogin ? 'Se connecter' : "S'inscrire")}
          </button>
        </form>


        {/* Note sécurité */}
        <div style={{
          marginTop: '24px',
          paddingTop: '24px',
          borderTop: '1px solid rgba(71, 85, 105, 0.5)',
          display: 'flex',
          gap: '8px',
          color: '#64748b',
          fontSize: '12px'
        }}>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#3b82f6" strokeWidth="2">
            <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
            <path d="M7 11V7a5 5 0 0 1 10 0v4" />
          </svg>
          <p style={{ lineHeight: '1.5' }}>
            Connexion sécurisée. Vos données sont protégées et chiffrées.
          </p>
        </div>
      </div>
    </div>
  );
}
