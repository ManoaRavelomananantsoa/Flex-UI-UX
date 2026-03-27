"use client";
import { useEffect, useState, useRef } from 'react';

interface SectionBackground {
  image: string;
  position?: string;
  size?: string;
  repeat?: string;
  attachment?: string;
}

const sectionBackgrounds: Record<string, SectionBackground> = {
  hero: {
    image: '/images/blackhole.png',
    position: 'left center',
    size: '142% auto',
    repeat: 'no-repeat',
    attachment: 'fixed'
  },
  services: {
    image: '/images/toji.png',
    position: 'center center',
    size: 'cover',
    repeat: 'no-repeat',
    attachment: 'fixed'
  },
  projects: {
    image: '/images/me.png',
    position: 'center center',
    size: 'cover',
    repeat: 'no-repeat',
    attachment: 'fixed'
  }
};

const applyBackground = (section: string) => {
  const background = sectionBackgrounds[section];
  if (!background) return;
  document.body.style.backgroundImage = `url(${background.image})`;
  document.body.style.backgroundPosition = background.position || 'center center';
  document.body.style.backgroundSize = background.size || 'cover';
  document.body.style.backgroundRepeat = background.repeat || 'no-repeat';
  document.body.style.backgroundAttachment = background.attachment || 'fixed';
};

export const useScrollBackground = () => {
  const [activeSection, setActiveSection] = useState<string>('hero');
  const activeSectionRef = useRef<string>('hero');

  useEffect(() => {
    applyBackground('hero');

    const handleScroll = () => {
      const sections = ['hero', 'services', 'projects'];
      const scrollPosition = window.scrollY + window.innerHeight / 2;

      for (const section of sections) {
        const element = document.getElementById(`section-${section}`);
        if (element) {
          const { offsetTop, offsetHeight } = element;
          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            if (activeSectionRef.current !== section) {
              activeSectionRef.current = section;
              setActiveSection(section);
              applyBackground(section);
            }
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return { activeSection };
};