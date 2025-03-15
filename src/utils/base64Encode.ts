export const base64Encode = (str: string) => {
  return btoa(unescape(encodeURIComponent(str)));
};
