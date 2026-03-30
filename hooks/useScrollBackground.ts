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
    image: '/images/nightsky.png',
    position: 'center center',
    size: 'cover',
    repeat: 'no-repeat',
    attachment: 'fixed'
  },
  projects: {
    image: '/images/planet.png',
    position: 'center center',
    size: 'cover',
    repeat: 'no-repeat',
    attachment: 'fixed'
  }
};

let overlayA: HTMLDivElement | null = null;
let overlayB: HTMLDivElement | null = null;
let activeOverlay: 'A' | 'B' = 'A';

const createOverlay = (): HTMLDivElement => {
  const el = document.createElement('div');
  el.style.cssText = `
    position: fixed;
    inset: 0;
    z-index: -1;
    background-color: #000;
    background-repeat: no-repeat;
    background-attachment: fixed;
    opacity: 0;
    pointer-events: none;
  `;
  document.body.appendChild(el);
  return el;
};

const getOverlays = (): [HTMLDivElement, HTMLDivElement] => {
  if (!overlayA) overlayA = createOverlay();
  if (!overlayB) overlayB = createOverlay();
  return [overlayA, overlayB];
};

const applyToOverlay = (section: string, withTransition: boolean) => {
  const bg = sectionBackgrounds[section];
  if (!bg) return;

  const [a, b] = getOverlays();
  const current = activeOverlay === 'A' ? a : b;
  const next = activeOverlay === 'A' ? b : a;

  // Prépare le prochain overlay (invisible) avec le nouveau background
  next.style.transition = 'none';
  next.style.opacity = '0';
  next.style.backgroundImage = `url(${bg.image})`;
  next.style.backgroundPosition = bg.position || 'center center';
  next.style.backgroundSize = bg.size || 'cover';
  next.style.backgroundAttachment = bg.attachment || 'fixed';
  next.style.backgroundRepeat = bg.repeat || 'no-repeat';

  // Force reflow
  next.getBoundingClientRect();

  if (withTransition) {
    // Fade in le nouveau, fade out l'ancien simultanément
    next.style.transition = 'opacity 0.8s ease-in-out';
    current.style.transition = 'opacity 0.8s ease-in-out';
    next.style.opacity = '1';
    current.style.opacity = '0';
  } else {
    next.style.opacity = '1';
    current.style.opacity = '0';
  }

  activeOverlay = activeOverlay === 'A' ? 'B' : 'A';
};

export const useScrollBackground = () => {
  const [activeSection, setActiveSection] = useState<string>('hero');
  const activeSectionRef = useRef<string>('hero');

  useEffect(() => {
    document.body.style.backgroundImage = 'none';
    document.body.style.background = 'none';

    applyToOverlay('hero', false);

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
              applyToOverlay(section, true);
            }
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return { activeSection };
};