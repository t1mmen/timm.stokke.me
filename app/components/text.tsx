import clsx from 'clsx';
import React from 'react';
import { HTMLAttributes } from 'react';

function ArrowIcon(props) {
  return (
    <svg
      width="12"
      height="12"
      viewBox="0 0 12 12"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M2.07102 11.3494L0.963068 10.2415L9.2017 1.98864H2.83807L2.85227 0.454545H11.8438V9.46023H10.2955L10.3097 3.09659L2.07102 11.3494Z"
        fill="currentColor"
      />
    </svg>
  );
}

const Prose = props => {
  const className = clsx('rose prose-neutral dark:prose-invert', props.className);
  return <div {...props} className={className} />;
};

const P = props => {
  const className = clsx('mb-4', props.className);
  return <p {...props} className={className} />;
};

const Lead = props => {
  const className = clsx('font-bold text-lg mb-4', props.className);
  return <p {...props} className={className} />;
};

const A = ({ children, external = true, ...rest }) => {
  const className = clsx(
    'flex items-center hover:text-neutral-800 dark:hover:text-neutral-100 transition-all',
    rest.className
  );
  const attrs = external ? { rel: 'noopener noreferrer', target: '_blank' } : ``;
  return (
    <a {...attrs} {...rest} className={className}>
      {!!external && <ArrowIcon className="mr-2" />}
      {children}
    </a>
  );
};

function BoldA({ external = true, ...rest }) {
  const attrs = external ? { rel: 'noopener noreferrer', target: '_blank' } : ``;
  return (
    <a
      {...attrs}
      {...rest}
      className="border border-neutral-200 dark:border-neutral-700 bg-neutral-50 dark:bg-neutral-800 rounded p-1 text-sm inline-flex items-center leading-4 text-neutral-900 dark:text-neutral-100 no-underline gap-1 hover:bg-sky-400 hover:border-sky-600 hover:bg-opacity-10 transition-all"
    />
  );
}

type HProps = HTMLAttributes<HTMLElement> & {
  size: '1' | '2' | '3' | '4' | '5' | '6';
};

const H = (props: HProps) => {
  const Component = {
    1: 'h1',
    2: 'h2',
    3: 'h3',
    4: 'h4',
    5: 'h5',
    6: 'h6',
  }[props.size || 3];

  const textSizeVariation = {
    1: 'text-3xl mb-6',
    2: 'text-2xl mb-4',
    3: 'text-xl mb-2',
    4: 'text-base mn-2',
    5: 'text-sm mb-1',
    6: 'text-xs mb-1',
  }[props.size || 3];

  const className = clsx(
    'font-bold tracking-tighter max-w-[650px]',
    textSizeVariation,
    props.className
  );

  return React.createElement(Component, { ...props, className });
};

const Text = {
  Prose,
  Lead,
  A,
  BoldA,
  P,
  H,
};

export default Text;
