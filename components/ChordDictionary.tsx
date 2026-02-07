
import React, { useState, useMemo } from 'react';
import { Note, ChordQuality } from '../types';
import { NOTES } from '../constants';
import { getChordNotes, getChordFriendlyName } from '../services/musicLogic';
import { audioService } from '../services/audioService';
import Piano from './Piano';

const ChordDictionary: React.FC = () => {
  const [root, setRoot] = useState<Note>('C');
  const [quality, setQuality] = useState<ChordQuality>(ChordQuality.Major);

  const chordNotes = useMemo(() => getChordNotes(root, quality), [root, quality]);
  const friendlyName = useMemo(() => getChordFriendlyName(root, quality), [root, quality]);

  const handlePlayChord = () => {
    audioService.playChord(chordNotes, 4);
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="bg-slate-900/80 backdrop-blur-md p-6 md:p-10 rounded-[2.5rem] border border-white/5 shadow-2xl flex flex-col gap-8">
        {/* Header Centralizado com Destaque em Azul */}
        <div className="text-center">
          <h2 className="text-3xl md:text-4xl font-black text-white tracking-tight mb-2 uppercase leading-tight">
            Dicionário de <br className="sm:hidden" />
            <span className="text-sky-500">Acordes</span>
          </h2>
          <p className="text-slate-500 text-sm font-medium">Biblioteca completa de variações harmônicas.</p>
        </div>
        
        {/* Seletores */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-3">
            <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest ml-1">Nota Tônica</label>
            <div className="grid grid-cols-6 gap-2">
              {NOTES.map(n => (
                <button
                  key={n}
                  onClick={() => setRoot(n)}
                  className={`py-2.5 rounded-xl font-bold text-sm transition-all border ${
                    root === n 
                    ? 'bg-sky-600 border-sky-400 text-white shadow-lg' 
                    : 'bg-slate-800 border-slate-700 text-slate-400 hover:border-slate-500 hover:text-white'
                  }`}
                >
                  {n}
                </button>
              ))}
            </div>
          </div>

          <div className="space-y-3">
            <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest ml-1">Variações do Acorde</label>
            <select 
              value={quality}
              onChange={(e) => setQuality(e.target.value as ChordQuality)}
              className="w-full bg-slate-800 border border-slate-700 text-white rounded-2xl p-4 focus:ring-4 focus:ring-sky-500/20 outline-none transition-all font-bold appearance-none cursor-pointer"
            >
              {Object.values(ChordQuality).map(q => <option key={q} value={q}>{q}</option>)}
            </select>
          </div>
        </div>

        {/* Display do Acorde Selecionado */}
        <div className="relative bg-slate-950/50 p-8 rounded-[2rem] border border-white/5 overflow-hidden text-center shadow-inner">
          <h3 className="text-6xl font-black text-white mb-2 tracking-tighter">
            {root}<span className="text-sky-500">{quality}</span>
          </h3>
          <p className="text-sky-400 font-bold uppercase tracking-[0.3em] text-[10px] mb-8">{friendlyName}</p>
          
          <div className="flex justify-center flex-wrap gap-3">
            {chordNotes.map((n, i) => (
              <div key={i} className="flex flex-col items-center gap-1">
                <div className="w-12 h-12 bg-slate-800 text-white border border-white/5 flex items-center justify-center rounded-xl text-lg font-black shadow-lg">
                  {n}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Teclado Virtual Integrado */}
        <div className="flex flex-col items-center gap-6">
          <div className="w-full">
            <Piano activeNotes={chordNotes} />
          </div>
          
          <button 
            onClick={handlePlayChord}
            className="group relative w-full sm:w-auto bg-sky-600 hover:bg-sky-500 text-white font-black py-4 px-12 rounded-2xl transition-all shadow-xl shadow-sky-900/40 active:scale-95 flex items-center justify-center gap-3 overflow-hidden"
          >
            <span className="relative z-10 flex items-center gap-2 text-base">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M15.536 8.464a5 5 0 010 7.072m2.828-9.9a9 9 0 010 12.728M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z" />
              </svg>
              OUVIR ACORDE
            </span>
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChordDictionary;
