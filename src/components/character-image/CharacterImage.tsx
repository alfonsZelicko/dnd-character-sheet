import { Box, Typography } from '@mui/material';
import React, { DragEvent } from 'react';
import { CharacterPictureAtom } from './atoms';
import { useAtom } from 'jotai';

export const CharacterImage = () => {
  const [imageBase64, setImageBase64] = useAtom(CharacterPictureAtom);

  const handleDrop = (event: DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    const file = event.dataTransfer.files[0];
    if (file && file.type.startsWith('image/')) {
      const reader = new FileReader();
      reader.onload = () => {
        setImageBase64(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <Box
      onDrop={handleDrop}
      onDragOver={(e) => {
        e.preventDefault();
      }}
      sx={{
        width: '100%',
        height: '380px',
        backgroundImage: imageBase64 ? `url(${imageBase64})` : 'none',
        backgroundSize: 'contain',
        backgroundPosition: 'center center',
        backgroundRepeat: 'no-repeat',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      {!imageBase64 && <Typography variant="body1">Drop character portrait here</Typography>}
    </Box>
  );
};
