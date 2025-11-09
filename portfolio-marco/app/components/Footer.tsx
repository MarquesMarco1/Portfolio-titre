'use client';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-slate-950 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-6">
        <div className="py-6">
          <div className="flex flex-col justify-center items-center space-y-2">
            <div className="text-slate-500 text-xs text-center">
              © {currentYear} Marc Xavier Marques
            </div>
            <div className="text-slate-500 text-xs text-center">
              Tous droits réservés
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer; 