import { Box, Checkbox, FormControlLabel, styled } from '@mui/material';
import StarBorderIcon from '@mui/icons-material/StarBorder';
import StarIcon from '@mui/icons-material/Star';
import React from 'react';
import { StyledPaper } from '../shared';
import { useAtom } from 'jotai';
import { inspirationAtom } from './atoms';

const StyledFormControlLabel = styled(FormControlLabel)({
  marginRight: 0,
});

const LocalCheckbox = () => {
  const [inspiration, setInspiration] = useAtom(inspirationAtom);
  return (
    <Checkbox
      sx={{ marginTop: '0', paddingRight: 1, paddingLeft: 1 }}
      checked={inspiration}
      onChange={() => setInspiration((prev) => !prev)}
      size={'large'}
      icon={<StarBorderIcon />}
      checkedIcon={<StarIcon />}
    />
  );
};

export const Inspiration = () => {
  return (
    <Box component={StyledPaper} sx={{ pt: 0.8, /*paddingBottom: '14px'/*, height: '45px'*/ }}>
      <StyledFormControlLabel control={<LocalCheckbox />} label="Inspiration" />
    </Box>
  );
};
