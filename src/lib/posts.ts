import fs from 'fs/promises';
import path from 'path';
import matter from 'gray-matter';

const postsDirectory = path.join(process.cwd(), 'posts');

export async function getPostSlugs() {
  const files = await fs.readdir(postsDirectory);
  return files.filter(file => file.endsWith('.md'));
}

export async function getPostBySlug(slug: string) {
  const realSlug = slug.replace(/\.md$/, '');
  const fullPath = path.join(postsDirectory, `${realSlug}.md`);
  const fileContents = await fs.readFile(fullPath, 'utf8');
  const { data, content } = matter(fileContents);

  return {
    slug: realSlug,
    meta: data,
    content,
  };
}

export async function getAllPosts() {
  const slugs = await getPostSlugs();
  const posts = await Promise.all(slugs.map(slug => getPostBySlug(slug)));
  // 日付順にソート（新しい順）
  return posts.sort((a, b) => (a.meta.date < b.meta.date ? 1 : -1));
} 