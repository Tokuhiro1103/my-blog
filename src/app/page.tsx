import { getAllPosts, getAllCategories, getAllTags } from '../lib/posts';
import SearchBlogList from './searchBlogList';

export default async function Home() {
  const posts = await getAllPosts();
  const categories = await getAllCategories();
  const tags = await getAllTags();

  return (
    <SearchBlogList posts={posts} categories={categories} tags={tags} />
  );
}