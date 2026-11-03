import { Box, Checkbox, FormControlLabel, Grid2 as Grid } from '@mui/material';
import { selectAtom } from 'jotai/utils';
import { atom, useAtomValue, useSetAtom } from 'jotai';
import React, { useMemo } from 'react';
import { StyledPaper, StyledStandardTextField } from '../shared';
import { featureCommonProps } from '../features/components/utils';
import { MagicItemProps, MagicItemsProps } from './types';
import { Notes } from '../notes';
import {
  magicItemAttunementContainerSx,
  magicItemAttunementLabelSx,
  magicItemHeaderSx,
  magicItemNameContainerSx,
  magicItemNameInputSx,
} from './styles';

const AttunedCheckbox = ({ magicItemAtom }: MagicItemProps) => {
  const attunedAtom = useMemo(() => selectAtom(magicItemAtom, (item) => item.attuned), [magicItemAtom]);
  const attuned = useAtomValue(attunedAtom);
  const setMagicItem = useSetAtom(magicItemAtom);

  return (
    <FormControlLabel
      sx={magicItemAttunementLabelSx}
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
      sx={magicItemNameInputSx}
    />
  );
};

const ItemDescription = ({ magicItemAtom }: MagicItemProps) => {
  const descriptionAtom = useMemo(
    () =>
      atom(
        (get) => get(magicItemAtom).description,
        (get, set, update: React.SetStateAction<string>) => {
          const currentDescription = get(magicItemAtom).description;
          const description = typeof update === 'function' ? update(currentDescription) : update;
          set(magicItemAtom, (item) => ({ ...item, description }));
        }
      ),
    [magicItemAtom]
  );

  return (
    <Notes
      atom={descriptionAtom}
      placeholder="Item Description"
      rows={5}
      WrapperProps={{
        component: 'div',
      }}
    />
  );
};

export const MagicItem = ({ magicItemAtom }: MagicItemProps) => (
  <Grid size={12} component={StyledPaper}>
    <Box sx={magicItemHeaderSx}>
      <Box sx={magicItemNameContainerSx}>
        <ItemName magicItemAtom={magicItemAtom} />
      </Box>
      <Box sx={magicItemAttunementContainerSx}>
        <AttunedCheckbox magicItemAtom={magicItemAtom} />
      </Box>
    </Box>

    <ItemDescription magicItemAtom={magicItemAtom} />
  </Grid>
);

export const MagicItems = ({ magicItems }: MagicItemsProps) =>
  magicItems.map((magicItemAtom, idx) => <MagicItem key={idx} magicItemAtom={magicItemAtom} />);
