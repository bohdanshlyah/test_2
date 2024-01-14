export const addPrefixToPhotoBase64 = (photo: string): string => {
  return 'data:image/jpeg;base64,' + photo;
};
