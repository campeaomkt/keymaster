
import React, { useState, useMemo } from 'react';
import { Note } from '../types';
import { NOTES } from '../constants';
import { getHarmonicField } from '../services/musicLogic';

const HarmonicField: React.FC = () => {
  const [root, setRoot] = useState<Note>('C');
  const [mode, setMode] = useState<'major' | 'minor'>('major');
  const [useTetrads, setUseTetrads] = useState(false);

  const chords = useMemo(() => getHarmonicField(root, mode === 'major', useTetrads), [root, mode, useTetrads]);
  const numerals = ['I', 'ii', 'iii', 'IV', 'V', 'vi', 'vii°'];
  const minorNumerals = ['i', 'ii°', 'III', 'iv', 'v', 'VI', 'VII'];

  return (
    <div className="bg-slate-900/80 backdrop-blur-md p-8 rounded-[2.5rem] border border-white/5 shadow-2xl">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-10">
        <div>
          <h2 className="text-3xl font-black text-white tracking-tight mb-2">Campo Harmônico</h2>
          <p className="text-slate-500 text-sm">Visualize a família de acordes em qualquer tom.</p>
        </div>
        <div className="flex bg-slate-950 p-1 rounded-xl border border-white/5 shadow-inner">
          <button 
            onClick={() => setUseTetrads(false)}
            className={`px-6 py-2 rounded-lg text-xs font-black transition-all ${!useTetrads ? 'bg-slate-800 text-white shadow-md' : 'text-slate-500 hover:text-slate-300'}`}
          >
            TRÍADES
          </button>
          <button 
            onClick={() => setUseTetrads(true)}
            className={`px-6 py-2 rounded-lg text-xs font-black transition-all ${useTetrads ? 'bg-emerald-600 text-white shadow-md' : 'text-slate-500 hover:text-slate-300'}`}
          >
            TÉTRADES
          </button>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
        <div className="space-y-4">
          <label className="text-xs font-black text-slate-500 uppercase tracking-widest ml-1">Tom Principal</label>
          <select 
            value={root}
            onChange={(e) => setRoot(e.target.value as Note)}
            className="w-full bg-slate-800 border border-slate-700 text-white rounded-2xl p-4 focus:ring-4 focus:ring-emerald-500/20 outline-none transition-all font-bold appearance-none cursor-pointer"
          >
            {NOTES.map(n => <option key={n} value={n}>{n}</option>)}
          </select>
        </div>
        <div className="space-y-4">
          <label className="text-xs font-black text-slate-500 uppercase tracking-widest ml-1">Modo Musical</label>
          <div className="flex bg-slate-800 p-1 rounded-2xl border border-slate-700 h-[60px]">
            <button 
              onClick={() => setMode('major')}
              className={`flex-1 rounded-xl font-black text-xs transition-all ${mode === 'major' ? 'bg-emerald-600 text-white shadow-lg' : 'text-slate-500 hover:text-white'}`}
            >
              MAIOR
            </button>
            <button 
              onClick={() => setMode('minor')}
              className={`flex-1 rounded-xl font-black text-xs transition-all ${mode === 'minor' ? 'bg-emerald-600 text-white shadow-lg' : 'text-slate-500 hover:text-white'}`}
            >
              MENOR
            </button>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-4">
        {chords.map((chord, i) => (
          <div key={i} className="group bg-slate-950 p-6 rounded-2xl border border-white/5 text-center hover:border-emerald-500 transition-all duration-300 shadow-xl">
            <p className="text-[10px] text-slate-600 font-black mb-3 uppercase tracking-widest">{mode === 'major' ? numerals[i] : minorNumerals[i]}</p>
            <p className="text-2xl font-black text-white group-hover:text-emerald-400 transition-colors">{chord}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HarmonicField;
