import React from 'react';
import './about-page.scss';

/* eslint-disable-next-line */
export interface AboutPageProps {}

export function AboutPage(props: AboutPageProps) {
  return (
    <div className="section-container about-page-container" id="about-page">
      <div className="section-content-container">
        <div className="page-title">About Me</div>
        <div className="about-page-info">
          <img src="assets/images/profile-pic.jpg" className="about-page-picture" alt="Cristian Aldea" />
          <p>
            Hello! I'm currently a Cloud Engineer over at SAP, and a Software Engineering graduate student at
            Concordia.
          </p>
          <p>
            I enjoy working on many things software. I have practical experience in full-stack development,
            machine learning and cloud-native technologies, among other things.
          </p>
          <p>
            I love solving problems and learning new things, and I bring consistency and excellence to any
            project.
          </p>
        </div>
        <p className="about-page-quote">
          <em>"Today is a gift, that is why we call it the Present."</em>
        </p>
      </div>
    </div>
  );
}

export default AboutPage;
