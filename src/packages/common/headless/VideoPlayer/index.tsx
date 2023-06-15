import classNames from 'classnames';
import React from 'react';
import { extractVideoId } from '@/common/utils';
import YouTube from 'react-youtube';

type Props = {
  url: string;
  opts?: any;
};

export const VideoPlayer = ({ url, opts }: Props) => {
  const defaultOpts = {
    width: '100%',
    height: '100%',
    playerVars: {
      showinfo: 0,
      autoplay: 0,
    },
  };
  const videoId = extractVideoId(url);

  return <YouTube className='w-full h-full' videoId={videoId} opts={{ ...defaultOpts, opts }} />;
};
