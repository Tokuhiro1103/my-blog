import fs from 'fs/promises';
import path from 'path';
import matter from 'gray-matter';

const postsDirectory = path.join(process.cwd(), 'posts');

export interface PostMeta {
  title: string;
  date: string;
  category?: string;
  tags?: string[];
  image?: string;
  topImage?: string;
}

export interface Post {
  slug: string;
  meta: PostMeta;
  content: string;
}

export async function getPostSlugs() {
  const files = await fs.readdir(postsDirectory);
  return files.filter(file => file.endsWith('.md'));
}

export async function getPostBySlug(slug: string): Promise<Post> {
  const realSlug = slug.replace(/\.md$/, '');
  const fullPath = path.join(postsDirectory, `${realSlug}.md`);
  const fileContents = await fs.readFile(fullPath, 'utf8');
  const { data, content } = matter(fileContents);

  return {
    slug: realSlug,
    meta: data as PostMeta,
    content,
  };
}

export async function getAllPosts(): Promise<Post[]> {
  const slugs = await getPostSlugs();
  const posts = await Promise.all(slugs.map(slug => getPostBySlug(slug)));
  // 日付順にソート（新しい順）
  return posts.sort((a, b) => (a.meta.date < b.meta.date ? 1 : -1));
}

export async function getAllCategories(): Promise<string[]> {
  const posts = await getAllPosts();
  // カテゴリの重複を排除し一覧化
  const categories = Array.from(new Set(posts.map(post => post.meta.category).filter((category): category is string => Boolean(category))));
  return categories;
}

export async function getAllTags(): Promise<string[]> {
  const posts = await getAllPosts();
  // タグをフラット化し重複を排除
  const tags = Array.from(new Set(posts.flatMap(post => Array.isArray(post.meta.tags) ? post.meta.tags : []).filter((tag): tag is string => Boolean(tag))));
  return tags;
} 