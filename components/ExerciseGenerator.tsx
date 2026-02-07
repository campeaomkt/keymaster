
import React, { useState } from 'react';
import { generateExercises } from '../services/geminiService';
import { Exercise } from '../types';

const ExerciseGenerator: React.FC = () => {
  const [topic, setTopic] = useState('Independência das mãos');
  const [loading, setLoading] = useState(false);
  const [exercises, setExercises] = useState<Exercise[]>([]);

  const handleGenerate = async () => {
    setLoading(true);
    try {
      const result = await generateExercises(topic);
      setExercises(result);
    } catch (err) {
      alert('Falha ao gerar exercícios. Verifique sua conexão.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-slate-800 p-6 rounded-2xl border border-slate-700 shadow-lg">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-amber-400">Desafio de Treino (IA)</h2>
        <div className="flex gap-2">
          <input 
            type="text"
            value={topic}
            onChange={(e) => setTopic(e.target.value)}
            placeholder="Ex: Arpejos de 7M"
            className="bg-slate-900 border border-slate-700 text-white rounded-lg px-4 py-2 text-sm focus:ring-2 focus:ring-amber-500"
          />
          <button 
            onClick={handleGenerate}
            disabled={loading}
            className="bg-amber-600 hover:bg-amber-500 disabled:opacity-50 text-white font-bold py-2 px-6 rounded-lg transition-colors flex items-center gap-2"
          >
            {loading ? 'Gerando...' : 'Gerar Treino'}
          </button>
        </div>
      </div>

      {exercises.length === 0 && !loading && (
        <div className="text-center py-12 border-2 border-dashed border-slate-700 rounded-xl">
          <p className="text-slate-500">Clique para gerar exercícios personalizados pela IA.</p>
        </div>
      )}

      {loading && (
        <div className="space-y-4">
          {[1, 2].map(i => (
            <div key={i} className="animate-pulse bg-slate-900 h-32 rounded-xl"></div>
          ))}
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {exercises.map((ex, i) => (
          <div key={i} className="bg-slate-900 p-6 rounded-xl border border-slate-700 flex flex-col">
            <h3 className="text-lg font-bold text-white mb-2">{ex.title}</h3>
            <p className="text-slate-400 text-sm mb-4 flex-grow">{ex.description}</p>
            
            <div className="mb-4">
              <p className="text-xs font-bold text-amber-500 uppercase tracking-wider mb-2">Sequência</p>
              <div className="bg-slate-800 p-3 rounded-lg flex flex-wrap gap-2">
                {ex.sequence.map((s, idx) => (
                  <span key={idx} className="bg-amber-900/30 text-amber-300 px-2 py-1 rounded text-sm font-mono">{s}</span>
                ))}
              </div>
            </div>

            <div>
              <p className="text-xs font-bold text-emerald-500 uppercase tracking-wider mb-2">Dicas</p>
              <ul className="text-sm text-slate-400 list-disc list-inside">
                {ex.tips.map((t, idx) => <li key={idx}>{t}</li>)}
              </ul>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ExerciseGenerator;
