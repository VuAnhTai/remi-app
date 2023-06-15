export const extractVideoId = (url: string) => {
  let videoId = '';

  if (url.includes('youtube.com') || url.includes('youtu.be')) {
    const urlParts = url.split(/[/?=&]/);
    const idIndex = urlParts.findIndex(part => part === 'v');

    if (idIndex !== -1) {
      videoId = urlParts[idIndex + 1];
    } else {
      videoId = urlParts[urlParts.length - 1];
    }
  }

  return videoId;
};
