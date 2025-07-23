import Link from 'next/link';
import { getAllPosts } from '../lib/posts';

export default async function Home() {
  const posts = await getAllPosts();

  return (
    <main className="max-w-2xl mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">ブログ一覧</h1>
      <ul>
        {posts.map(post => (
          <li key={post.slug} className="mb-4">
            <Link href={`/posts/${post.slug}`}>
              <span className="text-xl text-blue-600 hover:underline">{post.meta.title}</span>
            </Link>
            <div className="text-gray-500 text-sm">{post.meta.date}</div>
          </li>
        ))}
      </ul>
    </main>
  );
}
