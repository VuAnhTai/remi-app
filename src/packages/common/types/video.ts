export type Video = {
  id: string;
  title: string;
  description: string;
  url: string;
  user: {
    email: string;
  };
};
export type VideoForm = {
  title: string;
  description: string;
  url: string;
};
