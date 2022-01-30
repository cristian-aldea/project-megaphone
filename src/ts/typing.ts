import { typingCursor, typingText } from "./dom";
import { Pauses } from "./types";
import { sleep } from "./utils";

enum TypingState {
  TYPING,
  DELETING,
}

const messages = [
  "I'm a software developer",
  "I design websites",
  "I create solutions",
  "Need help? Let me know",
  "Have a nice day :)",
];

const pauses: Pauses = {
  3: { 10: true },
};

let text = "";
let showCursor = true;

let charIndex = 0,
  phraseIndex = 0,
  state = TypingState.TYPING,
  repeat = true;

let editing = false;
let stopEditTimestamp: number | null = null;

const loop = true,
  initWait = 1500,
  blinkWait = 500,
  speed = 1,
  typeWait = 100 / speed,
  typePause = 1000 / speed,
  deleteWait = 50 / speed,
  doneTypingWait = 2500 / speed,
  doneDeletingWait = 1500 / speed;

const setShowCursor = (show: boolean) => {
  typingCursor.textContent = show ? "|" : "";
  showCursor = show;
};

const setText = (value: string) => {
  text = value;
  typingText.textContent = text;
};

const animateBlinker = async () => {
  while (repeat) {
    const elapsed = stopEditTimestamp ? performance.now() - stopEditTimestamp : null;
    if (elapsed && elapsed < blinkWait) {
      await sleep(blinkWait - elapsed);
      stopEditTimestamp = null;
    }
    const wait = nextBlinker();
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
  setShowCursor(true);
  if (!curr) {
    stopEditTimestamp = performance.now();
  } else {
    stopEditTimestamp = null;
  }
};

const nextBlinker = (): number => {
  const wait = blinkWait;
  if (editing) {
    setShowCursor(true);
  } else {
    setShowCursor(!showCursor);
  }

  return wait;
};

const nextType = (): number => {
  let wait = 0;

  if (state === TypingState.TYPING) {
    const tempChar = charIndex;
    const tempPhrase = phraseIndex;
    setText(text + messages[tempPhrase][tempChar]);

    if (charIndex === messages[phraseIndex].length - 1) {
      // finished typing the current phrase
      setEditing(false);
      state = TypingState.DELETING;
      wait = doneTypingWait;

      // Handle next phrase
      if (phraseIndex === messages.length - 1) {
        phraseIndex = 0;
        if (!loop) {
          repeat = false;
        }
      } else {
        phraseIndex++;
      }
    } else {
      // Keep typing
      charIndex++;
      if (pauses?.[phraseIndex]?.[charIndex]) {
        setEditing(false);
        wait = typePause;
      } else {
        setEditing(true);
        wait = typeWait;
      }
    }
  } else if (state === TypingState.DELETING) {
    // delete char
    setText(text.substring(0, text.length - 1));

    if (charIndex === 0) {
      // Phrase deletion completed
      setEditing(false);
      state = TypingState.TYPING;
      wait = doneDeletingWait;
    } else {
      // Keep deleting
      setEditing(true);
      charIndex--;
      wait = deleteWait;
    }
  }

  return wait;
};

animateTyping();
animateBlinker();
