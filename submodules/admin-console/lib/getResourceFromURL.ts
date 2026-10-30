export const getResourceFromURL = (url: string) => {
  const parsedURL = new URL(url);
  return parsedURL.pathname.split('/')[3];
};
