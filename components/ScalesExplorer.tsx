
import React, { useState, useMemo } from 'react';
import { Note, ScaleType } from '../types';
import { NOTES } from '../constants';
import { getScaleNotes } from '../services/musicLogic';
import Piano from './Piano';

const ScalesExplorer: React.FC = () => {
  const [root, setRoot] = useState<Note>('C');
  const [type, setType] = useState<ScaleType>(ScaleType.Major);

  const scaleNotes = useMemo(() => getScaleNotes(root, type), [root, type]);

  return (
    <div className="bg-slate-800 p-6 rounded-2xl border border-slate-700 shadow-lg">
      <h2 className="text-2xl font-bold mb-6 text-purple-400">Escalas</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
        <div>
          <label className="block text-sm font-medium text-slate-400 mb-2">Tônica</label>
          <select 
            value={root}
            onChange={(e) => setRoot(e.target.value as Note)}
            className="w-full bg-slate-900 border border-slate-700 text-white rounded-lg p-3 focus:ring-2 focus:ring-purple-500"
          >
            {NOTES.map(n => <option key={n} value={n}>{n}</option>)}
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-slate-400 mb-2">Tipo de Escala</label>
          <select 
            value={type}
            onChange={(e) => setType(e.target.value as ScaleType)}
            className="w-full bg-slate-900 border border-slate-700 text-white rounded-lg p-3 focus:ring-2 focus:ring-purple-500"
          >
            {Object.values(ScaleType).map(s => <option key={s} value={s}>{s}</option>)}
          </select>
        </div>
      </div>

      <div className="mb-8">
        <div className="flex overflow-x-auto no-scrollbar pb-2 gap-2 justify-start md:justify-center">
          {scaleNotes.map((n, i) => (
            <div key={i} className="flex-shrink-0 w-10 h-10 flex items-center justify-center bg-purple-900 text-white font-bold rounded-full shadow-lg border border-purple-500">
              {n}
            </div>
          ))}
        </div>
      </div>

      <Piano activeNotes={scaleNotes} />

      <style>{`
        .no-scrollbar::-webkit-scrollbar {
          display: none;
        }
        .no-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
    </div>
  );
};

export default ScalesExplorer;
