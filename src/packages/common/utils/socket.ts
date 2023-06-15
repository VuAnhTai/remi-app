import { API_URI, SOCKET_URI } from '@/env/constants';
import io from 'socket.io-client';
const createSocket = (token: string) => {
  const socket = io(API_URI, {
    auth: {
      token: token,
    },
  });

  return socket;
};

export default createSocket;
