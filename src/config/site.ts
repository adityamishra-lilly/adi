import type { IconName } from "../components/icons";

export interface SocialLink {
  label: string;
  href: string;
  icon: IconName;
}

export const site = {
  name: "Aditya Mishra",
  shortName: "Adi",
  // TODO: confirm tagline.
  tagline: "distributed systems, infra and federated learning. everlearning.",
  description:
    "Aditya Mishra — CS student at the University of Surrey and Software Engineer at Eli Lilly, writing about distributed systems, platforms and applied AI.",
  // TODO: domain not decided yet; keep in sync with `site` in astro.config.mjs.
  url: "https://example.com",
  socials: [
    // TODO: replace placeholder URLs.
    {
      label: "GitHub",
      href: "https://github.com/adityamishra-lilly",
      icon: "github",
    },
    {
      label: "LinkedIn",
      href: "https://www.linkedin.com/in/TODO",
      icon: "linkedin",
    },
    { label: "Email", href: "mailto:TODO@example.com", icon: "mail" },
    { label: "CV", href: "/cv.pdf", icon: "file" },
  ] satisfies SocialLink[],
} as const;
