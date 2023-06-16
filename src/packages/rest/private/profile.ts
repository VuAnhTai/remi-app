import { Profile } from '@/common/types';
import { RestApiConfig, RestApis } from '@/rest/apis';

const get = (config?: RestApiConfig) => {
  return RestApis.get<Profile>('/users/me', config);
};

const put = (payload: Profile) => {
  return RestApis.put<Profile>('/users/me', payload);
};

export const ProfileApis = { get, put };
