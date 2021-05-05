import { IContact } from '@project-megaphone/types';
import React from 'react';
import { ReactComponent as EmailSvg } from '../../../assets/icons/email.svg';
import { ReactComponent as GitHubSvg } from '../../../assets/icons/github.svg';
import { ReactComponent as LinkedInSvg } from '../../../assets/icons/linkedin.svg';
import './contact-page.scss';

/* eslint-disable-next-line */
export interface ContactPageProps {}

export function ContactPage(props: ContactPageProps) {
  const contacts: IContact[] = [
    {
      name: 'LinkedIn',
      url: 'https://www.linkedin.com/in/cristianaldea/',
      image: LinkedInSvg,
    },
    {
      name: 'GitHub',
      url: 'https://github.com/cristian-aldea',
      image: GitHubSvg,
    },
    {
      name: 'Email',
      url: 'mailto:aldea.cristian@outlook.com',
      image: EmailSvg,
    },
  ];

  return (
    <div className="section-container contact-page-container" id="contact-page">
      <div className="section-content-container">
        <div className="page-title">Contact</div>
        <p>You can reach out to me with the links below:</p>
        <div className="contact-page-entries">
          {contacts.map((contact, i) => (
            <a
              className="contact-page-entry plain-link button-like"
              href={contact.url}
              target="_blank"
              rel="noreferrer"
              aria-label={contact.name}
              key={i}
            >
              <contact.image className="contact-page-image" />
            </a>
          ))}
        </div>
      </div>
      <footer>&copy; Copyright 2021, Cristian Aldea</footer>
    </div>
  );
}

export default ContactPage;
