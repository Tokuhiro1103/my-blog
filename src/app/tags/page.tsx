import Link from 'next/link';
import { getAllTags } from '../../lib/posts';

export default async function TagsPage() {
  const tags = await getAllTags();

  return (
    <main className="max-w-4xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-6">タグ一覧</h1>
      <ul>
        {tags.map(tag => (
          <li key={tag} className="mb-2">
            <Link href={`/tags/${encodeURIComponent(tag)}`} className="text-blue-700 hover:underline">
              {tag}
            </Link>
          </li>
        ))}
      </ul>
      <div className="mt-8">
        <Link href="/" className="text-blue-600 hover:underline">← トップに戻る</Link>
      </div>
    </main>
  );
} 