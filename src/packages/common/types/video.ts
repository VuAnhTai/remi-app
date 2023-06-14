export type Video = {
  id: string;
  title: string;
  description: string;
  thumbnail: string;
  videoUrl: string;
  createdAt: string;
  updatedAt: string;
  user: {
    id: string;
    email: string;
  };
};
