import { AuthProvider } from '@/packages/common/hooks/useAuth';
import PrivateLayout from '@/packages/layout/PrivateLayout';
import { getListSharedApi } from '@/rest/private/video';
import { useForm } from 'react-hook-form';
import useSWR from 'swr';
import { useToast } from '@/common/hooks/useToast';
import { ListShared } from '@/ListShared';
import { Video } from '@/common/types';

export default function Home() {
  const { toastError } = useToast();
  const { data: listItem } = useSWR<Video[]>(`/items`, () => {
    return getListSharedApi();
  });

  return (
    <AuthProvider>
      <PrivateLayout>
        <div className='container m-auto'>{/* <ListShared data={listItem || []} /> */}</div>
      </PrivateLayout>
    </AuthProvider>
  );
}
