import { Grid2 as Grid } from '@mui/material';
import { useAtomValue, useSetAtom } from 'jotai';
import { selectAtom } from 'jotai/utils';
import React, { memo, useCallback, useMemo } from 'react';
import { RemoveButton, StyledPaper, StyledStandardTextField } from '../shared';
import { attackNameSx, commonPropsSx, noteSx } from './styles';
import { AttackItemProps, WeaponFieldInputProps, WeaponRemoveButtonProps } from './types';

// ─── per-field input ──────────────────────────────────────────────────────────

const WeaponFieldInput = memo(function WeaponFieldInput({
  atom,
  field,
  placeholder,
  sx,
  width,
  fullWidth,
}: WeaponFieldInputProps) {
  const fieldAtom = useMemo(() => selectAtom(atom, (s) => s[field]), [atom, field]);
  const value = useAtomValue(fieldAtom);
  const setAttack = useSetAtom(atom);

  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setAttack((prev) => ({ ...prev, [field]: e.target.value }));
    },
    [setAttack, field]
  );

  return (
    <StyledStandardTextField
      placeholder={placeholder}
      value={value}
      name={field}
      onChange={handleChange}
      variant="standard"
      fullWidth={fullWidth ?? true}
      sx={{ ...commonPropsSx, ...sx, ...(width !== undefined ? { width } : {}) }}
    />
  );
});

// ─── remove button ────────────────────────────────────────────────────────────

const WeaponRemoveButton = memo(function WeaponRemoveButton({ atom, onRemove }: WeaponRemoveButtonProps) {
  const nameAtom = useMemo(() => selectAtom(atom, (s) => s.attackName), [atom]);
  const attackName = useAtomValue(nameAtom);

  return <RemoveButton onClick={onRemove} tooltip="Delete weapon" ariaLabel={`Remove ${attackName || 'weapon'}`} />;
});

// ─── WeaponItem ───────────────────────────────────────────────────────────────

export const WeaponItem = ({ attackAtom, onRemove }: AttackItemProps) => {
  return (
    <Grid container size={12} spacing={1} component={StyledPaper} className={'paperItem'}>
      <Grid container size={12} sx={{ alignItems: 'center', flexWrap: 'nowrap' }}>
        <Grid size={'grow'} sx={{ marginTop: '-5px' }}>
          <WeaponFieldInput atom={attackAtom} field="attackName" placeholder="Weapon Name" sx={{ ...attackNameSx }} />
        </Grid>
        <Grid sx={{ width: '30px', marginTop: '-5px' }}>
          <WeaponFieldInput atom={attackAtom} field="attackBonus" placeholder="⚂" />
        </Grid>
        <Grid sx={{ width: '60px', marginTop: '-5px' }}>
          <WeaponFieldInput atom={attackAtom} field="range" placeholder="Range" />
        </Grid>
        <Grid sx={{ width: '70px', marginTop: '-5px' }}>
          <WeaponFieldInput atom={attackAtom} field="damage" placeholder="DMG" />
        </Grid>
        <Grid size={2.5} sx={{ marginTop: '-5px' }}>
          <WeaponFieldInput atom={attackAtom} field="damageType" placeholder="dmg type" />
        </Grid>
        {onRemove && (
          <Grid size="auto">
            <WeaponRemoveButton atom={attackAtom} onRemove={onRemove} />
          </Grid>
        )}
      </Grid>
      <Grid size={12} sx={{ marginTop: '-5px' }}>
        <WeaponFieldInput atom={attackAtom} field="note" placeholder="Weapon Description" sx={{ ...noteSx }} />
      </Grid>
    </Grid>
  );
};
