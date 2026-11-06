import type { SxProps, Theme } from '@mui/material';
import { Box, Typography } from '@mui/material';
import { useAtom, useAtomValue, WritableAtom } from 'jotai';
import React, { useRef } from 'react';

import imageMask from '../../assets/character-image-mask.png';
import { ApplyCharaPicMask } from './atoms';
import { mergeSx } from '../../utils';

const DEFAULT_MAX_SIZE_MB = 1;

const DEFAULT_PREVIEW_SX: SxProps<Theme> = {
  width: '100%',
  height: '380px',
};

interface CharacterImageProps {
  atom: WritableAtom<string | null, [string | null], void>;
  applyMaskOverride?: boolean;
  maxSizeMB?: number;
  sx?: SxProps<Theme>;
}

const isInvalidFile = (file: File | undefined, maxSizeMB: number) =>
  !file || !file.type.startsWith('image/') || file.size > maxSizeMB * 1024 * 1024;

export const CharacterImage = ({
  atom: imageAtom,
  maxSizeMB = DEFAULT_MAX_SIZE_MB,
  sx,
  applyMaskOverride = true,
}: CharacterImageProps) => {
  const [image, setImage] = useAtom(imageAtom);
  const applyMask = useAtomValue(ApplyCharaPicMask);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFile = (file?: File) => {
    if (!file || isInvalidFile(file, maxSizeMB)) return;

    const reader = new FileReader();

    reader.onload = () => {
      if (typeof reader.result === 'string') {
        setImage(reader.result);
      }
    };

    reader.readAsDataURL(file);
  };

  const handleDrop = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    handleFile(event.dataTransfer.files[0]);
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    handleFile(event.target.files?.[0]);
    event.target.value = '';
  };

  return (
    <Box
      onDrop={handleDrop}
      onDragOver={(event) => event.preventDefault()}
      sx={mergeSx(
        {
          ...DEFAULT_PREVIEW_SX,
          backgroundImage: image ? `url(${image})` : 'none',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          ...(applyMask &&
            applyMaskOverride && {
              mask: `url(${imageMask}) no-repeat center / 100% 100%`,
              WebkitMask: `url(${imageMask}) no-repeat center / 100% 100%`,
            }),
        },
        sx
      )}
    >
      {!image && (
        <>
          <input ref={fileInputRef} type="file" accept="image/*" hidden onChange={handleFileChange} />

          <Typography
            variant="body1"
            onClick={() => fileInputRef.current?.click()}
            sx={{
              cursor: 'pointer',
              '&:hover': { textDecoration: 'underline' },
              textAlign: 'center',
            }}
          >
            Drop character portrait here
          </Typography>
        </>
      )}
    </Box>
  );
};
