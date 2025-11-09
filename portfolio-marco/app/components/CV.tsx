'use client';

import { useState } from 'react';

const CV = () => {
  const [isDownloading, setIsDownloading] = useState(false);

  // === GESTION DU TÉLÉCHARGEMENT DU CV ===
  const handleDownload = () => {
    setIsDownloading(true);
    
    const link = document.createElement('a');
    link.href = '/cv/marc-marques-cv.pdf';
    link.download = 'Marc_Marques_CV.pdf';
    link.target = '_blank';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    
    setTimeout(() => setIsDownloading(false), 1000);
  };

  return (
    <section id="cv" className="bg-gradient-to-br from-slate-950 via-purple-950/30 to-slate-950" style={{ padding: '4rem 0', marginTop: '6rem' }}>
      {/* === EFFETS DE FOND === */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-grid-pattern opacity-20"></div>
        <div className="absolute top-1/4 right-20 w-80 h-80 bg-gradient-to-r from-orange-500/20 to-red-500/20 rounded-full blur-3xl animate-float"></div>
        <div className="absolute bottom-1/4 left-20 w-72 h-72 bg-gradient-to-r from-cyan-500/15 to-blue-500/15 rounded-full blur-3xl animate-float" style={{ animationDelay: '3s' }}></div>
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="max-w-6xl mx-auto">
          <div className="text-center">
            <div className="glass rounded-3xl p-8 relative overflow-hidden">
              <div className="absolute top-0 left-0 w-64 h-64 bg-gradient-to-br from-orange-500/10 to-red-500/10 rounded-full blur-3xl"></div>
              
              <div className="relative z-10">
                <h3 className="section-title mb-4">Télécharger mon CV</h3>
                <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
                  Retrouvez l&apos;ensemble de mon parcours, mes compétences et réalisations 
                  dans un document PDF complet et détaillé.
                </p>
                
                <button
                  onClick={handleDownload}
                  disabled={isDownloading}
                  className={`btn-elegant btn-elegant-primary ${isDownloading ? 'opacity-75 cursor-not-allowed' : ''}`}
                >
                  {isDownloading ? 'Préparation...' : 'Télécharger le CV'}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CV; 