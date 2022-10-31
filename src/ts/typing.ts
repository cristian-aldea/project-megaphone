import { typingText } from "./dom";
import { sleep } from "./utils";

const CHAR_SHORT_PAUSE = "@";
const CHAR_LONG_PAUSE = "#";
const CHAR_NEW_LINE = "$";
const BLINKER = '<div style="display: inline-block;position: relative;top: -2px;">|</div>';

const message = `I'm a software engineer.${
  CHAR_LONG_PAUSE + CHAR_NEW_LINE + CHAR_NEW_LINE
}I love to build software...${CHAR_SHORT_PAUSE} to solve problems!${
  CHAR_LONG_PAUSE + CHAR_NEW_LINE + CHAR_NEW_LINE
}Scroll down to learn more about me!${
  CHAR_LONG_PAUSE + CHAR_NEW_LINE + CHAR_NEW_LINE
}Have a nice day :)`;
let text = "";
let showCursor = true;

let charIndex = 0,
  repeat = true;

let editing = false;
let stopEditTimestamp: number | null = null;

const initWait = 1500,
  blinkWait = 530,
  speed = 1,
  typeWait = 80 / speed,
  shortWait = 500 / speed,
  longWait = 2000 / speed;

const setShowCursor = (show: boolean) => {
  showCursor = show;
  updateText();
};

const setText = (value: string) => {
  text = value;
  updateText();
};

const updateText = () => {
  if (showCursor) {
    typingText.innerHTML = text + BLINKER;
  } else {
    typingText.innerHTML = text;
  }
};

const animateBlinker = async () => {
  while (repeat) {
    let wait = blinkWait;
    const elapsed = stopEditTimestamp ? performance.now() - stopEditTimestamp : null;
    if (elapsed && elapsed < blinkWait) {
      wait = blinkWait - elapsed;
      stopEditTimestamp = null;
    } else {
      nextBlinker();
    }
    await sleep(wait);
  }
  setShowCursor(false);
};

const animateTyping = async () => {
  await sleep(initWait);
  while (repeat) {
    const wait = nextType();
    await sleep(wait);
  }
};

const setEditing = (curr: boolean) => {
  editing = curr;
  if (!curr) {
    stopEditTimestamp = performance.now();
  } else {
    setShowCursor(true);
    stopEditTimestamp = null;
  }
};

const nextBlinker = () => {
  if (editing) {
    setShowCursor(true);
  } else {
    setShowCursor(!showCursor);
  }
};

const nextType = (): number => {
  let wait = 0;

  const currChar = message[charIndex];

  if (currChar === CHAR_LONG_PAUSE) {
    setEditing(false);
    wait = longWait;
  } else if (currChar === CHAR_SHORT_PAUSE) {
    setEditing(false);
    wait = shortWait;
  } else if (currChar === CHAR_NEW_LINE) {
    setText(text + "<br>");
    setEditing(true);
    wait = shortWait;
  } else {
    setEditing(true);
    setText(text + currChar);
    wait = typeWait;
  }

  if (charIndex === message.length - 1) {
    repeat = false;
  } else {
    charIndex++;
  }
  return wait;
};

void animateTyping();
void animateBlinker();
