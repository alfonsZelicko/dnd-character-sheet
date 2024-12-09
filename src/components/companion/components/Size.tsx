import React from 'react';
import { MenuItem } from '@mui/material';
import { SizeType } from '../types';
import { useAtom } from 'jotai';
import { TextInput } from '../../shared';
import { sizeAtom } from '../atoms';

export const Size = () => {
  const [size, setSize] = useAtom(sizeAtom);

  return (
    <TextInput
      select
      size={'medium'}
      fullWidth
      value={size}
      name="type"
      onChange={(e) => {
        setSize(e.target.value as SizeType);
      }}
    >
      <MenuItem value="" disabled>
        Select Size
      </MenuItem>
      <MenuItem value={'small'}>Small</MenuItem>
      <MenuItem value={'medium'}>Medium</MenuItem>
      <MenuItem value={'large'}>Large</MenuItem>
      <MenuItem value={'huge'}>Huge</MenuItem>
    </TextInput>
  );
};
