import type { Metadata } from 'next';
import Link from 'next/link';
import { allBlogs } from 'contentlayer/generated';
import Text from 'app/components/text';
import { BlogItem } from 'app/components/blogItem';

export const metadata: Metadata = {
  title: 'Blog',
  description: 'Read my thoughts on software development, design, and more.',
};

export default async function BlogPage() {
  return (
    <section>
      <Text.H size="1">I wrote some words</Text.H>
      <div className="max-w-screen-sm mb-8"></div>
      <div className="grid gap-4 lg:grid-cols-2">
        {allBlogs
          .sort((a, b) => {
            if (new Date(a.publishedAt) > new Date(b.publishedAt)) {
              return -1;
            }
            return 1;
          })
          .map((post, idx) => (
            <BlogItem key={idx} post={post} />
          ))}
      </div>
    </section>
  );
}
