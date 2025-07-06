// Script para generar el índice de búsqueda para FlexSearch desde los markdown de Astro Content
// Ejecuta: node scripts/generate-search-index.js

import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

const CONTENT_DIR = path.join(process.cwd(), 'src/content/blog');
const OUTPUT_FILE = path.join(process.cwd(), 'public/search-index.json');

function walk(dir) {
  let results = [];
  const list = fs.readdirSync(dir);
  list.forEach((file) => {
    const filePath = path.join(dir, file);
    const stat = fs.statSync(filePath);
    if (stat && stat.isDirectory()) {
      results = results.concat(walk(filePath));
    } else if (file.endsWith('.md') || file.endsWith('.mdx')) {
      results.push(filePath);
    }
  });
  return results;
}

function extractContent(markdown) {
  // Quita frontmatter y devuelve solo el contenido plano
  return matter(markdown).content.replace(/\n+/g, ' ').replace(/\s+/g, ' ').trim();
}

function main() {
  const files = walk(CONTENT_DIR);
  const docs = files.map((file) => {
    const raw = fs.readFileSync(file, 'utf-8');
    const { data, content } = matter(raw);
    return {
      title: data.title || '',
      description: data.description || '',
      tags: data.tags || [],
      categories: data.categories || [],
      content: content.replace(/\n+/g, ' ').replace(/\s+/g, ' ').trim(),
      path: '/blog/' + path.relative(CONTENT_DIR, file).replace(/\\/g, '/').replace(/\.(md|mdx)$/, ''),
    };
  });
  fs.mkdirSync(path.dirname(OUTPUT_FILE), { recursive: true });
  fs.writeFileSync(OUTPUT_FILE, JSON.stringify(docs, null, 2), 'utf-8');
  console.log(`Índice de búsqueda generado: ${OUTPUT_FILE} (${docs.length} documentos)`);
}

main();
