import { Box, FormControlLabel, Grid2 as Grid } from '@mui/material';
import React from 'react';
import { useAtom } from 'jotai';
import Checkbox from '@mui/material/Checkbox';
import { StyledPaper, StyledStandardTextField, StyledTextFieldArea } from '../shared';
import { featureCommonProps } from '../features/components/utils';
import { MagicItemProps, MagicItemsProps } from './types';
import { mergeSx } from '../../utils';

/*TODO: resolve better render handling - now, when use changes a part of the matic item, all component is rerendered */

export const MagicItem = ({ magicItemAtom }: MagicItemProps) => {
  const [{ name, description, attuned }, setMagicItem] = useAtom(magicItemAtom);

  return (
    <Grid size={12} component={StyledPaper}>
      <Box sx={{ display: 'flex', alignItems: 'center', width: '100%' }}>
        <Box sx={{ flex: 1, minWidth: 0 }}>
          <StyledStandardTextField
            name="featureName"
            value={name}
            onChange={(event) => setMagicItem((atom) => ({ ...atom, name: event.target.value }))}
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
          <FormControlLabel
            sx={{ pr: 2 }}
            control={
              <Checkbox
                checked={attuned}
                onChange={(event) => setMagicItem((atom) => ({ ...atom, attuned: event.target.checked }))}
              />
            }
            label="Attuned"
            labelPlacement="start"
          />
        </Box>
      </Box>
      <Box
        component={Grid}
        sx={mergeSx({
          display: 'flex',
          height: 'auto',
          width: '100%',
          minWidth: 0,
        })}
      >
        <StyledTextFieldArea
          value={description}
          onChange={(event) => setMagicItem((atom) => ({ ...atom, description: event.target.value }))}
          variant="outlined"
          fullWidth
          rows={5}
          placeholder="Item Description"
          multiline
        />
      </Box>
    </Grid>
  );
};

export const MagicItems = ({ magicItems }: MagicItemsProps) =>
  magicItems.map((item, idx) => <MagicItem key={idx} magicItemAtom={item} />);
