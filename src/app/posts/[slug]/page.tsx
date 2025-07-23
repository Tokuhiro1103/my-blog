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
    <main className="max-w-2xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-2">{post.meta.title}</h1>
      <div className="text-gray-500 text-sm mb-6">{post.meta.date}</div>
      <article dangerouslySetInnerHTML={{ __html: contentHtml }} />
      <div className="mt-8">
        <a href="/" className="text-blue-600 hover:underline">← 一覧に戻る</a>
      </div>
    </main>
  );
}