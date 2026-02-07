
export type Note = 'C' | 'C#' | 'D' | 'D#' | 'E' | 'F' | 'F#' | 'G' | 'G#' | 'A' | 'A#' | 'B';

export enum ChordQuality {
  Major = 'Maior',
  Minor = 'Menor',
  Diminished = 'Diminuto',
  Augmented = 'Aumentado',
  Major7 = '7M',
  Dominant7 = '7',
  Minor7 = 'm7',
  Minor7b5 = 'm7(b5)',
  Diminished7 = 'dim7',
  Major9 = '9',
  Minor9 = 'm9',
  Dominant9 = '7(9)',
  Six = '6',
  SixNine = '6/9',
  Sus2 = 'sus2',
  Sus4 = 'sus4',
  Add9 = 'add9',
  SevenAlt = '7alt'
}

export enum ScaleType {
  Major = 'Maior',
  NaturalMinor = 'Menor Natural',
  HarmonicMinor = 'Menor Harmônica',
  MelodicMinor = 'Menor Melódica',
  PentatonicMajor = 'Pentatônica Maior',
  PentatonicMinor = 'Pentatônica Menor',
  Blues = 'Blues',
  Dorian = 'Dórico',
  Phrygian = 'Frígio',
  Lydian = 'Lídio',
  Mixolydian = 'Mixolídio',
  Locrian = 'Lócrio'
}

export interface Exercise {
  title: string;
  description: string;
  sequence: string[];
  tips: string[];
}

export interface VideoLesson {
  id: string;
  title: string;
  duration: string;
  thumbnail: string;
  url: string;
}
