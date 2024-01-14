import './PhotoUpload.scss';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import { Avatar } from '@mui/material';
import { ChangeEvent, useId, useRef } from 'react';

import uploadIcon from '../../assets/icons/upload-icon.svg';

interface Props {
  avatar: string;
  setAvatar: (avatar: string) => void;
  name: string;
  register: any;
  errors: any;
}

const PhotoUpload = ({ avatar, setAvatar, name, register, errors }: Props) => {
  const fileInputId = useId();
  const handleAvatarChange = (event: ChangeEvent<HTMLInputElement>) => {
    setAvatar(
      event.target.files instanceof FileList ? URL.createObjectURL(event.target.files[0]) : ''
    );
  };

  const inputRef = useRef<HTMLInputElement | null>(null);
  const { ref } = register(name);
  const handleRemoveAvatar = () => {
    if (inputRef.current !== null) {
      inputRef.current.value = '';
    }
    setAvatar('');
  };


  return (
    <div className="photoUpload">
      <Avatar src={avatar} sx={{ width: 150, height: 150 }} />
      <div className="photoUploadContent">
        <p>
          JPEG, TIFF, PNG, BMP or
          <br />
          GIF format.
          <br />
          Max size - 2 MB
        </p>
        <div className="photoUploadButton">
          <input
            className="photoUploadInput"
            {...register(name)}
            ref={e => {
              ref(e);
              inputRef.current = e;
            }}
            type="file"
            id={fileInputId}
            onChange={handleAvatarChange}
            accept="image/jpeg, image/jpg, image/png, image/bmp, image/gif, image/tiff"
          />

          <div className="photoUploadTriggers">
            <div className="photoUploadTrigger">
              <img src={uploadIcon} alt="upload" />
              <label className="underlined" htmlFor={fileInputId}>Upload file</label>
            </div>
            {
              avatar &&
              <div className="photoUploadTrigger">
                <HighlightOffIcon />
                <p className="underlined" onClick={handleRemoveAvatar}>Remove file</p>
              </div>
            }
          </div>
        </div>
      </div>
      <div className="photoUploadErrors">{errors.photo && errors.photo.message}</div>
    </div>
  );
};

export default PhotoUpload;
