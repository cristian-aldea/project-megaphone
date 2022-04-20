import { Page } from "./types";

export const pages = ["Home", "About", "Projects", "Contact"] as const;
// export let pageNames: keyof typeof pages;

export interface PageInfo {
  id: string;
  buttonId: string;
  ref: HTMLDivElement;
  buttonRef: HTMLButtonElement;
}

const pageIdMap: Record<Page, string> = {
  Home: "home-page",
  About: "about-page",
  Projects: "projects-page",
  Contact: "contact-page",
};

const tempPageMap = new Map<Page, PageInfo>();

pages.forEach((page) => {
  const id = pageIdMap[page];
  const buttonId = id + "-button";
  const buttonRef = document.getElementById(buttonId) as HTMLButtonElement;
  const ref = document.getElementById(pageIdMap[page]) as HTMLDivElement;

  if (!buttonId || !ref || !buttonRef) {
    console.error("constants - ERROR - failed to build pageMap");
  }
  tempPageMap.set(page, { id: pageIdMap[page], buttonId, buttonRef, ref });
});

export const pageMap = Object.fromEntries(tempPageMap) as Record<Page, PageInfo>;
