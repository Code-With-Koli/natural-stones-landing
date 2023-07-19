import exp from 'constants';
import React from 'react';

type Props = {};

const Footer = (props: Props) => {
  return (
    <footer className='w-full flex justify-center items-center gap-1 bg-gray-100 h-8 py-2'>
      <p>
        copyright{' '}
        <a
          href='https://codewithkoli.com'
          className='no-underline text-blue-700 hover:to-blue-900'
        >
          cwk
        </a>{' '}
        {new Date().getFullYear()}
      </p>
    </footer>
  );
};

export default Footer;
