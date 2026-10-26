import ArrowRight from './ArrowRight.astro';
import FileText from './FileText.astro';
import GitHub from './GitHub.astro';
import LinkedIn from './LinkedIn.astro';
import Mail from './Mail.astro';
import Moon from './Moon.astro';
import Sun from './Sun.astro';

export const icons = {
  'arrow-right': ArrowRight,
  file: FileText,
  github: GitHub,
  linkedin: LinkedIn,
  mail: Mail,
  moon: Moon,
  sun: Sun,
};

export type IconName = keyof typeof icons;
