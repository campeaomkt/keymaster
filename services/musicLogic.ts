
import { NOTES, CHORD_FORMULAS, SCALE_INTERVALS, HARMONIC_FIELD_TRIADS, HARMONIC_FIELD_TETRADS } from '../constants';
import { Note, ChordQuality, ScaleType } from '../types';

export const getNotesFromFormula = (root: Note, intervals: number[]): Note[] => {
  const rootIndex = NOTES.indexOf(root);
  return intervals.map(interval => {
    const index = (rootIndex + interval) % 12;
    return NOTES[index];
  });
};

export const getChordNotes = (root: Note, quality: ChordQuality): Note[] => {
  return getNotesFromFormula(root, CHORD_FORMULAS[quality]);
};

export const getScaleNotes = (root: Note, type: ScaleType): Note[] => {
  const intervals = SCALE_INTERVALS[type] || SCALE_INTERVALS[ScaleType.Major];
  return getNotesFromFormula(root, intervals);
};

export const getHarmonicField = (root: Note, isMajor: boolean = true, useTetrads: boolean = false): string[] => {
  const rootIndex = NOTES.indexOf(root);
  const scaleIntervals = isMajor ? SCALE_INTERVALS[ScaleType.Major] : SCALE_INTERVALS[ScaleType.NaturalMinor];
  const qualities = useTetrads 
    ? (isMajor ? HARMONIC_FIELD_TETRADS.Major : HARMONIC_FIELD_TETRADS.NaturalMinor)
    : (isMajor ? HARMONIC_FIELD_TRIADS.Major : HARMONIC_FIELD_TRIADS.NaturalMinor);

  return scaleIntervals.map((interval, i) => {
    const note = NOTES[(rootIndex + interval) % 12];
    return `${note}${qualities[i]}`;
  });
};

export const getChordFriendlyName = (root: Note, quality: ChordQuality): string => {
  const noteMap: Record<string, string> = {
    'C': 'Dó', 'C#': 'Dó sustenido', 'D': 'Ré', 'D#': 'Ré sustenido',
    'E': 'Mi', 'F': 'Fá', 'F#': 'Fá sustenido', 'G': 'Sol',
    'G#': 'Sol sustenido', 'A': 'Lá', 'A#': 'Lá sustenido', 'B': 'Si'
  };

  const qualityMap: Record<ChordQuality, string> = {
    [ChordQuality.Major]: 'Maior',
    [ChordQuality.Minor]: 'Menor',
    [ChordQuality.Diminished]: 'Diminuto',
    [ChordQuality.Augmented]: 'Aumentado',
    [ChordQuality.Major7]: 'com Sétima Maior',
    [ChordQuality.Dominant7]: 'Dominante com Sétima',
    [ChordQuality.Minor7]: 'Menor com Sétima',
    [ChordQuality.Minor7b5]: 'Meio Diminuto',
    [ChordQuality.Diminished7]: 'Diminuto com Sétima',
    [ChordQuality.Major9]: 'com Nona',
    [ChordQuality.Minor9]: 'Menor com Nona',
    [ChordQuality.Dominant9]: 'com Sétima e Nona',
    [ChordQuality.Six]: 'com Sexta',
    [ChordQuality.SixNine]: 'com Sexta e Nona',
    [ChordQuality.Sus2]: 'com Segunda Suspensa',
    [ChordQuality.Sus4]: 'com Quarta Suspensa',
    [ChordQuality.Add9]: 'com Nona Adicionada',
    [ChordQuality.SevenAlt]: 'Alterado'
  };

  return `${noteMap[root]} ${qualityMap[quality]}`;
};
