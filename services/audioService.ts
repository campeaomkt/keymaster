
import { Note } from '../types';
import { NOTES } from '../constants';

class AudioService {
  private context: AudioContext | null = null;

  private initContext() {
    if (!this.context) {
      this.context = new (window.AudioContext || (window as any).webkitAudioContext)();
    }
    if (this.context.state === 'suspended') {
      this.context.resume();
    }
  }

  private getFrequency(note: Note, octave: number = 4): number {
    const noteIndex = NOTES.indexOf(note);
    // A4 = 440Hz é o índice 9 na oitava 4
    const n = noteIndex - 9 + (octave - 4) * 12;
    return 440 * Math.pow(2, n / 12);
  }

  playNote(note: Note, octave: number = 4, duration: number = 2.0) {
    this.initContext();
    if (!this.context) return;

    const now = this.context.currentTime;
    const freq = this.getFrequency(note, octave);
    
    // Master gain for the note
    const masterGain = this.context.createGain();
    
    // Filtro para simular o abafamento natural das cordas do piano
    const filter = this.context.createBiquadFilter();
    filter.type = 'lowpass';
    filter.Q.value = 0.8;
    filter.frequency.setValueAtTime(3000, now);
    filter.frequency.exponentialRampToValueAtTime(150, now + duration);

    // Oscilador Principal (Corpo do som - rico em harmônicos)
    const osc1 = this.context.createOscillator();
    osc1.type = 'triangle';
    osc1.frequency.setValueAtTime(freq, now);

    // Oscilador de Harmônico (Brilho - uma oitava acima)
    const osc2 = this.context.createOscillator();
    osc2.type = 'sine';
    osc2.frequency.setValueAtTime(freq * 2.0, now);
    const gain2 = this.context.createGain();
    gain2.gain.setValueAtTime(0.15, now);

    // Simulação do Martelo (Ataque percussivo inicial)
    const oscHammer = this.context.createOscillator();
    oscHammer.type = 'sine';
    oscHammer.frequency.setValueAtTime(freq * 4.0, now);
    const gainHammer = this.context.createGain();
    gainHammer.gain.setValueAtTime(0.2, now);
    gainHammer.gain.exponentialRampToValueAtTime(0.001, now + 0.05);

    // Conexões
    osc1.connect(filter);
    
    osc2.connect(gain2);
    gain2.connect(filter);
    
    oscHammer.connect(gainHammer);
    gainHammer.connect(filter);
    
    filter.connect(masterGain);
    masterGain.connect(this.context.destination);

    // Envelope de Volume (Ataque percussivo e decaimento natural)
    masterGain.gain.setValueAtTime(0, now);
    masterGain.gain.linearRampToValueAtTime(0.4, now + 0.005); // Ataque do martelo
    masterGain.gain.exponentialRampToValueAtTime(0.001, now + duration); // Decaimento da corda

    // Início e Fim
    osc1.start(now);
    osc2.start(now);
    oscHammer.start(now);
    
    osc1.stop(now + duration);
    osc2.stop(now + duration);
    oscHammer.stop(now + duration);
  }

  playChord(notes: Note[], octave: number = 4) {
    this.initContext();
    notes.forEach((note, index) => {
      // Pequeno atraso (strumming) para simular o ataque real de um pianista (não perfeitamente simultâneo)
      setTimeout(() => {
        this.playNote(note, octave, 2.5);
      }, index * 20);
    });
  }
}

export const audioService = new AudioService();
