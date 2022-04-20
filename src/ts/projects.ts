import logoUrl from "../../assets/svg/c-logo.svg";
import bashUrl from "../../assets/svg/tags/bash.svg";
import cmakeUrl from "../../assets/svg/tags/cmake.svg";
import cppUrl from "../../assets/svg/tags/cpp.svg";
import cssUrl from "../../assets/svg/tags/css.svg";
import dockerUrl from "../../assets/svg/tags/docker.svg";
import expressjsUrl from "../../assets/svg/tags/expressjs.svg";
import goUrl from "../../assets/svg/tags/go.svg";
import htmlUrl from "../../assets/svg/tags/html.svg";
import hugoUrl from "../../assets/svg/tags/hugo.svg";
import javascriptUrl from "../../assets/svg/tags/javascript.svg";
import kubernetesUrl from "../../assets/svg/tags/kubernetes.svg";
import mongodbUrl from "../../assets/svg/tags/mongodb.svg";
import nodejsUrl from "../../assets/svg/tags/nodejs.svg";
import openglUrl from "../../assets/svg/tags/opengl.svg";
import powershellUrl from "../../assets/svg/tags/powershell.svg";
import pythonUrl from "../../assets/svg/tags/python.svg";
import reactjsUrl from "../../assets/svg/tags/reactjs.svg";
import scssUrl from "../../assets/svg/tags/scss.svg";
import tensorflowUrl from "../../assets/svg/tags/tensorflow.svg";
import typescriptUrl from "../../assets/svg/tags/typescript.svg";
import { projectsContainer } from "./dom";
import { IconType, Project } from "./types";

const tagUrlMap: Record<IconType, string> = {
  bash: bashUrl,
  cmake: cmakeUrl,
  cpp: cppUrl,
  css: cssUrl,
  docker: dockerUrl,
  expressjs: expressjsUrl,
  go: goUrl,
  html: htmlUrl,
  hugo: hugoUrl,
  javascript: javascriptUrl,
  kubernetes: kubernetesUrl,
  mongodb: mongodbUrl,
  nodejs: nodejsUrl,
  opengl: openglUrl,
  powershell: powershellUrl,
  python: pythonUrl,
  reactjs: reactjsUrl,
  scss: scssUrl,
  tensorflow: tensorflowUrl,
  typescript: typescriptUrl,
};

const projects: Project[] = [
  {
    name: "Project Megaphone",
    description: "My main portfolio website. You're on it right now!",
    image: logoUrl,
    url: "https://www.cristianaldea.com",
    sourceUrl: "https://github.com/cristian-aldea/project-megaphone",
    tags: ["html", "scss", "typescript"],
  },
  {
    name: "Starlog",
    description: "A blog to teach about various topics!",
    image: logoUrl,
    url: "https://blog.cristianaldea.com",
    sourceUrl: "https://github.com/cristian-aldea/starlog",
    tags: ["hugo", "html", "css", "javascript"],
  },
  {
    name: "VoteIt",
    description: "Create polls quickly and easily!",
    image: logoUrl,
    url: "https://voteit.cristianaldea.com",
    tags: ["mongodb", "go", "reactjs", "nodejs", "docker"],
  },
  {
    name: "Mull Recognition",
    description: "A real-time ML object recognition app for waste!",
    image: logoUrl,
    url: "https://mull.cristianaldea.com",
    sourceUrl: "https://github.com/cristian-aldea/mull-recognition",
    tags: ["html", "scss", "typescript", "tensorflow"],
  },
  {
    name: "Simul8",
    description: "A 3D engine developed with C++ and OpenGL",
    image: logoUrl,
    sourceUrl: "https://github.com/cristian-aldea/simul8",
    tags: ["cpp", "opengl", "cmake"],
  },
  {
    name: "MMM Bot",
    description: "A discord bot for real-time updates on your Minecraft server",
    image: logoUrl,
    sourceUrl: "https://github.com/cristian-aldea/mmm-bot",
    tags: ["python"],
  },
  {
    name: "AutoMadeIt",
    description: "Various utilities and scripts made available to anyone, on any system",
    image: logoUrl,
    sourceUrl: "https://github.com/cristian-aldea/auto-made-it",
    tags: ["python", "bash", "powershell"],
  },
];

const projectStrings = projects.map((project) => {
  const urlString = project.url
    ? `<a class="project-card-link" href="${project.url}">Visit</a>`
    : "";
  const sourceUrlString = project.sourceUrl
    ? `<a class="project-card-link" href="${project.sourceUrl}">Source Code</a>`
    : "";

  const tagString = project.tags
    .map((tag) => {
      return `<img src="${tagUrlMap[tag]}" class="skill-icon" alt="${tag}" title="${tag}" />`;
    })
    .join("");
  return `
<div class="project-card button">
<img src="${project.image}" class="project-card-image" alt="${project.name} logo" />
<h1>${project.name}</h1>
<div class="project-card-icons">
  ${tagString}
</div>
<div class="project-card-description">${project.description}</div>
${urlString}
${sourceUrlString}
</div>
`;
});

projectsContainer.innerHTML = projectStrings.join("");
