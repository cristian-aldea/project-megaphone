import { pageMap, pages } from "./constants";
import { hamburgerButton, topBar, topBarButtons, topBarSlider, topBarTitle } from "./dom";
import { Page } from "./types";
import { debounce } from "./utils";

let menuOpen = false;
let currPage: Page;

const setCurrPage = (page: Page) => {
  currPage = page;

  pages.forEach((page) => {
    if (currPage === page) {
      pageMap[page].buttonRef.classList.add("active");
    } else {
      pageMap[page].buttonRef.classList.remove("active");
    }
  });
};

const setMenuOpen = (value: boolean) => {
  menuOpen = value;

  if (value) {
    topBarButtons.classList.remove("closed");
    hamburgerButton.classList.add("active");
  } else {
    topBarButtons.classList.add("closed");
    hamburgerButton.classList.remove("active");
  }
};

const setAnimate = (value: boolean) => {
  if (value) {
    topBarButtons.classList.add("animate");
    topBarSlider.classList.add("animate");
  } else {
    topBarButtons.classList.remove("animate");
    topBarSlider.classList.remove("animate");
  }
};

const setSliderPos = (button: HTMLButtonElement) => {
  const rect = button.getBoundingClientRect();
  topBarSlider.style.width = rect.width + "px";
  topBarSlider.style.top = button.offsetTop + "px";
  topBarSlider.style.left = button.offsetLeft + "px";
};

const onClick = (event: MouseEvent) => {
  if (menuOpen && !topBar.contains(event.target as HTMLElement)) {
    setMenuOpen(false);
  }
};

const turnOnAnims = debounce(() => {
  setAnimate(true);
}, 400);

const onResize = () => {
  setMenuOpen(false);
  setAnimate(false);
  turnOnAnims();
  setSliderPos(pageMap[currPage].buttonRef);
};

const onScroll = () => {
  findActiveOption();
};

const findActiveOption = () => {
  const wHeight = window.innerHeight;
  const yMap: number[] = new Array(pages.length).fill(0);

  pages.forEach((page, i) => {
    yMap[i] = pageMap[page].ref.getBoundingClientRect().y;
  });

  const cutoff = 0.5 * wHeight;

  for (let i = 0; i < pages.length; i++) {
    const page = pages[i];
    const first = i == 0;
    const last = i == pages.length - 1;
    if (
      page !== currPage &&
      ((first && yMap[i + 1] > cutoff) ||
        (last && yMap[i] < cutoff) ||
        (yMap[i] < cutoff && yMap[i + 1] > cutoff))
    ) {
      setCurrPage(page);
      setSliderPos(pageMap[pages[i]].buttonRef);

      break;
    }
  }
};

pages.forEach((page) => {
  pageMap[page].buttonRef.addEventListener("click", () => {
    setMenuOpen(false);
    pageMap[page].ref.scrollIntoView();
  });
});

topBarTitle.addEventListener("click", () => pageMap.Home.ref.scrollIntoView());

hamburgerButton.addEventListener("click", () => setMenuOpen(!menuOpen));

window.addEventListener("load", () => {
  findActiveOption();
  window.addEventListener("mousedown", onClick);
  window.addEventListener("resize", onResize);
  window.addEventListener("scroll", onScroll);
});
