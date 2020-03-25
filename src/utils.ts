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

export function getChapterText(chapter: number) {
  if (chapter > 16 || chapter < 1) return "";
  return allTexts[chapter - 1];
}

export function getAllChapters() {
  return allTexts.join("\n");
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
