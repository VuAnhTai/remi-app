import { API_URI } from '@/packages/env/constants';
import { RestApis } from '../apis';
import { Video } from '@/common/types';

export const getListSharedApi = async (): Promise<Video[]> => {
  return RestApis.get(`${API_URI}/list-shared`);
};

export const shareApi = async (data: Video): Promise<Video> => {
  return RestApis.post(`${API_URI}/share`, data);
};
