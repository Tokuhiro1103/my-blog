import { notFound } from 'next/navigation';
import { getPostBySlug, getPostSlugs } from '../../../lib/posts';
import { remark } from 'remark';
import html from 'remark-html';

type Props = {
  params: { slug: string }
};

export async function generateStaticParams() {
  const slugs = await getPostSlugs();
  return slugs.map(slug => ({ slug: slug.replace(/\.md$/, '') }));
}

export default async function PostPage({ params }: Props) {
  const { slug } = await params;
  const post = await getPostBySlug(slug);

  if (!post) {
    notFound();
  }

  const processedContent = await remark().use(html).process(post.content);
  const contentHtml = processedContent.toString();

  return (
    <main className="max-w-4xl mx-auto p-4">
      {/* トップ画像 */}
      {(post.meta.topImage || post.meta.image) && (
        <div className="mb-6">
          <img 
            src={post.meta.topImage || post.meta.image} 
            alt={`${post.meta.title}のトップ画像`}
            className="w-full h-64 object-cover"
          />
        </div>
      )}
      
      <h1 className="text-2xl font-bold mb-2">{post.meta.title}</h1>
      
      <div className="text-gray-500 text-sm mb-6">{post.meta.date}</div>
      {post.meta.category && (
        <div className="inline-block bg-green-100 text-green-800 text-xs px-2 py-1 rounded mb-6 ml-1">
          {post.meta.category}
        </div>
      )}
      <article 
        className="prose prose-lg max-w-none"
        dangerouslySetInnerHTML={{ __html: contentHtml }} 
        id="article-content"
      />

      {Array.isArray(post.meta.tags) && post.meta.tags.length > 0 && (
        <div className="mt-20">
          <span className="font-semibold mr-2">タグ:</span>
          {post.meta.tags.map((tag: string) => (
            <a key={tag} href={`/tags/${encodeURIComponent(tag)}`} className="inline-block bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded mr-2 mb-1 hover:bg-blue-200">
              {tag}
            </a>
          ))}
        </div>
      )}
      <div className="mt-8">
        <a href="/" className="text-blue-600 hover:underline">← 一覧に戻る</a>
      </div>
    </main>
  );
}