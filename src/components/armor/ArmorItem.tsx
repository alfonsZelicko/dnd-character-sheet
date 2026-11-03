import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import AddIcon from '@mui/icons-material/Add';
import { Button, Grid2 as Grid, IconButton, MenuItem, Select, Stack, Typography } from '@mui/material';
import { useAtom, useAtomValue } from 'jotai';
import React from 'react';
import { StyledPaper, StyledStandardTextField } from '../shared';
import { ArmorAtoms, ArmorAtomsAtom } from './atoms';
import { ArmorItemProps, ArmorType } from './types';

const createEmptyArmor = (): ArmorType => ({
  category: 'Robe',
  name: '',
  defense: '',
  description: '',
  proficient: false,
});

// TODO: optimize rendering to rerender only changed components

export const ArmorItem = ({ armorAtom, onRemove }: ArmorItemProps) => {
  const [armor, setArmor] = useAtom(armorAtom);

  return (
    <Grid container size={6} spacing={1} component={StyledPaper} className="paperItem">
      <Grid container size={12} sx={{ alignItems: 'center', flexWrap: 'nowrap' }}>
        <Grid size="grow">
          <StyledStandardTextField
            fullWidth
            variant="standard"
            placeholder="Armor name"
            value={armor.name}
            onChange={(event) => setArmor((current) => ({ ...current, name: event.target.value }))}
            sx={{ '& input': { textAlign: 'left', fontSize: '1rem', fontWeight: 600 } }}
          />
        </Grid>
        <Grid sx={{ width: 75, flexShrink: 0, display: 'flex', alignItems: 'flex-end', alignSelf: 'stretch' }}>
          <Select
            fullWidth
            name={'armor-type'}
            variant="standard"
            value={armor.category}
            inputProps={{ 'aria-label': 'Armor type' }}
            onChange={(event) =>
              setArmor((current) => ({ ...current, category: event.target.value as typeof current.category }))
            }
          >
            {['Robe', 'Light', 'Medium', 'Heavy'].map((category) => (
              <MenuItem key={category} value={category}>
                {category}
              </MenuItem>
            ))}
          </Select>
        </Grid>
        <Grid sx={{ width: 25, flexShrink: 0 }}>
          <StyledStandardTextField
            fullWidth
            variant="standard"
            placeholder="Defense"
            // inputProps={{ 'aria-label': 'Armor defense' }}
            value={armor.defense ?? ''}
            onChange={(event) => setArmor((current) => ({ ...current, defense: event.target.value }))}
            sx={{ '& input': { textAlign: 'center', fontSize: '1rem', fontWeight: 200 } }}
          />
        </Grid>
        {/*<Grid size="auto">
          <FormControlLabel
            control={
              <Checkbox
                size="small"
                checked={armor.proficient}
                onChange={(event) => setArmor((current) => ({ ...current, proficient: event.target.checked }))}
              />
            }
            label="Prof."
            labelPlacement="start"
            sx={{ mr: 0, whiteSpace: 'nowrap' }}
          />
        </Grid>*/}
        {onRemove && (
          <Grid size="auto">
            <IconButton size="small" aria-label={`Remove ${armor.name || 'armor'}`} onClick={onRemove}>
              <DeleteOutlineIcon fontSize="small" />
            </IconButton>
          </Grid>
        )}
      </Grid>
      <Grid size={12}>
        <StyledStandardTextField
          fullWidth
          variant="standard"
          placeholder="Armor description"
          value={armor.description}
          onChange={(event) => setArmor((current) => ({ ...current, description: event.target.value }))}
          sx={{ '& input': { textAlign: 'left', fontSize: '1rem', fontWeight: 200 } }}
        />
      </Grid>
    </Grid>
  );
};

export const ArmorInventory = () => {
  const [, setArmorItems] = useAtom(ArmorAtoms);
  const armorAtoms = useAtomValue(ArmorAtomsAtom);

  return (
    <Grid container size={12} component={StyledPaper} direction="column">
      <Stack direction="row" alignItems="center" justifyContent="space-between" spacing={1} sx={{ p: 1 }}>
        <Typography variant="h6" component="h2">
          Armors
        </Typography>
        <Button
          size="small"
          startIcon={<AddIcon />}
          onClick={() => setArmorItems((items) => [...items, createEmptyArmor()])}
        >
          Add armor
        </Button>
      </Stack>
      <Grid container size={12} spacing={1} direction={'row'}>
        {armorAtoms.map((armorAtom, index) => (
          <ArmorItem
            key={index}
            armorAtom={armorAtom}
            onRemove={() => setArmorItems((items) => items.filter((_, itemIndex) => itemIndex !== index))}
          />
        ))}
      </Grid>
    </Grid>
  );
};
