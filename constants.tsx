
import { Note, ChordQuality, ScaleType } from './types';

export const NOTES: Note[] = ['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B'];

export const CHORD_FORMULAS: Record<ChordQuality, number[]> = {
  [ChordQuality.Major]: [0, 4, 7],
  [ChordQuality.Minor]: [0, 3, 7],
  [ChordQuality.Diminished]: [0, 3, 6],
  [ChordQuality.Augmented]: [0, 4, 8],
  [ChordQuality.Major7]: [0, 4, 7, 11],
  [ChordQuality.Dominant7]: [0, 4, 7, 10],
  [ChordQuality.Minor7]: [0, 3, 7, 10],
  [ChordQuality.Minor7b5]: [0, 3, 6, 10],
  [ChordQuality.Diminished7]: [0, 3, 6, 9],
  [ChordQuality.Major9]: [0, 4, 7, 11, 14],
  [ChordQuality.Minor9]: [0, 3, 7, 10, 14],
  [ChordQuality.Dominant9]: [0, 4, 7, 10, 14],
  [ChordQuality.Six]: [0, 4, 7, 9],
  [ChordQuality.SixNine]: [0, 4, 7, 9, 14],
  [ChordQuality.Sus2]: [0, 2, 7],
  [ChordQuality.Sus4]: [0, 5, 7],
  [ChordQuality.Add9]: [0, 4, 7, 14],
  [ChordQuality.SevenAlt]: [0, 4, 8, 10, 13]
};

export const SCALE_INTERVALS: Record<string, number[]> = {
  [ScaleType.Major]: [0, 2, 4, 5, 7, 9, 11],
  [ScaleType.NaturalMinor]: [0, 2, 3, 5, 7, 8, 10],
  [ScaleType.HarmonicMinor]: [0, 2, 3, 5, 7, 8, 11],
  [ScaleType.MelodicMinor]: [0, 2, 3, 5, 7, 9, 11],
  [ScaleType.PentatonicMajor]: [0, 2, 4, 7, 9],
  [ScaleType.PentatonicMinor]: [0, 3, 5, 7, 10],
  [ScaleType.Blues]: [0, 3, 5, 6, 7, 10],
  [ScaleType.Ionian]: [0, 2, 4, 5, 7, 9, 11],
  [ScaleType.Dorian]: [0, 2, 3, 5, 7, 9, 10],
  [ScaleType.Phrygian]: [0, 1, 3, 5, 7, 8, 10],
  [ScaleType.Lydian]: [0, 2, 4, 6, 7, 9, 11],
  [ScaleType.Mixolydian]: [0, 2, 4, 5, 7, 9, 10],
  [ScaleType.Aeolian]: [0, 2, 3, 5, 7, 8, 10],
  [ScaleType.Locrian]: [0, 1, 3, 5, 6, 8, 10]
};

export const HARMONIC_FIELD_TRIADS = {
  Major: ['', 'm', 'm', '', '', 'm', 'dim'],
  NaturalMinor: ['m', 'dim', '', 'm', 'm', '', '']
};

export const HARMONIC_FIELD_TETRADS = {
  Major: ['7M', 'm7', 'm7', '7M', '7', 'm7', 'm7(b5)'],
  NaturalMinor: ['m7', 'm7(b5)', '7M', 'm7', 'm7', '7M', '7']
};
