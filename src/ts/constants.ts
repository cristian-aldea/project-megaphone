import { Page, TopBarOption } from "./types";

export const pages = ["Home", "About", "Projects", "Contact"] as const;

export const pageMap: Record<Page, TopBarOption> = {
  Home: { title: "Welcome", buttonText: "Home", id: "home-page", ref: null },
  About: { title: "About Me", buttonText: "About", id: "about-page", ref: null },
  Projects: { title: "Projects", buttonText: "Projects", id: "projects-page", ref: null },
  Contact: { title: "Contact", buttonText: "Contact", id: "contact-page", ref: null },
};

export let pageNames: keyof typeof pages;

pages.forEach((page) => {
  pageMap[page].buttonId = pageMap[page].id + "-button";
  pageMap[page].ref = document.getElementById(pageMap[page].id) as HTMLDivElement;
  pageMap[page].buttonRef = document.getElementById(pageMap[page].buttonId) as HTMLButtonElement;
});
