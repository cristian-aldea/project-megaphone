import { Project } from "./types";

const cIcon = "svg/c-logo.svg";
const ghIcon = "svg/github.svg";

const projects: Project[] = [
  {
    title: "Project Megaphone",
    name: "project-megaphone",
    description: "My main website that you're on right now!",
    image: cIcon,
    url: "https://www.cristianaldea.com/",
    sourceUrl: "https://github.com/cristian-aldea/project-megaphone",
    tags: ["docker", "html", "javascript", "scss", "typescript"],
  },
  {
    title: "Mull Recognition",
    name: "project-megaphone",
    description: "A real-time machine learning waste recognition tool",
    image: cIcon,
    url: "https://apps.cristianaldea.com/mull-recognition",
    sourceUrl: "https://github.com/cristian-aldea/project-megaphone",
    tags: ["docker", "html", "javascript", "scss", "tensorflow", "typescript"],
  },
  {
    title: "MMM Bot",
    name: "mmm-bot",
    description: "A discord bot that gives you real-time information on your Minecraft server",
    image: ghIcon,
    url: null,
    sourceUrl: "https://github.com/cristian-aldea/mmm-bot",
    tags: ["python"],
  },
  {
    title: "Auto Made It",
    name: "auto-made-it",
    description: "Various utilities and scripts I've made available to anyone, on any system.",
    image: ghIcon,
    url: null,
    sourceUrl: "https://github.com/cristian-aldea/auto-made-it",
    tags: ["python"],
  },
  {
    title: "Risky Warfare",
    name: "risky-warfare",
    description: "A C++ game based on the game Risk.",
    image: ghIcon,
    url: null,
    sourceUrl: "https://github.com/cristian-aldea/risky-warfare",
    tags: ["cmake", "cpp"],
  },
];
