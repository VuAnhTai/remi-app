export const EVENT_SOCKET = {
  NOTIFICATION: 'notification',
  SHARED_VIDEO: 'shared_video',
};

export type EventKeys = keyof typeof EVENT_SOCKET;
export type EventValues = (typeof EVENT_SOCKET)[EventKeys];
