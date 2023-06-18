import { AuthProvider } from '@/packages/common/hooks/useAuth';
import PrivateLayout from '@/packages/layout/PrivateLayout';
import { getListSharedApi } from '@/rest/private/video';
import useSWR from 'swr';
import { ListShared } from '@/ListShared';
import { type Video } from '@/common/types';

export default function Home() {
  const { data: listItem, mutate } = useSWR<Video[]>(`/items`, () => {
    return getListSharedApi();
  });

  return (
    <AuthProvider>
      <PrivateLayout onSuccess={mutate}>
        <div className='container m-auto'>
          <ListShared data={listItem || []} />
        </div>
      </PrivateLayout>
    </AuthProvider>
  );
}
