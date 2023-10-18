import Image from 'next/image';
import avatar from 'app/avatar.png';
import timelySvg from 'public/images/timely.svg';
import Text from './components/text';

// Pics of me..
import inCanada from 'public/images/frontpage/in-canada.jpg';
import rideHoses from 'public/images/frontpage/ride-horses.jpg';
import exploreStuff from 'public/images/frontpage/explore-stuff.jpg';
import talkOnTheFruit from 'public/images/frontpage/talk-on-the-fruit.jpg';
import indyTime from 'public/images/frontpage/d-o-double-g.jpg';
import teddyTime from 'public/images/frontpage/d-o-double-gg.jpg';

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

export default async function Page() {
  return (
    <section>
      <Text.H size="1">👋 Hi, I'm Timm</Text.H>
      <Text.Prose>
        <Text.Lead>
          I've been passionately building apps, services and websites across desktop & mobile
          devices since 1997.
        </Text.Lead>
        <Text.P>
          For the past {new Date().getFullYear() - 2016} years, I've been wearing a multitude of
          hats at{' '}
          <Text.BoldA href="https://www.timelyapp.com">
            <Image src={timelySvg} alt="Timely" height={12} /> Timely
          </Text.BoldA>
          , the time tracker for people that hate and/or suck at time tracking.
        </Text.P>
      </Text.Prose>
      <br />
      <Text.H size="2">Several photos of me exist</Text.H>
      <div className="columns-2 sm:columns-3 gap-4 my-8 mt-4">
        <div className="relative h-40 mb-4">
          <Image
            alt="todo"
            src={indyTime}
            fill
            sizes="(max-width: 768px) 213px, 33vw"
            priority
            className="rounded-lg object-cover"
          />
        </div>
        <div className="relative h-80 mb-4 sm:mb-0">
          <Image
            alt="Explore stuff"
            src={exploreStuff}
            fill
            sizes="(max-width: 768px) 213px, 33vw"
            priority
            className="rounded-lg object-cover object-[-16px] sm:object-center"
          />
        </div>
        <div className="relative h-40 sm:h-80 sm:mb-4">
          <Image
            alt="todo"
            src={talkOnTheFruit}
            fill
            sizes="(max-width: 768px) 213px, 33vw"
            priority
            className="rounded-lg object-cover object-top sm:object-center"
          />
        </div>
        <div className="relative h-40 mb-4 sm:mb-0">
          <Image
            alt="Ride hoses"
            src={rideHoses}
            fill
            sizes="(max-width: 768px) 213px, 33vw"
            priority
            className="rounded-lg object-cover"
          />
        </div>
        <div className="relative h-40 mb-4">
          <Image
            alt="todo"
            src={teddyTime}
            fill
            sizes="(max-width: 768px) 213px, 33vw"
            priority
            className="rounded-lg object-cover"
          />
        </div>
        <div className="relative h-80">
          <Image
            alt="Exist in nature"
            src={inCanada}
            fill
            sizes="(min-width: 768px) 213px, 33vw"
            priority
            className="rounded-lg object-cover"
          />
        </div>
      </div>
      <Text.H size="2">I know some things</Text.H>
      <Text.P className="mb-8">
        I've spent {new Date().getFullYear() - 2001}+ years in the business, and picked up a thing
        or two along the way...
      </Text.P>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 mb-8">
        <div>
          <Text.H size="3">🧭 Leadership</Text.H>
          <Text.P>
            I thrive when leading and mentoring individuals and teams towards a worthy goal. Just
            don't call me a manager.
          </Text.P>
        </div>
        <div>
          <Text.H size="3">📢 Communication</Text.H>
          <Text.P>
            I'm a strong communicator, and love to share knowledge, experiences, and wisdom with
            others.
          </Text.P>
        </div>
        <div>
          <Text.H size="3">💡 Concept Creation</Text.H>
          <Text.P>
            From a napkin drawings to interactive mockups. I work efficiently through the idea,
            concept, and prototyping stages.
          </Text.P>
        </div>
        <div>
          <Text.H size="3">🧑‍🎨 UX & Design</Text.H>
          <Text.P>
            Designing exceptional user experiences and interfaces is my jam. Web is my preferred
            interface.
          </Text.P>
        </div>
        <div>
          <Text.H size="3">💻 Frontend</Text.H>
          <Text.P>
            Bringing ideas to life is where I spend most of my time. I'm fluent in everything web &
            client-side.
          </Text.P>
        </div>
        <div>
          <Text.H size="3">⚙️ Backend</Text.H>
          <Text.P>
            Across multiple stacks, I've built and maintained a wide range of backend services.
          </Text.P>
        </div>
      </div>
      <div className="mb-8">
        <span className="font-bold mr-1">TLDR:</span>
        I've gone by many, many titles.{' '}
        <Text.A external href="https://merki.ca/blog/what-is-a-wildcard-person">
          Wildcard person
        </Text.A>
        is my natural state.
      </div>
      <Text.Prose className="mb-8">
        <Text.H size="2">Philosophy & Mission</Text.H>

        <Text.P>
          I try to keep it simple: Do whatever the 🤬 you want, so long as it doesn't hurt anyone
          else.
        </Text.P>
        <Text.P>
          My goal is to have been a net-positive for planet earth by the time I travel on.
        </Text.P>
      </Text.Prose>

      <Text.H size="2">Find me places</Text.H>
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
        <li>
          <Text.A external href="http://www.reddit.com/u/t1mmen">
            reddit
          </Text.A>
        </li>
      </ul>
    </section>
  );
}
