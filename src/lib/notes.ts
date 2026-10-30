import { getCollection, type CollectionEntry } from 'astro:content';

export type Note = CollectionEntry<'notes'>;

export interface Category {
  name: string;
  slug: string;
  count: number;
}

/** All published notes, newest first. Drafts are only visible in dev. */
export async function getNotes(): Promise<Note[]> {
  const notes = await getCollection('notes', ({ data }) => !(import.meta.env.PROD && data.draft));
  return notes.sort((a, b) => b.data.date.getTime() - a.data.date.getTime());
}

export function slugify(value: string): string {
  return value
    .toLowerCase()
    .replace(/&/g, 'and')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

export const categoryHref = (category: string) => `/notes/category/${slugify(category)}/`;
export const noteHref = (note: Note) => `/notes/${note.id}/`;

/** Categories with their note counts, most used first. */
export function getCategories(notes: Note[]): Category[] {
  const counts = new Map<string, number>();
  for (const note of notes) counts.set(note.data.category, (counts.get(note.data.category) ?? 0) + 1);
  return [...counts]
    .map(([name, count]) => ({ name, slug: slugify(name), count }))
    .sort((a, b) => b.count - a.count || a.name.localeCompare(b.name));
}

/** Groups notes (already sorted newest first) by year, newest year first. */
export function groupByYear(notes: Note[]): [number, Note[]][] {
  const groups = new Map<number, Note[]>();
  for (const note of notes) {
    const year = note.data.date.getUTCFullYear();
    groups.set(year, [...(groups.get(year) ?? []), note]);
  }
  return [...groups].sort(([a], [b]) => b - a);
}

export function readingTime(body = ''): number {
  const words = body.trim().split(/\s+/).filter(Boolean).length;
  return Math.max(1, Math.round(words / 220));
}

// Dates are stored as UTC midnight, so format in UTC to avoid off-by-one days.
const shortDate = new Intl.DateTimeFormat('en-US', { month: 'short', day: '2-digit', timeZone: 'UTC' });
const longDate = new Intl.DateTimeFormat('en-US', { month: 'short', day: '2-digit', year: 'numeric', timeZone: 'UTC' });

/** "Sep 09" */
export function formatShortDate(date: Date): string {
  const parts = shortDate.formatToParts(date);
  const get = (type: string) => parts.find((p) => p.type === type)?.value ?? '';
  return `${get('month')} ${get('day')}`;
}

/** "Sep 03, 2026" */
export function formatLongDate(date: Date): string {
  const parts = longDate.formatToParts(date);
  const get = (type: string) => parts.find((p) => p.type === type)?.value ?? '';
  return `${get('month')} ${get('day')}, ${get('year')}`;
}
