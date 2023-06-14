import classNames from 'classnames';
import React from 'react';

type Props = {
  text: string;
  className?: string;
  handleLink: () => void;
};

export const Button = ({ text, className, handleLink }: Props) => {
  return (
    <button
      className={classNames(
        'bg-white inline-flex items-center justify-center p-2 rounded-md text-gray-800 hover:text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white min-w-[100px]',
        className
      )}
      onClick={handleLink}>
      {text}
    </button>
  );
};
