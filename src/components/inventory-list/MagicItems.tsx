import { Box, Checkbox, FormControlLabel, Grid2 as Grid } from '@mui/material';
import { selectAtom } from 'jotai/utils';
import { useAtomValue, useSetAtom } from 'jotai';
import React, { useMemo } from 'react';
import { StyledPaper, StyledStandardTextField, StyledTextFieldArea } from '../shared';
import { featureCommonProps } from '../features/components/utils';
import { MagicItemProps, MagicItemsProps } from './types';

const AttunedCheckbox = ({ magicItemAtom }: MagicItemProps) => {
  const attunedAtom = useMemo(() => selectAtom(magicItemAtom, (item) => item.attuned), [magicItemAtom]);
  const attuned = useAtomValue(attunedAtom);
  const setMagicItem = useSetAtom(magicItemAtom);

  return (
    <FormControlLabel
      sx={{ pr: 2 }}
      control={
        <Checkbox
          checked={attuned}
          onChange={(event) => setMagicItem((item) => ({ ...item, attuned: event.target.checked }))}
        />
      }
      label="Attuned"
      labelPlacement="start"
    />
  );
};

const ItemName = ({ magicItemAtom }: MagicItemProps) => {
  const nameAtom = useMemo(() => selectAtom(magicItemAtom, (item) => item.name), [magicItemAtom]);
  const name = useAtomValue(nameAtom);
  const setMagicItem = useSetAtom(magicItemAtom);

  return (
    <StyledStandardTextField
      name="featureName"
      value={name}
      onChange={(event) => setMagicItem((item) => ({ ...item, name: event.target.value }))}
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
  );
};

const ItemDescription = ({ magicItemAtom }: MagicItemProps) => {
  const descriptionAtom = useMemo(() => selectAtom(magicItemAtom, (item) => item.description), [magicItemAtom]);
  const description = useAtomValue(descriptionAtom);
  const setMagicItem = useSetAtom(magicItemAtom);

  return (
    <StyledTextFieldArea
      value={description}
      onChange={(event) => setMagicItem((item) => ({ ...item, description: event.target.value }))}
      variant="outlined"
      fullWidth
      rows={5}
      placeholder="Item Description"
      multiline
    />
  );
};

export const MagicItem = ({ magicItemAtom }: MagicItemProps) => (
  <Grid size={12} component={StyledPaper}>
    <Box sx={{ display: 'flex', alignItems: 'center', width: '100%' }}>
      <Box sx={{ flex: 1, minWidth: 0 }}>
        <ItemName magicItemAtom={magicItemAtom} />
      </Box>
      <Box sx={{ flex: '0 0 auto' }}>
        <AttunedCheckbox magicItemAtom={magicItemAtom} />
      </Box>
    </Box>

    <Box sx={{ display: 'flex', height: 'auto', width: '100%', minWidth: 0 }}>
      <ItemDescription magicItemAtom={magicItemAtom} />
    </Box>
  </Grid>
);

export const MagicItems = ({ magicItems }: MagicItemsProps) =>
  magicItems.map((item, idx) => <MagicItem key={idx} magicItemAtom={item} />);
