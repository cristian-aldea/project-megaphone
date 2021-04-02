import { debounce, throttle } from 'lodash';
import React, { useEffect, useRef, useState } from 'react';
import BurgerButton from './burger-button/burger-button';
import TopBarButton from './top-bar-button/top-bar-button';
import './top-bar.scss';

/* eslint-disable-next-line */
export interface TopBarProps {}

export function TopBar(props: TopBarProps) {
  const options = ['Home', 'About', 'Projects', 'Contact'];

  const [menuOpen, _setMenuOpen] = useState<boolean>(false);
  const menuOpenRef = useRef<boolean>(false);
  const [activeOption, _setActiveOption] = useState<number>(0);
  const activeOptionRef = useRef<number>(0);

  const homePageRef = useRef<HTMLDivElement>(null);
  const aboutPageRef = useRef<HTMLDivElement>(null);
  const projectPageRef = useRef<HTMLDivElement>(null);
  const contactPageRef = useRef<HTMLDivElement>(null);
  const [animate, setAnimate] = useState<boolean>(true);

  const topBarRef = useRef<HTMLDivElement>(null);

  const setActiveOption = (value: number) => {
    activeOptionRef.current = value;
    _setActiveOption(value);
  };

  const setMenuOpen = (value: boolean) => {
    menuOpenRef.current = value;
    _setMenuOpen(value);
  };

  useEffect(() => {
    window.addEventListener('mousedown', onClick);
    window.addEventListener('resize', onResize);
    window.addEventListener('scroll', onScroll);

    homePageRef.current = document.getElementById('home-page') as HTMLDivElement;
    aboutPageRef.current = document.getElementById('about-page') as HTMLDivElement;
    projectPageRef.current = document.getElementById('projects-page') as HTMLDivElement;
    contactPageRef.current = document.getElementById('contact-page') as HTMLDivElement;

    return () => {
      window.removeEventListener('mousedown', onClick);
      window.removeEventListener('resize', onResize);
      window.removeEventListener('scroll', onScroll);
    };
  }, []);

  const onClick = (event: MouseEvent) => {
    if (menuOpenRef.current && !topBarRef.current.contains(event.target as HTMLElement)) {
      setMenuOpen(false);
    }
  };

  const turnOnAnims = debounce(() => {
    setAnimate(true);
  }, 400);

  const onResize = throttle((event: UIEvent) => {
    setMenuOpen(false);
    setAnimate(false);
    turnOnAnims();
  }, 100);

  const onScroll = throttle((event: Event) => {
    const active = activeOptionRef.current;
    const wHeight = window.innerHeight;

    const apY = aboutPageRef.current.getBoundingClientRect().y;
    const ppY = projectPageRef.current.getBoundingClientRect().y;
    const cpY = contactPageRef.current.getBoundingClientRect().y;

    const cutoff = 0.5 * wHeight;

    if (active !== 0 && apY > cutoff) {
      setActiveOption(0);
    } else if (active !== 1 && apY < cutoff && ppY > cutoff) {
      setActiveOption(1);
    } else if (active !== 2 && ppY < cutoff && cpY > cutoff) {
      setActiveOption(2);
    } else if (active !== 3 && cpY < cutoff) {
      setActiveOption(3);
    }
  }, 100);

  return (
    <nav className="top-bar-container" ref={topBarRef}>
      <a className="top-bar-title plain-link" href="#home-page">
        Cristian Aldea
      </a>

      <div
        className={`top-bar-button-group${!menuOpen ? ' top-bar-menu-closed' : ' top-bar-menu-open'}${
          animate ? ' animate' : ''
        }`}
      >
        <div className={`top-bar-slider position-${activeOption}${animate ? ' animate' : ''}`} />
        {options.map((option, i) => {
          return (
            <TopBarButton
              href={`#${option.toLowerCase()}-page`}
              active={activeOption === i}
              key={i}
              onClick={() => {
                setMenuOpen(false);
              }}
            >
              {option}
            </TopBarButton>
          );
        })}
      </div>

      <BurgerButton
        className="top-bar-burger-button"
        onClick={() => {
          setMenuOpen(!menuOpen);
        }}
        activated={menuOpen}
      />
    </nav>
  );
}

export default TopBar;
