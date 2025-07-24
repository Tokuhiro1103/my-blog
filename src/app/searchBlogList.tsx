"use client";
import Link from 'next/link';
import { useState, useMemo } from 'react';

interface Post {
  slug: string;
  meta: {
    title: string;
    date: string;
    category?: string;
    tags?: string[];
  };
  content: string;
}

interface SearchBlogListProps {
  posts: Post[];
  categories: string[];
  tags: string[];
}

export default function SearchBlogList({ posts, categories, tags }: SearchBlogListProps) {
  const [searchInput, setSearchInput] = useState('');
  const [search, setSearch] = useState('');

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

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchInput(e.target.value);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      setSearch(searchInput);
    }
  };

  const handleSearchClick = () => {
    setSearch(searchInput);
  };

  return (
    <main className="max-w-2xl mx-auto p-4">
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
      <div className="mb-6">
        <div className="flex items-center">
          <input
            type="text"
            value={searchInput}
            onChange={handleInputChange}
            onKeyDown={handleKeyDown}
            placeholder="記事を検索..."
            className="border px-3 py-2 rounded-l w-full focus:outline-none"
            aria-label="記事を検索"
          />
          <button
            onClick={handleSearchClick}
            className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-r flex items-center"
            aria-label="検索"
            tabIndex={0}
          >
            {/* SVG虫眼鏡アイコン */}
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-4.35-4.35m0 0A7.5 7.5 0 104.5 4.5a7.5 7.5 0 0012.15 12.15z" />
            </svg>
          </button>
        </div>
      </div>
      <ul>
        {search && filteredPosts.length === 0 ? (
          <li>該当する記事がありません。</li>
        ) : (
          filteredPosts.map((post: Post) => (
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
          ))
        )}
      </ul>
    </main>
  );
} 