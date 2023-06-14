import { Video } from '@/common/types';
import React from 'react';

type Props = {
  data: Video[];
};

const renderer = ({
  hours,
  minutes,
  seconds,
  completed,
}: {
  hours: number;
  minutes: number;
  seconds: number;
  completed: boolean;
}) => {
  if (completed) {
    // Render a completed state
    return <span>Completed</span>;
  } else {
    // Render a countdown
    return (
      <span>
        {hours}:{minutes}:{seconds}
      </span>
    );
  }
};

export const ListShared = ({ data }: Props) => {
  return (
    <table className='table-auto w-full'>
      <thead>
        <tr className='bg-gray-200'>
          <th className='px-4 py-2 text-left'>Name</th>
          <th className='px-4 py-2 text-left'>Current Price</th>
          <th className='px-4 py-2 text-left'>Duration</th>
          <th className='px-4 py-2 text-left'>Action</th>
        </tr>
      </thead>
      <tbody>
        {data.length ? (
          data.map((item, index) => {
            return (
              <tr className='border-b' key={index}>
                <td className='px-4 py-2'>{item.videoUrl}</td>
                <td className='px-4 py-2'>{item.title}</td>
                <td className='px-4 py-2'>{item.description}</td>
                <td className='px-4 py-2'>{item.user.email}</td>
              </tr>
            );
          })
        ) : (
          <tr>
            <td colSpan={4} className='text-center'>
              No data
            </td>
          </tr>
        )}
      </tbody>
    </table>
  );
};
