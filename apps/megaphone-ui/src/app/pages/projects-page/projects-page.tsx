import { IProject } from '@project-megaphone/types';
import React from 'react';
import { ProjectCard } from '../../components';
import './projects-page.scss';

/* eslint-disable-next-line */
export interface ProjectsPageProps {}

export function ProjectsPage(props: ProjectsPageProps) {
  // TODO possibly fetch this information from an api
  const projects: IProject[] = [
    {
      name: 'Project Megaphone',
      description: "The code for my public websites will be available here, including the one you're on!",
      url: 'https://github.com/cristian-aldea/project-megaphone',
      imageUrl: 'assets/images/github.jpg',
    },
    {
      name: 'Mull Recognition',
      description: 'A standalone version of the waste recognition ML feature from my capstone project, Mull!',
      url: 'https://mull-recognition.netlify.app/',
      imageUrl: 'assets/images/c.png',
    },
    {
      name: 'Auto Made It',
      description: "Various utilities and scripts I've made available to anyone, on any system.",
      url: 'https://github.com/cristian-aldea/auto-made-it',
      imageUrl: 'assets/images/github.jpg',
    },
    {
      name: 'Risky Warfare',
      description: 'A C++ game based on the game Risk.',
      url: 'https://github.com/cristian-aldea/risky-warfare',
      imageUrl: 'assets/images/github.jpg',
    },
  ];

  return (
    <div className="section-container projects-page-container" id="projects-page">
      <div className="section-content-container">
        <div className="page-title">Projects</div>
        <p className="projects-page-info">
          My whole portfolio can be found on <a href="https://github.com/cristian-aldea">Github</a>, but here
          I've picked out a few of my favorites.
        </p>
        {projects.map((project, i) => (
          <ProjectCard project={project} className="project-page-card" key={i} />
        ))}
      </div>
    </div>
  );
}

export default ProjectsPage;
