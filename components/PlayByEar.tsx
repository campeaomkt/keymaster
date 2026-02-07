
import React, { useState, useEffect } from 'react';
import { generateExercises } from '../services/geminiService';
import { Exercise, VideoLesson } from '../types';

const PlayByEar: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const [exercises, setExercises] = useState<Exercise[]>([]);
  const [customVideos, setCustomVideos] = useState<VideoLesson[]>([]);
  const [showAddForm, setShowAddForm] = useState(false);
  const [activeVideo, setActiveVideo] = useState<VideoLesson | null>(null);

  // Form states
  const [newTitle, setNewTitle] = useState('');
  const [newUrl, setNewUrl] = useState('');
  const [newDuration, setNewDuration] = useState('');

  // Simulação de Banco de Dados com LocalStorage
  useEffect(() => {
    const saved = localStorage.getItem('keymaster_lessons');
    if (saved) {
      setCustomVideos(JSON.parse(saved));
    } else {
      // Aulas padrão caso o banco esteja vazio
      const defaults: VideoLesson[] = [
        {
          id: '1',
          title: 'Fundamentos do Ouvido Relativo',
          duration: '10:00',
          thumbnail: 'https://images.unsplash.com/photo-1511379938547-c1f69419868d?w=400',
          url: 'https://www.youtube.com/embed/dQw4w9WgXcQ' // Exemplo de embed
        }
      ];
      setCustomVideos(defaults);
      localStorage.setItem('keymaster_lessons', JSON.stringify(defaults));
    }
  }, []);

  const saveLesson = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle || !newUrl) return;

    // Converte links normais do YT para embed se necessário
    let finalUrl = newUrl;
    if (newUrl.includes('youtube.com/watch?v=')) {
      finalUrl = newUrl.replace('watch?v=', 'embed/');
    }

    const newVideo: VideoLesson = {
      id: Date.now().toString(),
      title: newTitle,
      duration: newDuration || '??:??',
      thumbnail: 'https://images.unsplash.com/photo-1520522186829-c6936082ed13?w=400',
      url: finalUrl
    };

    const updated = [...customVideos, newVideo];
    setCustomVideos(updated);
    localStorage.setItem('keymaster_lessons', JSON.stringify(updated));
    
    // Reset form
    setNewTitle('');
    setNewUrl('');
    setNewDuration('');
    setShowAddForm(false);
  };

  const deleteLesson = (id: string) => {
    const updated = customVideos.filter(v => v.id !== id);
    setCustomVideos(updated);
    localStorage.setItem('keymaster_lessons', JSON.stringify(updated));
  };

  const handleGenerate = async (type: string) => {
    setLoading(true);
    try {
      const topic = `Como tocar de ouvido: ${type}. Explique como identificar no teclado.`;
      const result = await generateExercises(topic);
      setExercises(result);
    } catch (err) {
      alert('Erro ao carregar guia auditivo.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-12">
      {/* Modal do Player */}
      {activeVideo && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/90 backdrop-blur-sm">
          <div className="relative w-full max-w-4xl aspect-video bg-black rounded-2xl overflow-hidden shadow-2xl">
            <button 
              onClick={() => setActiveVideo(null)}
              className="absolute top-4 right-4 z-10 bg-white/10 hover:bg-white/20 text-white p-2 rounded-full transition-colors"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l18 18" /></svg>
            </button>
            <iframe 
              src={activeVideo.url} 
              className="w-full h-full" 
              allowFullScreen 
              title={activeVideo.title}
            />
          </div>
        </div>
      )}

      {/* Header e Controles */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="bg-slate-800 p-8 rounded-3xl border border-indigo-500/20 shadow-xl col-span-1 lg:col-span-2">
          <div className="flex justify-between items-start mb-6">
            <h2 className="text-3xl font-black text-white flex items-center gap-3">
              <span className="text-4xl">👂</span> Sua Academia de Ouvido
            </h2>
            <button 
              onClick={() => setShowAddForm(!showAddForm)}
              className="bg-indigo-600 hover:bg-indigo-500 text-white px-4 py-2 rounded-xl text-sm font-bold transition-all flex items-center gap-2 shadow-lg shadow-indigo-900/40"
            >
              {showAddForm ? 'Cancelar' : '＋ Cadastrar Aula'}
            </button>
          </div>

          {showAddForm ? (
            <form onSubmit={saveLesson} className="bg-slate-900/50 p-6 rounded-2xl border border-slate-700 animate-fadeIn">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-xs font-bold text-slate-500 uppercase">Título da Aula</label>
                  <input 
                    required
                    value={newTitle}
                    onChange={e => setNewTitle(e.target.value)}
                    placeholder="Ex: Minha aula de Campo Harmônico"
                    className="w-full bg-slate-800 border border-slate-700 rounded-xl px-4 py-3 text-white focus:ring-2 focus:ring-indigo-500 outline-none"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-bold text-slate-500 uppercase">Link do Vídeo (Embed/YT)</label>
                  <input 
                    required
                    value={newUrl}
                    onChange={e => setNewUrl(e.target.value)}
                    placeholder="https://youtube.com/..."
                    className="w-full bg-slate-800 border border-slate-700 rounded-xl px-4 py-3 text-white focus:ring-2 focus:ring-indigo-500 outline-none"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-bold text-slate-500 uppercase">Duração (opcional)</label>
                  <input 
                    value={newDuration}
                    onChange={e => setNewDuration(e.target.value)}
                    placeholder="15:00"
                    className="w-full bg-slate-800 border border-slate-700 rounded-xl px-4 py-3 text-white focus:ring-2 focus:ring-indigo-500 outline-none"
                  />
                </div>
                <div className="flex items-end">
                  <button type="submit" className="w-full bg-emerald-600 hover:bg-emerald-500 text-white font-bold py-3 rounded-xl transition-all shadow-lg shadow-emerald-900/20">
                    Salvar Aula no Banco
                  </button>
                </div>
              </div>
            </form>
          ) : (
            <div className="space-y-4 text-slate-300">
               <p className="text-slate-400">Aprenda a conectar o que você ouve com as teclas. Use as videoaulas abaixo ou gere novos desafios com nossa IA.</p>
               <div className="flex flex-wrap gap-2 pt-2">
                 <span className="bg-slate-900 px-3 py-1 rounded-full text-xs border border-slate-700">#TreinoAuditivo</span>
                 <span className="bg-slate-900 px-3 py-1 rounded-full text-xs border border-slate-700">#TirarDeOuvido</span>
                 <span className="bg-slate-900 px-3 py-1 rounded-full text-xs border border-slate-700">#Independencia</span>
               </div>
            </div>
          )}
        </div>

        <div className="bg-indigo-900/20 p-8 rounded-3xl border border-indigo-500/30 flex flex-col justify-center gap-4">
          <h3 className="font-bold text-center text-indigo-300 text-xs uppercase tracking-[0.2em] mb-2">Mentor de Ouvido (IA)</h3>
          <button 
            onClick={() => handleGenerate('Identificação da Tônica e Baixo')}
            className="w-full bg-indigo-600 hover:bg-indigo-500 text-white py-4 rounded-2xl font-bold shadow-lg shadow-indigo-900/40 transition-all active:scale-95"
          >
            Achar a Tônica
          </button>
          <button 
            onClick={() => handleGenerate('Progressões de Acordes Comuns')}
            className="w-full bg-slate-800 hover:bg-slate-700 text-white py-4 rounded-2xl font-bold transition-all"
          >
            Clichês Harmônicos
          </button>
        </div>
      </div>

      {/* Catálogo de Aulas (O "Banco de Dados" visualizado) */}
      <section>
        <div className="flex items-center gap-4 mb-8">
          <h2 className="text-2xl font-bold text-white">Seu Catálogo de Aulas</h2>
          <div className="h-px flex-1 bg-gradient-to-r from-slate-800 to-transparent"></div>
          <span className="text-slate-500 text-sm font-bold">{customVideos.length} aulas salvas</span>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {customVideos.map((video) => (
            <div key={video.id} className="group relative bg-slate-900 rounded-[2rem] overflow-hidden border border-slate-800 hover:border-indigo-500/50 transition-all duration-300 shadow-2xl">
              <div className="relative aspect-video overflow-hidden">
                <img 
                  src={video.thumbnail} 
                  alt={video.title} 
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 opacity-60 group-hover:opacity-100"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent"></div>
                
                {/* Botão Play flutuante */}
                <button 
                  onClick={() => setActiveVideo(video)}
                  className="absolute inset-0 flex items-center justify-center group-hover:scale-110 transition-transform"
                >
                  <div className="w-16 h-16 bg-white text-slate-950 rounded-full flex items-center justify-center shadow-2xl">
                    <svg className="w-8 h-8 translate-x-1" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M6.3 2.841A1.5 1.5 0 004 4.11V15.89a1.5 1.5 0 002.3 1.269l9.344-5.89a1.5 1.5 0 000-2.538L6.3 2.84z" />
                    </svg>
                  </div>
                </button>

                <span className="absolute bottom-4 right-4 bg-black/80 backdrop-blur-md text-white text-[10px] font-black px-3 py-1 rounded-full border border-white/10">
                  {video.duration}
                </span>
              </div>

              <div className="p-6">
                <h4 className="font-bold text-white text-lg mb-4 line-clamp-1">{video.title}</h4>
                <div className="flex gap-2">
                  <button 
                    onClick={() => setActiveVideo(video)}
                    className="flex-1 bg-indigo-600 hover:bg-indigo-500 text-white py-2.5 rounded-xl text-sm font-bold transition-colors"
                  >
                    Assistir Aula
                  </button>
                  <button 
                    onClick={() => deleteLesson(video.id)}
                    className="p-2.5 bg-slate-800 hover:bg-red-900/40 text-slate-500 hover:text-red-400 rounded-xl transition-all border border-slate-700"
                    title="Excluir Aula"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>
                  </button>
                </div>
              </div>
            </div>
          ))}
          
          {/* Card de Adicionar Rápido */}
          <button 
            onClick={() => setShowAddForm(true)}
            className="group aspect-video rounded-[2rem] border-2 border-dashed border-slate-800 hover:border-indigo-500/50 flex flex-col items-center justify-center gap-3 transition-all hover:bg-indigo-500/5"
          >
            <div className="w-12 h-12 rounded-full bg-slate-800 group-hover:bg-indigo-600 flex items-center justify-center transition-colors">
              <span className="text-2xl text-slate-500 group-hover:text-white">＋</span>
            </div>
            <span className="text-sm font-bold text-slate-500 group-hover:text-indigo-400 uppercase tracking-widest">Nova Aula</span>
          </button>
        </div>
      </section>

      {/* Resultados da IA */}
      {loading && (
        <div className="flex flex-col items-center py-12">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-500 mb-4"></div>
          <p className="text-indigo-400 font-medium">IA preparando seu guia auditivo...</p>
        </div>
      )}

      {exercises.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 animate-fadeIn">
          {exercises.map((ex, i) => (
            <div key={i} className="bg-slate-900 p-8 rounded-[2rem] border border-slate-800 hover:border-indigo-600 transition-all shadow-xl">
              <h3 className="text-xl font-bold text-indigo-300 mb-4">{ex.title}</h3>
              <p className="text-sm text-slate-400 mb-6 leading-relaxed">{ex.description}</p>
              <div className="bg-slate-800 p-4 rounded-2xl mb-6 flex flex-wrap gap-2 shadow-inner">
                {ex.sequence.map((s, idx) => (
                  <span key={idx} className="bg-indigo-950 text-indigo-200 px-3 py-1 rounded-lg text-sm font-mono font-bold">{s}</span>
                ))}
              </div>
              <div className="space-y-3">
                {ex.tips.map((t, idx) => (
                  <div key={idx} className="flex gap-3 items-start">
                    <span className="text-emerald-500 font-bold mt-0.5 text-lg">✦</span>
                    <p className="text-xs text-slate-500 leading-relaxed">{t}</p>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default PlayByEar;
