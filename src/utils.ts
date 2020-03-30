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
import { Sentence, SentenceScore, WordObj } from "./constants";
const allTexts = [
  text1.split("."),
  text2.split("."),
  text3.split("."),
  text4.split("."),
  text5.split("."),
  text6.split("."),
  text7.split("."),
  text8.split("."),
  text9.split("."),
  text10.split("."),
  text11.split("."),
  text12.split("."),
  text13.split("."),
  text14.split("."),
  text15.split("."),
  text16.split("."),
];

export function getChapterText(chapter: number): Array<string> {
  if (chapter > 16 || chapter < 1) return [];
  return allTexts[chapter - 1];
}

export function getChapterSentences(chapter: number): Array<Sentence> {
  if (chapter > 16 || chapter < 1) return [];
  return allTexts[chapter - 1].map((text, index) => ({
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

export function shadeColor(inputColor: string, lightenPercent: number) {
  let R = parseInt(inputColor.substring(1, 3), 16);
  let G = parseInt(inputColor.substring(3, 5), 16);
  let B = parseInt(inputColor.substring(5, 7), 16);

  R = Math.round((R * (100 + lightenPercent)) / 100);
  G = Math.round((G * (100 + lightenPercent)) / 100);
  B = Math.round((B * (100 + lightenPercent)) / 100);

  R = R < 255 ? R : 255;
  G = G < 255 ? G : 255;
  B = B < 255 ? B : 255;

  let RR = R.toString(16).length === 1 ? "0" + R.toString(16) : R.toString(16);
  let GG = G.toString(16).length === 1 ? "0" + G.toString(16) : G.toString(16);
  let BB = B.toString(16).length === 1 ? "0" + B.toString(16) : B.toString(16);

  return "#" + RR + GG + BB;
}
