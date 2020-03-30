export const MIN_WORD_LENGTH = 3;
export const NUM_CHAPTERS = 16;
export const NUM_SENTENCES = 10;

export const colors = [
    "#45777c",
    "#92374D",
    "#542E71",
    "#FF5666",
    "#2B59C3",
    "#C14953",
    "#2E5339",
    "#388697",
    "#CC2936",
    "#314CB6",
    "#B28B84",
    "#392759",
    "#7FB069",
    "#08415C",
    "#91785D",
    "#F08700",
    "#9297C4",
    "#6B7FD7",
    "#EB9486",
    "#00A6A6",
];

export interface WordObj {
    color: string;
    word: string;
    enabled: boolean;
}
export interface Sentence {
    index: number;
    score: number;
    text: string;
}

export interface SentenceScore {
    count: number;
    uniqueCount: number;
    uniqueLength: number;
    length: number;
}
