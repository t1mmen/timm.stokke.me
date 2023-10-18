import { formatDate } from 'app/utils/datetime';
import { ArrowRight } from './icons';
import Text from './text';
import { type Blog } from 'contentlayer/generated';

type Props = {
  post: Blog;
};

export const BlogItem = ({ post }: Props) => {
  return (
    <div className="grid gap-4 lg:grid-cols-2">
      <article className="p-6 bg-white rounded-lg border border-gray-200 shadow-md dark:bg-gray-800 dark:border-gray-700">
        <Text.H size="3">{post.title}</Text.H>
        <Text.P className="text-gray-500 dark:text-gray-400">{post.summary}</Text.P>
        <div className="flex justify-between items-center">
          <span className="text-sm">{formatDate(post.publishedAt)}</span>
          <Text.A external={false} href={`/blog/${post.slug}`}>
            Read
            <ArrowRight />
          </Text.A>
        </div>
      </article>
    </div>
  );
};
