import { LoginResponse, UserLogin } from '@/packages/common/types/auth';
import { ACCESS_TOKEN_KEY, API_URI, USER_KEY } from '@/packages/env/constants';
import { RestApis } from '../apis';
import { CookiesUtils } from '@/common/utils/cookies';
import { LocalStorageUtils } from '@/common/utils';

export const loginApi = async (data: UserLogin): Promise<any> => {
  const { token, user } = await RestApis.post<LoginResponse>('/auth/login', data);
  LocalStorageUtils.set(ACCESS_TOKEN_KEY, token);
  LocalStorageUtils.set(USER_KEY, JSON.stringify(user));
};

export const registerApi = async (data: UserLogin) => {
  const res = await RestApis.post(`${API_URI}/auth/register`, data);
  return res;
};
