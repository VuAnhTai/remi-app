import { useServerSidePropsContext } from '@/ssr/ServerSidePropsContext';
import React, { useEffect } from 'react';
import useSWR from 'swr';
import { ProfileApis } from '@/rest/private/profile';
import { Profile } from '@/common/types';
import { LocalStorageUtils } from '@/common/utils';
import { USER_KEY } from '@/env/constants';

export function useProfile() {
  const [profile, setProfile] = React.useState<Profile>({
    email: '',
  });
  useEffect(() => {
    const user = LocalStorageUtils.get(USER_KEY) as string | null;
    if (user) {
      setProfile(JSON.parse(user));
    }
  }, []);

  return profile;
}
