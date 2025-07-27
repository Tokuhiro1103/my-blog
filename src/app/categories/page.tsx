import Link from 'next/link';
import { getAllCategories } from '../../lib/posts';

export default async function CategoriesPage() {
  const categories = await getAllCategories();

  return (
    <main className="max-w-4xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-6">カテゴリ一覧</h1>
      <ul>
        {categories.map(category => (
          <li key={category} className="mb-2">
            <Link href={`/categories/${encodeURIComponent(category)}`} className="text-green-700 hover:underline">
              {category}
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