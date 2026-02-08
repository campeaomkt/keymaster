
import React, { useState, useMemo } from 'react';
import { Note, ScaleType } from '../types';
import { NOTES } from '../constants';
import { getScaleNotes } from '../services/musicLogic';
import Piano from './Piano';

const ScalesExplorer: React.FC = () => {
  const [root, setRoot] = useState<Note>('C');
  const [type, setType] = useState<ScaleType>(ScaleType.Ionian);

  const scaleNotes = useMemo(() => getScaleNotes(root, type), [root, type]);

  return (
    <div className="max-w-4xl mx-auto">
      <div className="bg-slate-900/80 backdrop-blur-md p-6 md:p-10 rounded-[2.5rem] border border-white/5 shadow-2xl flex flex-col gap-8">
        
        {/* Header Premium */}
        <div className="text-center">
          <h2 className="text-3xl md:text-4xl font-black text-white tracking-tight mb-2 uppercase leading-tight">
            Explorador de <br className="sm:hidden" />
            <span className="text-purple-500">Escalas</span>
          </h2>
          <p className="text-slate-500 text-sm font-medium">Mapas melódicos e os 7 Modos Gregos completos.</p>
        </div>

        {/* Seletores */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-3">
            <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest ml-1">Tônica</label>
            <div className="grid grid-cols-6 gap-2">
              {NOTES.map(n => (
                <button
                  key={n}
                  onClick={() => setRoot(n)}
                  className={`py-2.5 rounded-xl font-bold text-sm transition-all border ${
                    root === n 
                    ? 'bg-purple-600 border-purple-400 text-white shadow-lg shadow-purple-900/20' 
                    : 'bg-slate-800 border-slate-700 text-slate-400 hover:border-slate-500'
                  }`}
                >
                  {n}
                </button>
              ))}
            </div>
          </div>

          <div className="space-y-3">
            <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest ml-1">Tipo de Escala / Modo</label>
            <select 
              value={type}
              onChange={(e) => setType(e.target.value as ScaleType)}
              className="w-full bg-slate-800 border border-slate-700 text-white rounded-2xl p-4 focus:ring-4 focus:ring-purple-500/20 outline-none transition-all font-bold appearance-none cursor-pointer"
            >
              <optgroup label="Modos Gregos" className="bg-slate-900">
                <option value={ScaleType.Ionian}>{ScaleType.Ionian}</option>
                <option value={ScaleType.Dorian}>{ScaleType.Dorian}</option>
                <option value={ScaleType.Phrygian}>{ScaleType.Phrygian}</option>
                <option value={ScaleType.Lydian}>{ScaleType.Lydian}</option>
                <option value={ScaleType.Mixolydian}>{ScaleType.Mixolydian}</option>
                <option value={ScaleType.Aeolian}>{ScaleType.Aeolian}</option>
                <option value={ScaleType.Locrian}>{ScaleType.Locrian}</option>
              </optgroup>
              <optgroup label="Básicas & Outras" className="bg-slate-900">
                <option value={ScaleType.Major}>Escala Maior</option>
                <option value={ScaleType.NaturalMinor}>Menor Natural</option>
                <option value={ScaleType.HarmonicMinor}>Menor Harmônica</option>
                <option value={ScaleType.MelodicMinor}>Menor Melódica</option>
                <option value={ScaleType.PentatonicMajor}>Pentatônica Maior</option>
                <option value={ScaleType.PentatonicMinor}>Pentatônica Menor</option>
                <option value={ScaleType.Blues}>Blues</option>
              </optgroup>
            </select>
          </div>
        </div>

        {/* Display das Notas */}
        <div className="relative bg-slate-950/50 p-8 rounded-[2rem] border border-white/5 overflow-hidden text-center shadow-inner">
          <div className="flex justify-center flex-wrap gap-2 md:gap-4">
            {scaleNotes.map((n, i) => (
              <div key={i} className="flex flex-col items-center gap-2 group">
                <div className={`w-12 h-12 md:w-16 md:h-16 flex items-center justify-center rounded-2xl text-lg md:text-xl font-black shadow-xl transition-all duration-300 border ${
                  i === 0 
                  ? 'bg-purple-600 border-purple-400 text-white scale-110 ring-4 ring-purple-500/20' 
                  : 'bg-slate-800 border-white/5 text-slate-300 group-hover:border-purple-500 group-hover:text-white'
                }`}>
                  {n}
                </div>
                <span className="text-[9px] font-bold text-slate-600 uppercase tracking-tighter">Grau {i + 1}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Teclado */}
        <div className="w-full">
          <Piano activeNotes={scaleNotes} />
        </div>
      </div>
    </div>
  );
};

export default ScalesExplorer;
