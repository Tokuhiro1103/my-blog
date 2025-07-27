"use client";
import Link from 'next/link';
import { useState, useMemo, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';

interface Post {
  slug: string;
  meta: {
    title: string;
    date: string;
    category?: string;
    tags?: string[];
    image?: string;
  };
  content: string;
}

interface SearchBlogListProps {
  posts: Post[];
  categories: string[];
  tags: string[];
}

const PAGE_SIZE = 5;

export default function SearchBlogList({ posts, categories, tags }: SearchBlogListProps) {
  const [page, setPage] = useState(1);
  const searchParams = useSearchParams();
  const search = searchParams.get('search') || '';

  // 検索ワードや元記事リストが変わったら1ページ目に戻す
  useEffect(() => {
    setPage(1);
  }, [search, posts]);

  const filteredPosts = useMemo(() => {
    if (!search) return posts;
    const lower = search.toLowerCase();
    return posts.filter((post: Post) => {
      const title = post.meta.title?.toLowerCase() || '';
      const content = post.content?.toLowerCase() || '';
      const category = post.meta.category?.toLowerCase() || '';
      const tags = Array.isArray(post.meta.tags) ? post.meta.tags.join(' ').toLowerCase() : '';
      return (
        title.includes(lower) ||
        content.includes(lower) ||
        category.includes(lower) ||
        tags.includes(lower)
      );
    });
  }, [search, posts]);

  // ページネーション用に分割
  const totalPages = Math.ceil(filteredPosts.length / PAGE_SIZE);
  const paginatedPosts = filteredPosts.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  const handlePageChange = (newPage: number) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setPage(newPage);
    }
  };

  return (
    <main className="max-w-4xl mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">ブログ一覧</h1>
      <div className="mb-6">
        <span className="font-semibold mr-2">カテゴリ:</span>
        {categories.map((category: string) => (
          <Link key={category} href={`/categories/${encodeURIComponent(category)}`} className="inline-block bg-green-100 text-green-800 text-xs px-2 py-1 rounded mr-2 mb-1 hover:bg-green-200">
            {category}
          </Link>
        ))}
      </div>
      <div className="mb-6">
        <span className="font-semibold mr-2">タグ:</span>
        {tags.map((tag: string) => (
          <Link key={tag} href={`/tags/${encodeURIComponent(tag)}`} className="inline-block bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded mr-2 mb-1 hover:bg-blue-200">
            {tag}
          </Link>
        ))}
      </div>

      
      <ul>
        {search && paginatedPosts.length === 0 ? (
          <li>該当する記事がありません。</li>
        ) : (
          paginatedPosts.map((post: Post) => (
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
          ))
        )}
      </ul>
      {/* ページネーションUI */}
      {totalPages > 1 && (
        <div className="flex justify-center items-center gap-2 mt-8">
          <button
            onClick={() => handlePageChange(page - 1)}
            disabled={page === 1}
            className="px-3 py-1 rounded bg-gray-200 hover:bg-gray-300 disabled:opacity-50"
          >
            前へ
          </button>
          {Array.from({ length: totalPages }, (_, i) => i + 1).map(num => (
            <button
              key={num}
              onClick={() => handlePageChange(num)}
              className={`px-3 py-1 rounded ${num === page ? 'bg-green-600 text-white' : 'bg-gray-200 hover:bg-gray-300'}`}
            >
              {num}
            </button>
          ))}
          <button
            onClick={() => handlePageChange(page + 1)}
            disabled={page === totalPages}
            className="px-3 py-1 rounded bg-gray-200 hover:bg-gray-300 disabled:opacity-50"
          >
            次へ
          </button>
        </div>
      )}
    </main>
  );
} 