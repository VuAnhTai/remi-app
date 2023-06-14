import { LoginResponse, UserLogin } from '@/packages/common/types/auth';
import { ACCESS_TOKEN_KEY, API_URI, USER_KEY } from '@/packages/env/constants';
import { RestApis } from '../apis';
import { CookiesUtils } from '@/common/utils/cookies';
import { LocalStorageUtils } from '@/common/utils';

export const loginApi = async (data: UserLogin): Promise<any> => {
  try {
    const { token, user } = await RestApis.post<LoginResponse>('/auth/login', data);
    LocalStorageUtils.set(ACCESS_TOKEN_KEY, token);
    LocalStorageUtils.set(USER_KEY, JSON.stringify(user));
  } catch (e) {
    console.log('User login error:', e);
    return null;
  }
};

export const registerApi = async (data: UserLogin) => {
  try {
    const res = await RestApis.post(`${API_URI}/auth/register`, data);
    return res;
  } catch (e) {
    console.log('User regiester error:', e);
    return null;
  }
};
