export type SectionStatus = "live" | "soon";

export interface Section {
  id: string;
  /** Short mono label shown top-left on the card, e.g. "Long-form". */
  label: string;
  title: string;
  description: string;
  href: string;
  status: SectionStatus;
  /** Item count shown top-right on live cards; filled from content collections in later stages. */
  count?: number;
}

/** Single source of truth for the nav and the homepage Explore grid. */
export const sections: Section[] = [
  {
    id: "projects",
    label: "Open source",
    title: "Projects",
    description:
      "Side projects, paper implementations and homelab experiments.",
    href: "/projects/",
    status: "soon",
  },
  {
    id: "blogs",
    label: "Long-form",
    title: "Blogs",
    description:
      "Essays on distributed systems, platform engineering and applied AI.",
    href: "/blogs/",
    status: "soon",
  },
  {
    id: "notes",
    label: "Short-form",
    title: "Notes",
    description:
      "Quick takeaways, snippets and things I learned along the way.",
    href: "/notes/",
    status: "soon",
  },
  {
    id: "papershelf",
    label: "Research",
    title: "Papershelf",
    description: "Papers I have read, currently reading or have read.",
    href: "/papershelf/",
    status: "soon",
  },
];

export const liveSections = sections.filter((s) => s.status === "live");
