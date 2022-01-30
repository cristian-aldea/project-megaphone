import { pages } from "./constants";

export type IconType =
  | "bash"
  | "cmake"
  | "cpp"
  | "css"
  | "docker"
  | "expressjs"
  | "html"
  | "hugo"
  | "javascript"
  | "kubernetes"
  | "mongodb"
  | "nodejs"
  | "opengl"
  | "powershell"
  | "python"
  | "reactjs"
  | "scss"
  | "shell"
  | "tensorflow"
  | "typescript";

export interface Project {
  name: string;
  description: string;
  image: string;
  url?: string;
  sourceUrl?: string;
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
  id: string;
  buttonId: string;
  ref: HTMLDivElement;
  buttonRef: HTMLButtonElement;
}

export interface Pauses {
  [phrase: number]: { [char: number]: boolean };
}
