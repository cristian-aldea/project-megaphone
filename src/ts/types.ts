import { pages } from "./constants";

export type IconType =
  | "android"
  | "cmake"
  | "cpp"
  | "css"
  | "docker"
  | "html"
  | "javascript"
  | "kubernetes"
  | "python"
  | "scss"
  | "shell"
  | "tensorflow"
  | "typescript";

export interface Project {
  title: string;
  name: string;
  description: string;
  image: string;
  url: string;
  sourceUrl: string;
  tags: IconType[];
}

export interface Contact {
  name: string;
  url: string;
  image: string;
}

export interface Point {
  x: number;
  y: number;
  dx: number;
  dy: number;
}

export type Page = typeof pages[number];

export interface TopBarOption {
  title: string;
  buttonText: string;
  id: string;
  buttonId?: string;
  ref: HTMLDivElement;
  buttonRef?: HTMLButtonElement;
  y?: number;
}

export interface Pauses {
  [phrase: number]: { [char: number]: boolean };
}
