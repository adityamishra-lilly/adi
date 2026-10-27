import type { IconName } from "../components/icons";

export interface SocialLink {
  label: string;
  href: string;
  icon: IconName;
}

export const site = {
  name: "Aditya Mishra",
  shortName: "Adi",
  tagline: "distributed systems, infra and federated learning. everlearning.",
  description:
    "Aditya Mishra — CS student at the University of Surrey, writing about distributed systems, platforms and applied AI.",
  url: "https://am-labs.dev",
  socials: [
    {
      label: "GitHub",
      href: "https://github.com/adityamishra-lilly",
      icon: "github",
    },
    {
      label: "LinkedIn",
      href: "https://www.linkedin.com/in/aditya-mishra-3b8a46292/",
      icon: "linkedin",
    },
    { label: "Email", href: "mailto:mishra.adi2005@gmail.com", icon: "mail" },
  ] satisfies SocialLink[],
} as const;
