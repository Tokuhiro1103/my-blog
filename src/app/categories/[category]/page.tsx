import { getAllPosts } from '../../../lib/posts';
import Link from 'next/link';

export default async function CategoryPage({ params }: { params: { category: string } }) {
  const { category } = await params;
  const posts = await getAllPosts();
  const decodedCategory = decodeURIComponent(category);
  const filteredPosts = posts.filter(post => post.meta.category === decodedCategory);

  return (
    <main className="max-w-2xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-6">カテゴリ: {decodedCategory}</h1>
      {filteredPosts.length === 0 ? (
        <div>記事がありません。</div>
      ) : (
        <ul>
          {filteredPosts.map(post => (
            <li key={post.slug} className="mb-4">
              <Link href={`/posts/${post.slug}`}>
                <span className="text-xl text-blue-600 hover:underline">{post.meta.title}</span>
              </Link>
              <div className="text-gray-500 text-sm">{post.meta.date}</div>
            </li>
          ))}
        </ul>
      )}
      <div className="mt-8">
        <Link href="/categories" className="text-green-700 hover:underline">← カテゴリ一覧に戻る</Link>
      </div>
    </main>
  );
} 