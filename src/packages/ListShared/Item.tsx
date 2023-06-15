import { Icon } from '@/common/headless/Icon';
import { VideoPlayer } from '@/common/headless/VideoPlayer';
import { Video } from '@/common/types';
import React from 'react';

type Props = {
  data: Video;
};
export const Item = ({ data }: Props) => {
  return (
    <div className='grid grid-cols-1 lg:grid-cols-2 my-4 shadow-xl'>
      <div className=' text-center w-full h-[200px]'>
        <VideoPlayer url={data.url} />
      </div>
      <div className='p-3 lg:py-0'>
        <h1 className='text-xl font-semibold'>{data.title}</h1>
        <p>
          Shared By: <b>{data.user.email}</b>
        </p>
        <div className='flex gap-3'>
          <div className='flex gap-1'>
            90 <Icon name='thumbs-up' size={20} />
          </div>
          <div className='flex gap-1'>
            10 <Icon name='thumbs-down' size={20} />
          </div>
        </div>
        <p>Description:</p>
        <p className=' text-sm text-gray-500'>{data.description}</p>
      </div>
    </div>
  );
};
