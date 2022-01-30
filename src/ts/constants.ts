import { Page, TopBarOption } from "./types";

export const pages = ["Home", "About", "Projects", "Contact"] as const;

const pageMapTemp: Record<Page, any> = {
  Home: { title: "Welcome", id: "home-page" },
  About: { title: "About Me", id: "about-page" },
  Projects: { title: "Projects", id: "projects-page" },
  Contact: { title: "Contact", id: "contact-page" },
};

export let pageNames: keyof typeof pages;

pages.forEach((page) => {
  const buttonId = pageMapTemp[page].id + "-button";
  const entry = pageMapTemp[page];
  entry.buttonId = buttonId;
  entry.ref = document.getElementById(pageMapTemp[page].id) as HTMLDivElement;
  entry.buttonRef = document.getElementById(buttonId) as HTMLButtonElement;

  if (!entry.buttonId || !entry.ref || !entry.buttonRef) {
    console.error("constants - ERROR - failed to build pageMap");
  }
});

export const pageMap = pageMapTemp as Record<Page, TopBarOption>;
