import { type Video } from '@/common/types';
import React from 'react';
import { Item } from './Item';

type Props = {
  data: Video[];
};

export const ListShared = ({ data }: Props) => {
  return (
    <>
      {data.length ? (
        data.map((item, index) => {
          return <Item key={index} data={item} />;
        })
      ) : (
        <div className='text-center' data-testid='no-data'>
          No data
        </div>
      )}
    </>
  );
};
