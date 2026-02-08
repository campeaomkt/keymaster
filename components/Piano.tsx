
import React from 'react';
import { Note } from '../types';
import { NOTES } from '../constants';
import { audioService } from '../services/audioService';

interface PianoProps {
  activeNotes: Note[];
  octaves?: number;
}

const Piano: React.FC<PianoProps> = ({ activeNotes, octaves = 2 }) => {
  const handleKeyClick = (note: Note, octave: number) => {
    audioService.playNote(note, octave + 3); // Oitava base 3/4
  };

  const renderKeys = () => {
    const keys = [];
    for (let o = 0; o < octaves; o++) {
      NOTES.forEach((note) => {
        const isBlack = note.includes('#');
        const isActive = activeNotes.includes(note);
        const keyId = `${note}-${o}`;
        
        if (isBlack) {
          keys.push(
            <div 
              key={keyId} 
              onClick={() => handleKeyClick(note, o)}
              className={`piano-key-black group flex flex-col items-center justify-end pb-2 active:brightness-125 transition-all ${isActive ? 'active' : ''}`}
              title={note}
              style={{ 
                marginLeft: '-11px', 
                marginRight: '-11px',
                width: '22px',
                height: '80px',
                zIndex: 20,
                position: 'relative',
                boxShadow: 'inset 0 -4px 0 rgba(0,0,0,0.3)',
                cursor: 'pointer'
              }}
            >
              <span className="text-[8px] opacity-0 group-hover:opacity-100 text-white font-bold">{note}</span>
            </div>
          );
        } else {
          const noteNames: Record<string, string> = {
            'C': 'Dó', 'D': 'Ré', 'E': 'Mi', 'F': 'Fá', 'G': 'Sol', 'A': 'Lá', 'B': 'Si'
          };
          keys.push(
            <div 
              key={keyId} 
              onClick={() => handleKeyClick(note, o)}
              className={`piano-key-white group flex flex-col items-center justify-end pb-4 border border-slate-300 rounded-b-lg shadow-sm active:bg-slate-100 transition-all ${isActive ? 'active' : ''}`}
              title={note}
              style={{ 
                width: '40px',
                height: '140px',
                zIndex: 10,
                position: 'relative',
                cursor: 'pointer'
              }}
            >
              <span className={`text-[10px] font-black uppercase tracking-tighter transition-colors ${isActive ? 'text-white' : 'text-slate-500'}`}>
                {noteNames[note] || note}
              </span>
            </div>
          );
        }
      });
    }
    return keys;
  };

  return (
    <div className="flex flex-col items-center w-full py-4 gap-2">
      {/* Informação Superior */}
      <div className="flex items-center gap-2 text-slate-500 mb-1">
        <span className="text-[9px] font-black uppercase tracking-[0.2em] opacity-60">Arraste para o lado ↔</span>
      </div>

      <div className="w-full bg-slate-900 p-4 md:p-8 rounded-[2rem] shadow-[0_20px_50px_rgba(0,0,0,0.5)] border-t border-slate-800 border-x border-slate-800 border-b-8 border-slate-950 overflow-x-auto no-scrollbar">
        <div className="flex items-start bg-slate-950 p-2 rounded-xl shadow-inner border border-slate-800 min-w-max mx-auto">
          {renderKeys()}
        </div>
      </div>

      {/* Informação Inferior */}
      <div className="flex items-center gap-2 text-slate-500 mt-1">
        <span className="text-[9px] font-black uppercase tracking-[0.2em] opacity-60">Clique nas teclas para ouvir</span>
      </div>

      <style>{`
        .no-scrollbar::-webkit-scrollbar {
          display: none;
        }
        .no-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
        .piano-key-white.active {
          background: linear-gradient(to bottom, #38bdf8, #0ea5e9) !important;
          box-shadow: inset 0 -5px 0 rgba(0,0,0,0.2), 0 5px 15px rgba(14,165,233,0.4);
          border-color: #0284c7;
        }
        .piano-key-black.active {
          background: linear-gradient(to bottom, #0ea5e9, #0284c7) !important;
          box-shadow: inset 0 -3px 0 rgba(0,0,0,0.4), 0 5px 10px rgba(14,165,233,0.3);
        }
      `}</style>
    </div>
  );
};

export default Piano;
