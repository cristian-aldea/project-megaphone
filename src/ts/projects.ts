import { projectsContainer } from "./dom";
import { Project } from "./types";

const projects: Project[] = [
  {
    name: "Project Megaphone",
    description: "My main portfolio website. You're on it right now!",
    image: "svg/c-logo.svg",
    url: "https://www.cristianaldea.com",
    sourceUrl: "https://github.com/cristian-aldea/project-megaphone",
    tags: ["html", "scss", "typescript"],
  },
  {
    name: "Starlog",
    description: "A blog to teach about various topics!",
    image: "svg/c-logo.svg",
    url: "https://blog.cristianaldea.com",
    sourceUrl: "https://github.com/cristian-aldea/starlog",
    tags: ["hugo", "html", "css", "javascript"],
  },
  {
    name: "VoteIt",
    description: "Create polls quickly and easily!",
    image: "svg/c-logo.svg",
    url: "https://voteit.cristianaldea.com",
    tags: ["mongodb", "expressjs", "reactjs", "nodejs", "docker"],
  },
  {
    name: "Mull Recognition",
    description: "A real-time ML object recognition app for waste!",
    image: "svg/c-logo.svg",
    url: "https://mull.cristianaldea.com",
    sourceUrl: "https://github.com/cristian-aldea/mull-recognition",
    tags: ["html", "scss", "typescript", "tensorflow"],
  },
  {
    name: "Simul8",
    description: "A 3D engine developed with C++ and OpenGL",
    image: "svg/github.svg",
    sourceUrl: "https://github.com/cristian-aldea/simul8",
    tags: ["cpp", "opengl", "cmake"],
  },
  {
    name: "MMM Bot",
    description: "A discord bot for real-time updates on your Minecraft server",
    image: "svg/github.svg",
    sourceUrl: "https://github.com/cristian-aldea/mmm-bot",
    tags: ["python"],
  },
  {
    name: "AutoMadeIt",
    description: "Various utilities and scripts made available to anyone, on any system",
    image: "svg/github.svg",
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
      return `<img src="svg/${tag}.svg" class="skill-icon" alt="${tag}" title="${tag}" />`;
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
