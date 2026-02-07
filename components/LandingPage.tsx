
import React from 'react';

interface LandingPageProps {
  onStart: () => void;
}

const LandingPage: React.FC<LandingPageProps> = ({ onStart }) => {
  return (
    <div className="min-h-screen bg-[#0f172a] text-slate-200 overflow-x-hidden">
      {/* Hero Section */}
      <section className="relative pt-20 pb-32 px-4 overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-sky-900/20 via-transparent to-transparent -z-10"></div>
        
        <div className="max-w-5xl mx-auto text-center">
          <div className="inline-block px-4 py-1.5 mb-6 rounded-full border border-sky-500/30 bg-sky-500/10 text-sky-400 text-xs font-bold uppercase tracking-widest animate-bounce">
            Oferta de Lançamento: 80% OFF
          </div>
          <h1 className="text-5xl md:text-7xl font-black text-white mb-8 tracking-tighter leading-tight">
            Pare de "Travar" e Domine o <br/>
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-sky-400 via-indigo-400 to-emerald-400">
              Teclado de uma vez por todas
            </span>
          </h1>
          <p className="text-xl text-slate-400 mb-12 max-w-2xl mx-auto leading-relaxed">
            Tenha acesso ao guia definitivo de acordes, campos harmônicos em todos os tons e um treinador com IA no seu bolso.
          </p>
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
            <button 
              onClick={onStart}
              className="group relative px-10 py-5 bg-sky-600 hover:bg-sky-500 text-white font-black text-lg rounded-2xl transition-all shadow-[0_0_40px_rgba(2,132,199,0.3)] hover:shadow-[0_0_60px_rgba(2,132,199,0.5)] active:scale-95"
            >
              QUERO ACESSO IMEDIATO
              <div className="absolute inset-0 rounded-2xl border-2 border-white/20 group-hover:scale-105 transition-transform"></div>
            </button>
            <div className="text-left">
              <p className="text-slate-500 text-sm line-through">De R$ 197,00</p>
              <p className="text-white text-3xl font-black">R$ 37,90</p>
              <p className="text-emerald-400 text-[10px] font-bold uppercase tracking-widest">Acesso Vitalício</p>
            </div>
          </div>
        </div>
      </section>

      {/* Social Proof / Stats */}
      <section className="py-12 border-y border-slate-800 bg-slate-900/50">
        <div className="max-w-7xl mx-auto px-4 grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          <div>
            <p className="text-3xl font-black text-white">18+</p>
            <p className="text-slate-500 text-xs uppercase font-bold tracking-widest">Variações de Acordes</p>
          </div>
          <div>
            <p className="text-3xl font-black text-white">24</p>
            <p className="text-slate-500 text-xs uppercase font-bold tracking-widest">Campos Harmônicos</p>
          </div>
          <div>
            <p className="text-3xl font-black text-white">IA</p>
            <p className="text-slate-500 text-xs uppercase font-bold tracking-widest">Treinador Inteligente</p>
          </div>
          <div>
            <p className="text-3xl font-black text-white">100%</p>
            <p className="text-slate-500 text-xs uppercase font-bold tracking-widest">Prático e Mobile</p>
          </div>
        </div>
      </section>

      {/* Features Detail */}
      <section className="py-24 px-4 max-w-7xl mx-auto">
        <h2 className="text-3xl md:text-5xl font-black text-center text-white mb-20 tracking-tight">
          O que você vai receber hoje:
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Card 1 */}
          <div className="bg-slate-900/50 p-8 rounded-[2.5rem] border border-slate-800 hover:border-sky-500/50 transition-all">
            <div className="w-14 h-14 bg-sky-500/10 rounded-2xl flex items-center justify-center text-3xl mb-6 shadow-lg shadow-sky-900/20">🎹</div>
            <h3 className="text-xl font-bold text-white mb-4">Dicionário Premium</h3>
            <p className="text-slate-400 text-sm leading-relaxed">
              De tríades básicas a tétrades jazzísticas (9ª, 11ª, 13ª e Alterados). Nunca mais se sinta perdido ao ler uma cifra complexa.
            </p>
          </div>
          
          {/* Card 2 */}
          <div className="bg-slate-900/50 p-8 rounded-[2.5rem] border border-slate-800 hover:border-emerald-500/50 transition-all">
            <div className="w-14 h-14 bg-emerald-500/10 rounded-2xl flex items-center justify-center text-3xl mb-6 shadow-lg shadow-emerald-900/20">🎼</div>
            <h3 className="text-xl font-bold text-white mb-4">Campo Harmônico Pro</h3>
            <p className="text-slate-400 text-sm leading-relaxed">
              Visualize instantaneamente as famílias de acordes em todos os tons. Escolha entre Tríades ou Tétrades com um clique.
            </p>
          </div>

          {/* Card 3 */}
          <div className="bg-slate-900/50 p-8 rounded-[2.5rem] border border-slate-800 hover:border-amber-500/50 transition-all">
            <div className="w-14 h-14 bg-amber-500/10 rounded-2xl flex items-center justify-center text-3xl mb-6 shadow-lg shadow-amber-900/20">🤖</div>
            <h3 className="text-xl font-bold text-white mb-4">Treino com IA</h3>
            <p className="text-slate-400 text-sm leading-relaxed">
              Nossa inteligência artificial cria rotinas de estudo personalizadas para você evoluir 10x mais rápido em técnica e teoria.
            </p>
          </div>
        </div>
      </section>

      {/* Closing CTA */}
      <section className="py-24 px-4 bg-gradient-to-b from-slate-950 to-indigo-950">
        <div className="max-w-3xl mx-auto text-center bg-slate-900/80 p-12 rounded-[3rem] border border-white/5 shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 right-0 p-4 opacity-10 text-8xl">🎵</div>
          
          <h2 className="text-4xl font-black text-white mb-6">Pronto para subir de nível?</h2>
          <p className="text-slate-400 mb-10 text-lg">
            Aproveite o preço promocional e comece a tocar como um profissional hoje mesmo.
          </p>
          
          <button 
            onClick={onStart}
            className="w-full sm:w-auto px-12 py-6 bg-gradient-to-r from-emerald-600 to-sky-600 hover:from-emerald-500 hover:to-sky-500 text-white font-black text-xl rounded-2xl shadow-2xl transition-all hover:scale-105 active:scale-95"
          >
            GARANTIR MINHA VAGA POR R$ 37,90
          </button>
          
          <div className="mt-8 flex items-center justify-center gap-4 text-slate-500 text-xs font-bold uppercase tracking-widest">
            <span className="flex items-center gap-1">🔒 Compra Segura</span>
            <span className="flex items-center gap-1">✅ 7 Dias de Garantia</span>
          </div>
        </div>
      </section>

      <footer className="py-12 text-center text-slate-600 text-[10px] uppercase tracking-[0.3em]">
        KeyMaster Pro - Domine as teclas.
      </footer>
    </div>
  );
};

export default LandingPage;
