import React from 'react';
import { StyledStandardTextField, StyledTextFieldArea } from '../shared';
import { Box } from '@mui/material';
import { PrimitiveAtom } from 'jotai/vanilla/atom';
import { FeatType } from './types';
import { useAtom } from 'jotai';
import { FeatNameSx } from './styles';

export const FeatItem = ({ featAtom }: { featAtom: PrimitiveAtom<FeatType> }) => {
  const [feat, setFeat] = useAtom(featAtom);
  const handleOnChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFeat({ ...feat, [name]: value });
  };

  return (
    <Box sx={{ p: 0 }}>
      <StyledStandardTextField
        fullWidth
        value={feat.featName}
        name={'featName'}
        hiddenLabel
        placeholder={'Feat name'}
        onChange={handleOnChange}
        sx={FeatNameSx}
      />
      <StyledTextFieldArea
        value={feat.featDescription}
        onChange={handleOnChange}
        name={'featDescription'}
        rows={2}
        variant="outlined"
        fullWidth
        placeholder="Some small important notes"
        multiline
        // sx={{ height: 68, '& .MuiInputBase-root textArea': { paddingTop: '0 !important' } }}
      />
    </Box>
  );
};
