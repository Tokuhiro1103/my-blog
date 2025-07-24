import Link from 'next/link';
import { getAllPosts, getAllCategories, getAllTags } from '../lib/posts';

export default async function Home() {
  const posts = await getAllPosts();
  const categories = await getAllCategories();
  const tags = await getAllTags();

  return (
    <main className="max-w-2xl mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">ブログ一覧</h1>
      <div className="mb-6">
        <span className="font-semibold mr-2">カテゴリ:</span>
        {categories.map(category => (
          <Link key={category} href={`/categories/${encodeURIComponent(category)}`} className="inline-block bg-green-100 text-green-800 text-xs px-2 py-1 rounded mr-2 mb-1 hover:bg-green-200">
            {category}
          </Link>
        ))}
      </div>
      <div className="mb-6">
        <span className="font-semibold mr-2">タグ:</span>
        {tags.map(tag => (
          <Link key={tag} href={`/tags/${encodeURIComponent(tag)}`} className="inline-block bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded mr-2 mb-1 hover:bg-blue-200">
            {tag}
          </Link>
        ))}
      </div>
      <ul>
        {posts.map(post => (
          <li key={post.slug} className="mb-4">
            <Link href={`/posts/${post.slug}`}>
              <span className="text-xl text-blue-600 hover:underline">{post.meta.title}</span>
            </Link>
            <div className="text-gray-500 text-sm">{post.meta.date}</div>
            {post.meta.category && (
              <div className="inline-block bg-green-100 text-green-800 text-xs px-2 py-1 rounded mt-1 ml-1">
                {post.meta.category}
              </div>
            )}
            {Array.isArray(post.meta.tags) && post.meta.tags.length > 0 && (
              <div className="mt-1">
                {post.meta.tags.map((tag: string) => (
                  <Link key={tag} href={`/tags/${encodeURIComponent(tag)}`} className="inline-block bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded mr-2 mb-1 hover:bg-blue-200">
                    {tag}
                  </Link>
                ))}
              </div>
            )}
          </li>
        ))}
      </ul>
    </main>
  );
}