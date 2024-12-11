export type PDFViewerType = {
  url: string;
};

export type SignInType = {
  email?: string;
  password?: string;
  remember?: string;
  dectectDevice?: string;
};

export type DocumentType = {
  id: number;
  collectionId?: number;
  name: string;
  image?: string;
  thumbnail?: string;
  description?: string;
  level?: string;
  videoUrl?: string;
  audioUrl?: string;
  postUrl?: string;
};

export type CollectionsType = {
  id: number;
  name: string;
  remember?: string;
  image?: string;
  description?: string;
  href?: string;
  document: DocumentType[];
};

export type WordType = {
  word: string;
  meaning: string;
  phonetic: string;
  audio: string;
  image: string;
  type: string;
  topic: string;
  exEnglish: string;
  exVietnamese: string;
};
