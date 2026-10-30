import rss from '@astrojs/rss';
import type { APIContext } from 'astro';
import { site } from '../../config/site';
import { sections } from '../../config/sections';
import { getNotes, noteHref } from '../../lib/notes';

export async function GET(context: APIContext) {
  const notes = await getNotes();
  return rss({
    title: `Notes · ${site.name}`,
    description: sections.find((s) => s.id === 'notes')?.description ?? site.description,
    site: context.site ?? site.url,
    items: notes.map((note) => ({
      title: note.data.title,
      pubDate: note.data.date,
      description: note.data.description ?? note.data.tldr,
      link: noteHref(note),
      categories: [note.data.category, ...note.data.tags],
    })),
    customData: '<language>en-gb</language>',
  });
}
