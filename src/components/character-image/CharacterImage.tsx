import { Box, SxProps, Theme, Typography } from '@mui/material';
import React, { DragEvent, useRef } from 'react';
import { CharacterPictureAtom } from './atoms';
import { useAtom } from 'jotai';
import imageMask from '../../assets/character-image-mask.png';

const MAX_SIZE = 1 * 1024 * 1024; // 1 MB

const fileCheck = (file: File | undefined) => !file || !file.type.startsWith('image/') || file.size > MAX_SIZE;

export const CharacterImage = ({applyMask = true}) => {
  const [imageBase64, setImageBase64] = useAtom(CharacterPictureAtom);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleDrop = (event: DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    const file = event.dataTransfer.files[0];
    if (fileCheck(file)) return;
  
    const reader = new FileReader();
    reader.onload = () => setImageBase64(reader.result as string);
    reader.readAsDataURL(file);
  };
  
  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (fileCheck(file)) return;
  
    const reader = new FileReader();
    reader.onload = () => setImageBase64(reader.result as string);
    reader.readAsDataURL(file!);
  };

  const handleClick = () => {
    fileInputRef.current?.click();
  };

  const imageStyle = {
    width: '100%',
    height: '380px',
    backgroundSize: 'cover',
    backgroundPosition: 'center center',
    backgroundRepeat: 'no-repeat',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    ...(applyMask
      ? {
          maskRepeat: 'no-repeat',
          WebkitMaskRepeat: 'no-repeat',
          maskSize: '100% 100%',
          WebkitMaskSize: '100% 100%',
          maskImage: `url(${imageMask})`,
          WebkitMaskImage: `url(${imageMask})`,
        }
      : {}),
    backgroundImage: imageBase64 ? `url(${imageBase64})` : 'none',
  }

  return (
    <Box
      onDrop={handleDrop}
      onDragOver={(e) => {
        e.preventDefault();
      }}
      sx={imageStyle}
    >
      {!imageBase64 && (
        <>
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            style={{ display: 'none' }}
            onChange={handleFileChange}
          />
          <Typography
            variant="body1"
            onClick={handleClick}
            sx={{
              cursor: 'pointer',
              '&:hover': { textDecoration: 'underline' },
            }}
          >
            Drop character portrait here
          </Typography>
        </>
      )}
    </Box>
  );
};
