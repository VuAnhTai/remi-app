import { API_URI } from '@/packages/env/constants';
import { RestApis } from '../apis';
import { type Video, type VideoForm } from '@/common/types';

export const getListSharedApi = async (): Promise<Video[]> => {
  return RestApis.get(`${API_URI}/shared-urls`);
};

export const shareApi = async (data: VideoForm): Promise<Video> => {
  return RestApis.post(`${API_URI}/shared-urls`, data);
};
