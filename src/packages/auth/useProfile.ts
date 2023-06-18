import React, { useEffect } from 'react';
import { LocalStorageUtils } from '@/common/utils';
import { USER_KEY } from '@/env/constants';
import type { Profile } from '@/common/types';

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
