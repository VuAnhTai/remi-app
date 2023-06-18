import { type Profile } from '@/common/types';
import { type RestApiConfig, RestApis } from '@/rest/apis';

const get = (config?: RestApiConfig) => {
  return RestApis.get<Profile>('/users/me', config);
};

const put = (payload: Profile) => {
  return RestApis.put<Profile>('/users/me', payload);
};

export const ProfileApis = { get, put };
