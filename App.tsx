
import React, { useState } from 'react';
import ChordDictionary from './components/ChordDictionary';
import HarmonicField from './components/HarmonicField';
import ScalesExplorer from './components/ScalesExplorer';

type Tab = 'chords' | 'harmonic' | 'scales';

const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState<Tab>('chords');

  return (
    <div className="min-h-screen bg-slate-950 text-slate-200 font-sans selection:bg-sky-500/30">
      {/* Header Compacto e Otimizado */}
      <header className="bg-slate-900/90 backdrop-blur-xl sticky top-0 z-50 border-b border-white/5 shadow-2xl">
        <div className="max-w-7xl mx-auto px-2 py-3 md:py-5 flex flex-col md:flex-row justify-between items-center gap-3 md:gap-8">
          
          {/* Logo - Tamanho Ampliado para Proporcionalidade */}
          <div className="flex items-center justify-center md:justify-start">
            <div className="flex items-center gap-3 md:gap-4">
              <div className="w-12 h-12 md:w-16 md:h-16 bg-gradient-to-br from-sky-500 to-indigo-600 rounded-2xl flex items-center justify-center shadow-lg shadow-sky-500/20 transform rotate-3">
                <span className="text-2xl md:text-4xl">🎹</span>
              </div>
              <h1 className="text-2xl md:text-4xl font-black tracking-tighter text-white">
                Key<span className="text-sky-500 text-glow">Master</span>
              </h1>
            </div>
          </div>
          
          {/* Navegação - Fonte GIGANTE e Espaçamento Ultra-Reduzido */}
          <nav className="w-full md:w-auto grid grid-cols-3 gap-1 bg-slate-950/80 p-0.5 rounded-2xl border border-white/5 shadow-inner">
            {[
              { id: 'chords', label: 'Acordes', color: 'bg-sky-600', icon: '🎸' },
              { id: 'harmonic', label: 'Campo Harmônico', color: 'bg-emerald-600', icon: '🎼' },
              { id: 'scales', label: 'Escalas', color: 'bg-purple-600', icon: '🎵' }
            ].map((tab) => (
              <button 
                key={tab.id}
                onClick={() => setActiveTab(tab.id as Tab)}
                className={`relative flex flex-col items-center justify-center gap-0 px-0.5 py-1 md:px-12 md:py-3 rounded-xl transition-all duration-300 ${
                  activeTab === tab.id 
                  ? `${tab.color} text-white shadow-lg z-10` 
                  : 'text-slate-500 hover:text-slate-300 hover:bg-white/5'
                }`}
              >
                <span className="text-2xl sm:text-4xl leading-none mb-0.5">{tab.icon}</span>
                <span className={`font-black uppercase tracking-tighter text-center leading-[0.95] flex flex-col ${
                  tab.id === 'harmonic' 
                  ? 'text-[15px] sm:text-[20px]' 
                  : 'text-[17px] sm:text-[24px]'
                }`}>
                  {tab.id === 'harmonic' ? (
                    <>
                      <span>Campo</span>
                      <span>Harmônico</span>
                    </>
                  ) : (
                    <span>{tab.label}</span>
                  )}
                </span>
              </button>
            ))}
          </nav>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 py-4 md:py-10">
        <div className="animate-slideUp">
          {activeTab === 'chords' && <ChordDictionary />}
          {activeTab === 'harmonic' && <HarmonicField />}
          {activeTab === 'scales' && <ScalesExplorer />}
        </div>
      </main>

      <footer className="mt-8 md:mt-16 py-6 md:py-8 border-t border-white/5 bg-slate-900/20">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <p className="text-slate-600 text-[8px] font-bold uppercase tracking-[0.4em]">
            KeyMaster Pro &copy; {new Date().getFullYear()} - Essencial para Tecladistas.
          </p>
        </div>
      </footer>

      <style>{`
        .text-glow {
          text-shadow: 0 0 20px rgba(14, 165, 233, 0.6);
        }
        @keyframes slideUp {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-slideUp {
          animation: slideUp 0.4s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }
      `}</style>
    </div>
  );
};

export default App;
