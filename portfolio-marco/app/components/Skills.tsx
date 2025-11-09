'use client';

const Skills = () => {
  // === CONFIGURATION DES COMPÉTENCES ===
  const allSkills = [
    { name: 'JavaScript', level: 90 },
    { name: 'TypeScript', level: 85 },
    { name: 'React', level: 85 },
    { name: 'Next.js', level: 80 },
    { name: 'HTML5', level: 95 },
    { name: 'CSS3', level: 90 },
    { name: 'Tailwind CSS', level: 85 },
    { name: 'PHP', level: 80 },
    { name: 'Ruby', level: 75 },
    { name: 'Laravel', level: 75 },
    { name: 'Node.js', level: 70 },
    { name: 'SQL', level: 80 },
    { name: 'PostgreSQL', level: 75 },
    { name: 'MySQL', level: 80 },
    { name: 'Docker', level: 70 },
    { name: 'VS Code', level: 90 }
  ];

  return (
    <section id="skills" className="section bg-gradient-to-br from-slate-950 via-purple-950/20 to-indigo-950">
      {/* === EFFETS DE FOND === */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-grid-pattern opacity-20"></div>
        <div className="absolute top-1/4 left-20 w-72 h-72 bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-full blur-3xl animate-float"></div>
        <div className="absolute bottom-1/4 right-20 w-96 h-96 bg-gradient-to-r from-blue-500/15 to-cyan-500/15 rounded-full blur-3xl animate-float" style={{ animationDelay: '3s' }}></div>
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="max-w-6xl mx-auto">
          
          {/* === EN-TÊTE === */}
          <div className="text-center mb-20">
            <h2 className="section-title">Mes Compétences</h2>
            <p className="section-subtitle" style={{ marginBottom: '6rem' }}>
              Technologies et outils que je maîtrise pour créer des solutions complètes
            </p>
          </div>

          {/* === GRILLE DES COMPÉTENCES === */}
          <div className="grid grid-cols-4 gap-3">
            {allSkills.map((skill, index) => {
              // Calcul de la progression circulaire
              const radius = 44;
              const circumference = 2 * Math.PI * radius;
              const progress = (skill.level / 100) * circumference;
              
              return (
                <div 
                  key={skill.name}
                  className="group cursor-pointer flex justify-center"
                  style={{ animationDelay: `${index * 0.03}s` }}
                >
                  <div className="relative hover:scale-105 transition-all duration-300" style={{ width: '90px', height: '90px' }}>
                    <svg className="absolute inset-0 w-full h-full transform -rotate-90" viewBox="0 0 100 100">
                      <circle
                        cx="50"
                        cy="50"
                        r={radius}
                        stroke="rgba(255, 255, 255, 0.08)"
                        strokeWidth="5"
                        fill="rgba(30, 41, 59, 0.25)"
                      />
                      <circle
                        cx="50"
                        cy="50"
                        r={radius}
                        stroke="#8b5cf6"
                        strokeWidth="5"
                        fill="none"
                        strokeDasharray={circumference}
                        strokeDashoffset={circumference - progress}
                        strokeLinecap="round"
                        className="transition-all duration-1000 ease-out"
                        style={{
                          filter: 'drop-shadow(0 0 4px rgba(139, 92, 246, 0.5))'
                        }}
                      />
                    </svg>
                    
                    <div className="absolute top-0 left-0 w-full h-full flex flex-col items-center justify-center" style={{ padding: '8px' }}>
                      <h3 className="font-bold text-white text-center" style={{ fontSize: '10px', lineHeight: '1.2', marginBottom: '1px' }}>
                        {skill.name}
                      </h3>
                      <div className="font-black text-purple-400" style={{ fontSize: '13px' }}>
                        {skill.level}%
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

        </div>
      </div>
    </section>
  );
};

export default Skills;
