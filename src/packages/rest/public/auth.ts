import { type LoginResponse, type UserLogin } from '@/packages/common/types/auth';
import { ACCESS_TOKEN_KEY, API_URI, USER_KEY } from '@/packages/env/constants';
import { LocalStorageUtils } from '@/common/utils';
import { RestApis } from '../apis';

export const loginApi = async (data: UserLogin): Promise<any> => {
  const { token, user } = (await RestApis.post<LoginResponse>(
    '/auth/login',
    data
  )) as unknown as LoginResponse;
  LocalStorageUtils.set(ACCESS_TOKEN_KEY, token);
  LocalStorageUtils.set(USER_KEY, JSON.stringify(user));
};

export const registerApi = async (data: UserLogin) => {
  const res = await RestApis.post(`${API_URI}/auth/register`, data);
  return res;
};
