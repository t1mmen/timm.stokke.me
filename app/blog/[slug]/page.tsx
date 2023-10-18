import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { Mdx } from 'app/components/mdx';
import { allBlogs } from 'contentlayer/generated';
import Balancer from 'react-wrap-balancer';
import { formatDate, formatRelativeDate } from 'app/utils/datetime';
import Comments from 'app/components/comments';
import Text from 'app/components/text';

export async function generateMetadata({ params }): Promise<Metadata | undefined> {
  const post = allBlogs.find(post => post.slug === params.slug);
  if (!post) {
    return;
  }

  const { title, publishedAt: publishedTime, summary: description, image, slug } = post;
  const ogImage = image
    ? `https://timm.stokke.me${image}`
    : `https://timm.stokke.me/og?title=${title}`;

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      type: 'article',
      publishedTime,
      url: `https://timm.stokke.me/blog/${slug}`,
      images: [
        {
          url: ogImage,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [ogImage],
    },
  };
}

export default async function Blog({ params }) {
  const post = allBlogs.find(post => post.slug === params.slug);

  if (!post) {
    notFound();
  }

  return (
    <section>
      <script
        type="application/ld+json"
        suppressHydrationWarning
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(post.structuredData),
        }}
      ></script>
      <Text.H size="1" className="mb-0">
        <Balancer>{post.title}</Balancer>
      </Text.H>
      <div className="flex justify-between items-center mt-2 mb-8 text-sm max-w-[650px]">
        <p className="text-sm text-neutral-600 dark:text-neutral-400">
          {formatDate(post.publishedAt)} ({formatRelativeDate(post.publishedAt)})
        </p>
      </div>
      <Mdx code={post.body.code} />
      <Comments />
    </section>
  );
}
