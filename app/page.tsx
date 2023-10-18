import Image from 'next/image';
import avatar from 'app/avatar.png';
import timelySvg from 'public/images/timely.svg';

import { Suspense } from 'react';
import Text from './components/text';

function Badge(props) {
  return (
    <a
      {...props}
      target="_blank"
      className="border border-neutral-200 dark:border-neutral-700 bg-neutral-50 dark:bg-neutral-800 rounded p-1 text-sm inline-flex items-center leading-4 text-neutral-900 dark:text-neutral-100 no-underline gap-1"
    />
  );
}

function ArrowIcon() {
  return (
    <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M2.07102 11.3494L0.963068 10.2415L9.2017 1.98864H2.83807L2.85227 0.454545H11.8438V9.46023H10.2955L10.3097 3.09659L2.07102 11.3494Z"
        fill="currentColor"
      />
    </svg>
  );
}

async function BlogLink({ slug, name }) {
  return (
    <a
      href={`/blog/${slug}`}
      className="border border-neutral-200 dark:border-neutral-700 bg-neutral-50 dark:bg-neutral-800 rounded flex items-center justify-between px-3 py-4 w-full hover:bg-sky-400 hover:border-sky-600 hover:bg-opacity-10 transition-all"
    >
      <div className="flex flex-col">
        <p className="font-bold text-neutral-900 dark:text-neutral-100">{name}</p>
      </div>
      <div className="text-neutral-700 dark:text-neutral-300">
        <ArrowIcon />
      </div>
    </a>
  );
}

export default async function Page() {
  return (
    <section>
      <Text.H size="1">Hi, I'm Timm 👋</Text.H>
      <Text.Prose>
        <Text.Lead>
          I've been passionately building websites, services and apps for web & mobile devices since
          1997.
        </Text.Lead>
        <Text.P>
          For the past 7 years, I've been wearing a multitude of hats at{' '}
          <Badge href="https://www.timelyapp.com">
            <Image src={timelySvg} alt="Timely" height={12} /> Timely
          </Badge>
          , the time tracker for people that hate and/or suck at time tracking.
        </Text.P>
      </Text.Prose>
      <div className="columns-2 sm:columns-3 gap-4 my-8">
        <div className="relative h-40 mb-4">
          <Image
            alt="todo"
            src={avatar}
            fill
            sizes="(max-width: 768px) 213px, 33vw"
            priority
            className="rounded-lg object-cover"
          />
        </div>
        <div className="relative h-80 mb-4 sm:mb-0">
          <Image
            alt="todo"
            src={avatar}
            fill
            sizes="(max-width: 768px) 213px, 33vw"
            priority
            className="rounded-lg object-cover object-[-16px] sm:object-center"
          />
        </div>
        <div className="relative h-40 sm:h-80 sm:mb-4">
          <Image
            alt="todo"
            src={avatar}
            fill
            sizes="(max-width: 768px) 213px, 33vw"
            priority
            className="rounded-lg object-cover object-top sm:object-center"
          />
        </div>
        <div className="relative h-40 mb-4 sm:mb-0">
          <Image
            alt="todo"
            src={avatar}
            fill
            sizes="(max-width: 768px) 213px, 33vw"
            priority
            className="rounded-lg object-cover"
          />
        </div>
        <div className="relative h-40 mb-4">
          <Image
            alt="todo"
            src={avatar}
            fill
            sizes="(max-width: 768px) 213px, 33vw"
            priority
            className="rounded-lg object-cover"
          />
        </div>
        <div className="relative h-80">
          <Image
            alt="todo"
            src={avatar}
            fill
            sizes="(min-width: 768px) 213px, 33vw"
            priority
            className="rounded-lg object-cover"
          />
        </div>
      </div>
      <Text.H size="2">I know some things</Text.H>
      <Text.P>
        I've been {new Date().getFullYear() - 2001}+ years in the business, so the toolbox is pretty
        stacked...
      </Text.P>

      <div className="grid grid-cols-1 gap-2 sm:grid-cols-2 mb-8">
        <div>
          <Text.H size="3">🧭 Leader</Text.H>
          <Text.P>
            I thrive when leading and mentoring individuals and teams. Just don't call me a manager.
          </Text.P>
        </div>
        <div>
          <Text.H size="3">📢 Communicator</Text.H>
          <Text.P>
            I'm a strong communicator and love to share my knowledge and experience with others.
          </Text.P>
        </div>
        <div>
          <Text.H size="3">💡 Concepts</Text.H>
          <Text.P>
            From a napkin drawings to interactive mockups, I work efficiently in the idea, concept,
            and prototyping stages.
          </Text.P>
        </div>
        <div>
          <Text.H size="3">🧑‍🎨 UX & Design</Text.H>
          <Text.P>
            I love designing exceptional user experiences and interfaces. Web is my preferred
            interface.
          </Text.P>
        </div>
        <div>
          <Text.H size="3">💻 Frontend</Text.H>
          <Text.P>
            Bringing ideas to life is my favorite. I'm fluent in everything web & client-side.
          </Text.P>
        </div>
        <div>
          <Text.H size="3">⚙️ Backend</Text.H>
          <Text.P>
            Across multiple stacks, I've built and maintained a wide range of backend services.
          </Text.P>
        </div>
      </div>
      <Text.H size="3">Recent writings include...</Text.H>
      <div className="my-4 mb-8 flex flex-col w-full">
        <BlogLink name="Hello World" slug="hello-world" />
      </div>

      <Text.H size="3">Find me places...</Text.H>
      <ul className="flex flex-col md:flex-row space-x-0 md:space-x-4 space-y-2 md:space-y-0 font-sm text-neutral-600 dark:text-neutral-300">
        <li>
          <Text.A external href="mailto:timm@stokke.me?subject=Hi Timm!">
            email me
          </Text.A>
        </li>
        <li>
          <Text.A external href="http://www.linkedin.com/in/timmstokke">
            linkedin
          </Text.A>
        </li>
        <li>
          <Text.A external href="http://www.github.com/t1mmen">
            github
          </Text.A>
        </li>
      </ul>
    </section>
  );
}
