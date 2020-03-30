import { text as text1 } from "./assets/texts/1";
import { text as text2 } from "./assets/texts/2";
import { text as text3 } from "./assets/texts/3";
import { text as text4 } from "./assets/texts/4";
import { text as text5 } from "./assets/texts/5";
import { text as text6 } from "./assets/texts/6";
import { text as text7 } from "./assets/texts/7";
import { text as text8 } from "./assets/texts/8";
import { text as text9 } from "./assets/texts/9";
import { text as text10 } from "./assets/texts/10";
import { text as text11 } from "./assets/texts/11";
import { text as text12 } from "./assets/texts/12";
import { text as text13 } from "./assets/texts/13";
import { text as text14 } from "./assets/texts/14";
import { text as text15 } from "./assets/texts/15";
import { text as text16 } from "./assets/texts/16";
import { Sentence, SentenceScore } from "./constants";
const allTexts = [
  text1,
  text2,
  text3,
  text4,
  text5,
  text6,
  text7,
  text8,
  text9,
  text10,
  text11,
  text12,
  text13,
  text14,
  text15,
  text16,
];

export function getChapterText(chapter: number): Array<string> {
  if (chapter > 16 || chapter < 1) return [];
  return allTexts[chapter - 1].split(".");
}

export function getChapterSentences(chapter: number): Array<Sentence> {
  if (chapter > 16 || chapter < 1) return [];
  return getChapterText(chapter).map((text, index) => ({
    score: 0,
    text: text,
    index,
  }));
}

export function calculateScore(scoreObj: SentenceScore): number {
  if (scoreObj.length < 30) {
    return -1;
  }
  return Math.max(
    scoreObj.count * 10 + scoreObj.uniqueCount * 50 - scoreObj.length / 10,
    0
  );
}

export function findAllChapMatches(wordObjs: any): Array<number> {
  let chapMatches = new Array(16).fill(0);
  allTexts.forEach((chap, index) => {
    chap.split(" ").forEach((word) => {
      if (wordObjs[word]) chapMatches[index]++;
    });
  });
  return chapMatches;
}

export function isValidReplacement(wordObjs: any, wordComp: string): string {
  if (wordObjs[wordComp]) {
    if (!wordObjs[wordComp].enabled) return "";
    return wordComp;
  }
  for (let key of Object.keys(wordObjs)) {
    let endings = ["s", "ed", "d", "es"];
    for (let ending of endings) {
      if (key === wordComp + ending || key + ending === wordComp) {
        if (!wordObjs[key].enabled) return "";
        return key;
      }
    }
  }
  return "";
}

export function indexOfMax(arr: Array<number>): number {
  let max = arr[0];
  let maxIndex = 0;

  for (let i = 1; i < arr.length; i++) {
    if (arr[i] > max) {
      maxIndex = i;
      max = arr[i];
    }
  }

  return maxIndex;
}
