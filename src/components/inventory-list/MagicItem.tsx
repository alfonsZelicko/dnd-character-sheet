import { Box, FormControlLabel, Grid2 as Grid, TextFieldProps } from '@mui/material';
import React from 'react';
import { sensesAtom } from '../simple-components';
import { Notes } from '../notes';
import { TextFieldVariants } from '@mui/material/TextField/TextField';
import { useAtom } from 'jotai';
import Checkbox from '@mui/material/Checkbox';
import { StyledPaper, StyledStandardTextField } from '../shared';
import { featureCommonProps } from '../features/components/utils';

export const MagicItem = ({ ...restProps }: Omit<TextFieldProps, 'variant'> & { variant?: TextFieldVariants }) => {
  const [senses, setSenses] = useAtom(sensesAtom);

  return (
    <Grid size={12} component={StyledPaper}>
      <Box sx={{ display: 'flex', alignItems: 'center', width: '100%' }}>
        <Box sx={{ flex: 1, minWidth: 0 }}>
          <StyledStandardTextField
            name="featureName"
            placeholder="Item name"
            {...featureCommonProps}
            fullWidth
            sx={{
              '& input, .MuiSelect-select': {
                textAlign: 'left',
                fontWeight: 200,
                fontSize: '1rem',
              },
            }}
          />
        </Box>

        <Box sx={{ flex: '0 0 auto' }}>
          <FormControlLabel sx={{ pr: 2 }} control={<Checkbox />} label="Attuned" labelPlacement="start" />
        </Box>
      </Box>
      <Notes
        rows={5}
        placeholder="Description"
        multiline
        {...restProps}
        atom={sensesAtom}
        WrapperProps={{ sx: { width: '100%', minWidth: 0, height: 'auto' }, component: Grid }}
      />
    </Grid>
  );
};
