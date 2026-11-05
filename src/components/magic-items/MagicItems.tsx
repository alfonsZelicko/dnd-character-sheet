import AddIcon from '@mui/icons-material/Add';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import { Box, Button, Checkbox, FormControlLabel, Grid2 as Grid, IconButton, Stack, Tooltip } from '@mui/material';
import { atom, useAtomValue, useSetAtom } from 'jotai';
import { selectAtom } from 'jotai/utils';
import React, { memo, useCallback, useMemo } from 'react';
import { Notes } from '../notes';
import { StyledLabel, StyledPaper, StyledStandardTextField } from '../shared';
import { featureCommonProps } from '../features/components/utils';
import { MagicItemAtoms, MagicItemAtomsAtom } from './atoms';
import {
  magicItemAttunementContainerSx,
  magicItemAttunementLabelSx,
  magicItemHeaderSx,
  magicItemNameContainerSx,
  magicItemNameInputSx,
} from './styles';
import { AttunementState, MagicItemCardProps, MagicItemProps } from './types';

const emptyMagicItem = () => ({ name: '', description: '', attunement: 'not-attuned' as AttunementState });

const ATTUNEMENT_CYCLE: AttunementState[] = ['not-attuned', 'attuned', 'not-required'];

const ATTUNEMENT_LABELS: Record<AttunementState, string> = {
  attuned: 'Attuned',
  'not-attuned': 'Not attuned',
  'not-required': 'Not required',
};

const AttunedCheckbox = memo(function AttunedCheckbox({ magicItemAtom }: MagicItemProps) {
  const attunementAtom = useMemo(() => selectAtom(magicItemAtom, (item) => item.attunement), [magicItemAtom]);
  const attunement = useAtomValue(attunementAtom);
  const setMagicItem = useSetAtom(magicItemAtom);

  const handleClick = useCallback(() => {
    setMagicItem((item) => {
      const next = ATTUNEMENT_CYCLE[(ATTUNEMENT_CYCLE.indexOf(item.attunement) + 1) % ATTUNEMENT_CYCLE.length];
      return { ...item, attunement: next };
    });
  }, [setMagicItem]);

  return (
    <Tooltip title={ATTUNEMENT_LABELS[attunement]} arrow>
      <FormControlLabel
        sx={magicItemAttunementLabelSx}
        control={
          <Checkbox
            checked={attunement === 'attuned'}
            indeterminate={attunement === 'not-required'}
            onClick={handleClick}
            onChange={() => {}}
          />
        }
        label="Attuned"
        labelPlacement="start"
      />
    </Tooltip>
  );
});

const ItemName = memo(function ItemName({ magicItemAtom }: MagicItemProps) {
  const nameAtom = useMemo(() => selectAtom(magicItemAtom, (item) => item.name), [magicItemAtom]);
  const name = useAtomValue(nameAtom);
  const setMagicItem = useSetAtom(magicItemAtom);

  const handleChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      setMagicItem((item) => ({ ...item, name: event.target.value }));
    },
    [setMagicItem]
  );

  return (
    <StyledStandardTextField
      name="featureName"
      value={name}
      onChange={handleChange}
      placeholder="Item name"
      {...featureCommonProps}
      fullWidth
      sx={magicItemNameInputSx}
    />
  );
});

const ItemDescription = memo(function ItemDescription({ magicItemAtom }: MagicItemProps) {
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

  return <Notes atom={descriptionAtom} placeholder="Item Description" rows={2} WrapperProps={{ component: 'div' }} />;
});

export const MagicItem = memo(function MagicItem({ magicItemAtom, index }: MagicItemCardProps) {
  const setMagicItems = useSetAtom(MagicItemAtoms);

  const handleRemove = useCallback(() => {
    void setMagicItems((curr) => curr.filter((_, i) => i !== index));
  }, [setMagicItems, index]);

  return (
    <Grid size={12} component={StyledPaper} className="paperItem">
      <Box sx={magicItemHeaderSx}>
        <Box sx={magicItemNameContainerSx}>
          <ItemName magicItemAtom={magicItemAtom} />
        </Box>
        <Box sx={magicItemAttunementContainerSx}>
          <AttunedCheckbox magicItemAtom={magicItemAtom} />
        </Box>
        <Tooltip title="Delete magic item">
          <IconButton size="small" aria-label="Remove magic item" onClick={handleRemove}>
            <DeleteOutlineIcon fontSize="small" />
          </IconButton>
        </Tooltip>
      </Box>
      <ItemDescription magicItemAtom={magicItemAtom} />
    </Grid>
  );
});

export const MagicItems = () => {
  const magicItemAtoms = useAtomValue(MagicItemAtomsAtom);
  const setMagicItems = useSetAtom(MagicItemAtoms);

  const addItem = useCallback(() => setMagicItems((curr) => [...curr, emptyMagicItem()]), [setMagicItems]);

  return (
    <Grid container size={12} component={StyledPaper} direction="column" sx={{ height: '100%' }}>
      <Stack direction="row" alignItems="center" justifyContent="space-between" spacing={1}>
        <StyledLabel>Magic Items</StyledLabel>
        <Button size="small" startIcon={<AddIcon />} onClick={addItem}>
          Add item
        </Button>
      </Stack>
      <Grid container size={12} direction="column" spacing={1}>
        {magicItemAtoms.map((magicItemAtom, index) => (
          <MagicItem key={index} magicItemAtom={magicItemAtom} index={index} />
        ))}
      </Grid>
    </Grid>
  );
};
