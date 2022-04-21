import { projectsContainer } from "./dom";
import { Project, SkillType } from "./types";

const skillUrlMap: Record<SkillType, string> = {
  bash: "/svg/skills/bash.svg",
  cmake: "/svg/skills/cmake.svg",
  cpp: "/svg/skills/cpp.svg",
  css: "/svg/skills/css.svg",
  docker: "/svg/skills/docker.svg",
  go: "/svg/skills/go.svg",
  html: "/svg/skills/html.svg",
  hugo: "/svg/skills/hugo.svg",
  javascript: "/svg/skills/javascript.svg",
  kubernetes: "/svg/skills/kubernetes.svg",
  mongodb: "/svg/skills/mongodb.svg",
  nodejs: "/svg/skills/nodejs.svg",
  opengl: "/svg/skills/opengl.svg",
  powershell: "/svg/skills/powershell.svg",
  python: "/svg/skills/python.svg",
  reactjs: "/svg/skills/reactjs.svg",
  scss: "/svg/skills/scss.svg",
  tensorflow: "/svg/skills/tensorflow.svg",
  typescript: "/svg/skills/typescript.svg",
};

const skillColorMap: Record<SkillType, string> = {
  bash: "#4EAA25",
  cmake: "#064f8c",
  cpp: "#00599c",
  css: "#1572b6",
  docker: "#2496ed",
  go: "#00ADD8",
  html: "#e34f26",
  hugo: "#FF4088",
  javascript: "#f7df1e",
  kubernetes: "#326CE5",
  mongodb: "#47A248",
  nodejs: "#393",
  opengl: "#5586A4",
  powershell: "#5391FE",
  python: "#ffe052",
  reactjs: "#61DAFB",
  scss: "#c69",
  tensorflow: "#ff6f00",
  typescript: "#3178c6",
};

const C_LOGO_URI = "/svg/c-logo.svg";

const projects: Project[] = [
  {
    name: "Project Megaphone",
    description: "My main portfolio website. You're on it right now!",
    image: C_LOGO_URI,
    url: "https://www.cristianaldea.com",
    sourceUrl: "https://github.com/cristian-aldea/project-megaphone",
    skills: ["html", "scss", "typescript"],
  },
  {
    name: "Starlog",
    description: "My blog, to explore and talk about various topics!",
    image: C_LOGO_URI,
    url: "https://blog.cristianaldea.com",
    sourceUrl: "https://github.com/cristian-aldea/starlog",
    skills: ["hugo", "html", "css", "javascript"],
  },
  {
    name: "VoteIt",
    description: "A fast and easy way to create polls!",
    image: C_LOGO_URI,
    url: "https://voteit.cristianaldea.com",
    skills: ["go", "mongodb", "reactjs", "nodejs", "docker"],
  },
  {
    name: "Mull Recognition",
    description: "A real-time machine-learning object recognition tool that runs in your browser!",
    image: C_LOGO_URI,
    url: "https://mull.cristianaldea.com",
    sourceUrl: "https://github.com/cristian-aldea/mull-recognition",
    skills: ["html", "scss", "typescript", "tensorflow", "python"],
  },
  {
    name: "Simul8",
    description: "An OpenGL engine written in C++",
    image: C_LOGO_URI,
    sourceUrl: "https://github.com/cristian-aldea/simul8",
    skills: ["cpp", "opengl", "cmake"],
  },
  {
    name: "Lets Go Check",
    description: "A configurable web crawler to check the status of your websites and APIs!",
    image: C_LOGO_URI,
    sourceUrl: "https://github.com/cristian-aldea/lets-go-check",
    skills: ["go", "bash"],
  },
  {
    name: "MMM Bot",
    description: "A discord bot for real-time updates on your Minecraft server",
    image: C_LOGO_URI,
    sourceUrl: "https://github.com/cristian-aldea/mmm-bot",
    skills: ["python"],
  },
  {
    name: "AutoMadeIt",
    description: "Various utilities and scripts made available to anyone, on any system",
    image: C_LOGO_URI,
    sourceUrl: "https://github.com/cristian-aldea/auto-made-it",
    skills: ["python", "bash", "powershell"],
  },
];

const projectStrings = projects.map((project) => {
  const urlString = project.url
    ? `<a class="project-card-link" href="${project.url}" target="_blank" rel="noreferrer"><img class="project-card-link-image" src="/svg/link.svg" alt="link to ${project.name}"><div>Visit</div></a>`
    : "";
  const sourceUrlString = project.sourceUrl
    ? `<a class="project-card-link" href="${project.sourceUrl}" target="_blank" rel="noreferrer"><img class="project-card-link-image" src="/svg/github.svg" alt="source code of ${project.name}"><div>Code</div></a>`
    : "";

  const skillstring = project.skills
    .map((skill) => {
      return `<div class="skill-container" style="border-color:${skillColorMap[skill]};"><img src="${skillUrlMap[skill]}" class="skill-icon" alt="${skill}" title="${skill}" /><div class="skill-text">${skill}</div></div>`;
    })
    .join("");
  return `
<div class="project-card">
<img src="${project.image}" class="project-card-image" alt="${project.name} logo" />
<div class="project-card-content">
<h1>${project.name}</h1>
<div class="project-card-description">${project.description}</div>

<div class="project-card-links">
${urlString}
${sourceUrlString}
</div>
<div class="project-card-skills">
  ${skillstring}
</div>
</div>
</div>
`;
});

projectsContainer.innerHTML = projectStrings.join("");
