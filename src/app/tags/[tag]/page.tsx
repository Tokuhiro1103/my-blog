import { getAllPosts } from '../../../lib/posts';
import Link from 'next/link';

export default async function TagPage({ params }: { params: { tag: string } }) {
  const { tag } = await params;
  const posts = await getAllPosts();
  const decodedTag = decodeURIComponent(tag);
  const filteredPosts = posts.filter(post => Array.isArray(post.meta.tags) && post.meta.tags.includes(decodedTag));

  return (
    <main className="max-w-4xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-6">タグ: {decodedTag}</h1>
      {filteredPosts.length === 0 ? (
        <div>記事がありません。</div>
      ) : (
        <ul>
          {filteredPosts.map(post => (
            <li key={post.slug} className="mb-6 p-4 border border-gray-200 rounded-lg hover:shadow-md transition-shadow">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <Link href={`/posts/${post.slug}`}>
                    <span className="text-xl text-blue-600 hover:underline font-semibold">{post.meta.title}</span>
                  </Link>
                  <div className="text-gray-500 text-sm mt-1">{post.meta.date}</div>
                  <div className="mt-2">
                    {post.meta.category && (
                      <div className="inline-block bg-green-100 text-green-800 text-xs px-2 py-1 rounded mr-2">
                        {post.meta.category}
                      </div>
                    )}
                    {Array.isArray(post.meta.tags) && post.meta.tags.length > 0 && (
                      <>
                        {post.meta.tags.map((tag: string) => (
                          <Link key={tag} href={`/tags/${encodeURIComponent(tag)}`} className="inline-block bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded mr-2 mb-1 hover:bg-blue-200">
                            {tag}
                          </Link>
                        ))}
                      </>
                    )}
                  </div>
                </div>
                {post.meta.image && (
                  <div className="ml-4 flex-shrink-0">
                    <img 
                      src={post.meta.image} 
                      alt={`${post.meta.title}の画像`}
                      className="w-36 h-36 object-cover rounded-lg shadow-sm"
                    />
                  </div>
                )}
              </div>
            </li>
          ))}
        </ul>
      )}
      <div className="mt-8">
        <Link href="/tags" className="text-blue-700 hover:underline">← タグ一覧に戻る</Link>
      </div>
    </main>
  );
} 