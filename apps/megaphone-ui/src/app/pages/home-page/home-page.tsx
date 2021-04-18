import React from 'react';
import TypingText from '../../components/typing-text/typing-text';
import './home-page.scss';

/* eslint-disable-next-line */
export interface HomePageProps {}

const HOME_MESSAGES = ['websites', 'software', 'solutions', 'games sometimes', 'cool stuff B)'];

export function HomePage(props: HomePageProps) {
  return (
    <>
      <div className="section-container home-page-container" id="home-page">
        <div className="section-content-container">
          <div className="home-page-subtext">
            <div>I'm Cristian Aldea</div>
            <div>
              <div className="inline">I build</div> <TypingText messages={HOME_MESSAGES} loop={true} />
            </div>
          </div>
        </div>
      </div>

      <div className="home-page-title page-title">Welcome</div>
    </>
  );
}

export default HomePage;
