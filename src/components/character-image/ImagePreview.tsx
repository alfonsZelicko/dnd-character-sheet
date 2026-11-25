import type { SxProps, Theme } from '@mui/material';
import { Box, Typography } from '@mui/material';
import { useAtom, useAtomValue, WritableAtom } from 'jotai';
import React, { useEffect, useRef, useState } from 'react';

import imageMask from '../../assets/character-image-mask.png';
import { ApplyCharaPicMask } from './atoms';
import { mergeSx } from '../../utils';

const DEFAULT_MAX_SIZE_MB = 1;

const DEFAULT_PREVIEW_SX: SxProps<Theme> = {
  // width: 'auto',
  height: '380px',
};

interface ImagePreviewProps {
  atom: WritableAtom<any, [any], any>;
  applyMaskOverride?: boolean;
  maxSizeMB?: number;
  storeAsBlob?: boolean;
  sx?: SxProps<Theme>;
}

const isInvalidFile = (file: File | undefined, maxSizeMB: number) =>
  !file || !file.type.startsWith('image/') || file.size > maxSizeMB * 1024 * 1024;

export const ImagePreview = ({
  atom: imageAtom,
  maxSizeMB = DEFAULT_MAX_SIZE_MB,
  storeAsBlob = false,
  sx,
  applyMaskOverride = true,
}: ImagePreviewProps) => {
  const [image, setImage] = useAtom(imageAtom);
  const applyMask = useAtomValue(ApplyCharaPicMask);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [imageUrl, setImageUrl] = useState<string | null>(null);

  useEffect(() => {
    if (!image) {
      setImageUrl(null);
      return;
    }
    const url = typeof image === 'string' ? image : URL.createObjectURL(image);
    setImageUrl(url);
    return () => { if (typeof image !== 'string') URL.revokeObjectURL(url); };
  }, [image]);

  const handleFile = async (file?: File) => {
    if (!file || isInvalidFile(file, maxSizeMB)) return;
    try {
      const bitmap = await createImageBitmap(file);
      const scale = Math.min(1, 1200 / Math.max(bitmap.width, bitmap.height));
      const canvas = document.createElement('canvas');
      canvas.width = Math.max(1, Math.round(bitmap.width * scale));
      canvas.height = Math.max(1, Math.round(bitmap.height * scale));
      canvas.getContext('2d')?.drawImage(bitmap, 0, 0, canvas.width, canvas.height);
      bitmap.close();
      const compressed = await new Promise<Blob | null>((resolve) => canvas.toBlob(resolve, 'image/webp', 0.78));
      if (compressed) {
        if (storeAsBlob) setImage(compressed);
        else {
          const bytes = new Uint8Array(await compressed.arrayBuffer());
          let binary = '';
          bytes.forEach((byte) => { binary += String.fromCharCode(byte); });
          setImage(`data:${compressed.type || 'image/webp'};base64,${btoa(binary)}`);
        }
      }
    } catch {
      // Unsupported or corrupt images are ignored without changing the current portrait.
    }
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
          aspectRatio: '336 / 380',
          backgroundImage: imageUrl ? `url(${imageUrl})` : 'none',
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
