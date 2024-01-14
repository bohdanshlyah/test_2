const preparePhotoDataUrl = async (photo: File, avatar: string) => {
  let dataURL = '';
  const img = document.createElement('img');
  img.setAttribute('src', avatar);
  await new Promise(resolve => {
    img.onload = resolve;
  });
  const canvas = document.createElement('canvas');
  canvas.width = img.width;
  canvas.height = img.height;
  const ctx = canvas.getContext('2d');
  ctx?.drawImage(img, 0, 0);
  dataURL = canvas.toDataURL(photo.type);
  return [dataURL.split(',')[0], dataURL.split(',')[1]];
};

export default preparePhotoDataUrl;
