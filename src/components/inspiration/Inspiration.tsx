import { Checkbox, FormControlLabel, Grid2 as Grid, styled } from '@mui/material';
import StarBorderIcon from '@mui/icons-material/StarBorder';
import StarIcon from '@mui/icons-material/Star';
import React from 'react';
import { ComponentLabel, StyledPaper } from '../shared';
import { useAtom } from 'jotai';
import { inspirationAtom } from './atoms';

const StyledFormControlLabel = styled(FormControlLabel)({
  marginRight: 0,
});

const LocalCheckbox = () => {
  const [inspiration, setInspiration] = useAtom(inspirationAtom);
  return (
    <Checkbox
      sx={{ marginTop: '0' }}
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
    <Grid size={12} component={StyledPaper} sx={{ pt: 0.8, pl: 1.5, height: 50 }}>
      <StyledFormControlLabel
        control={<LocalCheckbox />}
        label={<ComponentLabel sx={{ fontSize: { xs: '1rem', md: '1.3rem' } }}>Inspiration</ComponentLabel>}
        slotProps={{
          typography: {
            sx: { paddingLeft: '8px' },
          },
        }}
      />
    </Grid>
  );
};
