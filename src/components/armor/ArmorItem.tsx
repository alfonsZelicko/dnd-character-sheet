import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import AddIcon from '@mui/icons-material/Add';
import { Button, Grid2 as Grid, IconButton, MenuItem, Select, SelectChangeEvent, Stack, Tooltip, Typography } from '@mui/material';
import { PrimitiveAtom, useAtom, useAtomValue, useSetAtom } from 'jotai';
import { selectAtom } from 'jotai/utils';
import React, { memo, useCallback, useMemo } from 'react';
import { StyledPaper, StyledStandardTextField } from '../shared';
import { ArmorAtoms, ArmorAtomsAtom } from './atoms';
import { ArmorCategory, ArmorFieldInputProps, ArmorItemProps, ArmorRemoveButtonProps, ArmorType } from './types';

// ─── per-field text input ─────────────────────────────────────────────────────

const ArmorFieldInput = memo(function ArmorFieldInput({ atom, field, placeholder, sx }: ArmorFieldInputProps) {
  const fieldAtom = useMemo(() => selectAtom(atom, (s) => s[field]), [atom, field]);
  const value = useAtomValue(fieldAtom);
  const setArmor = useSetAtom(atom);

  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setArmor((prev) => ({ ...prev, [field]: e.target.value }));
    },
    [setArmor, field],
  );

  return (
    <StyledStandardTextField
      fullWidth
      variant="standard"
      placeholder={placeholder}
      value={value}
      onChange={handleChange}
      sx={sx}
    />
  );
});

// ─── category select ──────────────────────────────────────────────────────────

const ArmorCategorySelect = memo(function ArmorCategorySelect({ atom }: { atom: PrimitiveAtom<ArmorType> }) {
  const categoryAtom = useMemo(() => selectAtom(atom, (s) => s.category), [atom]);
  const category = useAtomValue(categoryAtom);
  const setArmor = useSetAtom(atom);

  const handleChange = useCallback(
    (e: SelectChangeEvent) => {
      setArmor((prev) => ({ ...prev, category: e.target.value as ArmorCategory }));
    },
    [setArmor],
  );

  return (
    <Select
      fullWidth
      name="armor-type"
      variant="standard"
      value={category}
      inputProps={{ 'aria-label': 'Armor type' }}
      onChange={handleChange}
    >
      {(['Robe', 'Light', 'Medium', 'Heavy'] as ArmorCategory[]).map((cat) => (
        <MenuItem key={cat} value={cat}>
          {cat}
        </MenuItem>
      ))}
    </Select>
  );
});

// ─── remove button ────────────────────────────────────────────────────────────

const ArmorRemoveButton = memo(function ArmorRemoveButton({ atom, onRemove }: ArmorRemoveButtonProps) {
  const nameAtom = useMemo(() => selectAtom(atom, (s) => s.name), [atom]);
  const name = useAtomValue(nameAtom);

  return (
    <Tooltip title="Delete armor">
      <IconButton size="small" aria-label={`Remove ${name || 'armor'}`} onClick={onRemove}>
        <DeleteOutlineIcon fontSize="small" />
      </IconButton>
    </Tooltip>
  );
});

// ─── ArmorItem ────────────────────────────────────────────────────────────────

export const ArmorItem = ({ armorAtom, onRemove }: ArmorItemProps) => {
  return (
    <Grid container size={6} spacing={1} component={StyledPaper} className="paperItem">
      <Grid container size={12} sx={{ alignItems: 'center', flexWrap: 'nowrap' }}>
        <Grid size="grow">
          <ArmorFieldInput
            atom={armorAtom}
            field="name"
            placeholder="Armor name"
            sx={{ '& input': { textAlign: 'left', fontSize: '1rem', fontWeight: 600 } }}
          />
        </Grid>
        <Grid sx={{ width: 25, flexShrink: 0 }}>
          <ArmorFieldInput
            atom={armorAtom}
            field="defense"
            placeholder="Defense"
            sx={{ '& input': { textAlign: 'center', fontSize: '1rem', fontWeight: 200 } }}
          />
        </Grid>
        {onRemove && (
          <Grid size="auto">
            <ArmorRemoveButton atom={armorAtom} onRemove={onRemove} />
          </Grid>
        )}
      </Grid>
      <Grid size="grow">
        <ArmorFieldInput
          atom={armorAtom}
          field="description"
          placeholder="Armor description"
          sx={{ '& input': { textAlign: 'left', fontSize: '1rem', fontWeight: 200 } }}
        />
      </Grid>
      <Grid sx={{ width: 75, flexShrink: 0, display: 'flex', alignItems: 'flex-end', alignSelf: 'stretch' }}>
        <ArmorCategorySelect atom={armorAtom} />
      </Grid>
    </Grid>
  );
};

// ─── ArmorInventory ───────────────────────────────────────────────────────────

const createEmptyArmor = (): ArmorType => ({
  category: 'Robe',
  name: '',
  defense: '',
  description: '',
  proficient: false,
});

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
      <Grid container size={12} spacing={1} direction="row">
        {armorAtoms.map((armorAtom, index) => (
          <ArmorItem
            key={index}
            armorAtom={armorAtom}
            onRemove={() => setArmorItems((items) => items.filter((_, i) => i !== index))}
          />
        ))}
      </Grid>
    </Grid>
  );
};
