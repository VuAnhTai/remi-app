import { useEffect, useMemo } from 'react';
import createSocket from '../utils/socket';
import { LocalStorageUtils } from '../utils';
import { ACCESS_TOKEN_KEY } from '@/env/constants';
import { EVENT_SOCKET, type EventValues } from '../constants';
import { type Video } from '../types';
import { useToast } from './useToast';
import { useProfile } from '@/auth/useProfile';

type Socket = {
  on?: (event: EventValues, data: any) => void;
};

export const useSocket = ({ on }: Socket) => {
  const { toastInfo } = useToast();
  const { email } = useProfile();
  const token = useMemo(() => LocalStorageUtils.get(ACCESS_TOKEN_KEY), []);
  useEffect(() => {
    const socket = createSocket(token as string);
    socket.on('connect', () => {
      console.log('connected');
    });

    // Add event listeners or perform socket operations here
    socket.on(EVENT_SOCKET.NOTIFICATION, (data: Video) => {
      if (data.user.email === email) {
        return;
      }

      on?.(EVENT_SOCKET.NOTIFICATION, data);

      toastInfo(
        <div>
          <div>{data.user.email} shared a video</div>
          <div>{data.title}</div>
        </div>
      );
    });

    return () => {
      socket.disconnect();
    };
  }, [email, on, toastInfo, token]);
};
