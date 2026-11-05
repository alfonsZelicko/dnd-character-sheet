import AddIcon from '@mui/icons-material/Add';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import { Button, Grid2 as Grid, IconButton, Stack, Tooltip, Typography } from '@mui/material';
import { useAtomValue, useSetAtom } from 'jotai';
import { selectAtom } from 'jotai/utils';
import { PrimitiveAtom } from 'jotai/vanilla/atom';
import React, { memo, useCallback, useMemo } from 'react';
import { mergedPaperListSx } from '../../../utils';
import { StyledPaper, StyledStandardTextField } from '../../shared';
import { AttackEntry, CreatureAttackFieldProps, CreatureType } from '../types';

const attackNameSx = { ' input': { textAlign: 'Left', fontSize: '1rem', fontWeight: '600' } };
const commonSx = { ' input': { textAlign: 'center', fontSize: '1rem', fontWeight: 200 } };

// ─── per-field attack input ───────────────────────────────────────────────────

const AttackFieldInput = memo(function AttackFieldInput({
  atom,
  index,
  field,
  placeholder,
  sx,
}: CreatureAttackFieldProps) {
  const fieldAtom = useMemo(
    () => selectAtom(atom, (s) => s.attacks[index]?.[field] ?? ''),
    [atom, index, field],
  );
  const value = useAtomValue(fieldAtom);
  const setCreature = useSetAtom(atom);

  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setCreature((prev) => {
        const attacks = prev.attacks.map((entry, i) =>
          i === index ? { ...entry, [field]: e.target.value } : entry,
        );
        return { ...prev, attacks };
      });
    },
    [setCreature, index, field],
  );

  return (
    <StyledStandardTextField
      placeholder={placeholder}
      value={value}
      onChange={handleChange}
      variant="standard"
      fullWidth
      sx={{ ...commonSx, ...sx }}
    />
  );
});

// ─── single attack row ────────────────────────────────────────────────────────

const AttackRow = memo(function AttackRow({
  atom,
  index,
  onRemove,
}: {
  atom: PrimitiveAtom<CreatureType>;
  index: number;
  onRemove: () => void;
}) {
  const nameAtom = useMemo(() => selectAtom(atom, (s) => s.attacks[index]?.attackName ?? ''), [atom, index]);
  const attackName = useAtomValue(nameAtom);

  return (
    <Grid container size={12} spacing={1} component={StyledPaper} className="paperItem" sx={{ alignItems: 'center', flexWrap: 'nowrap' }}>
      <Grid size="grow">
        <AttackFieldInput atom={atom} index={index} field="attackName" placeholder="Attack name" sx={attackNameSx} />
      </Grid>
      <Grid sx={{ width: '50px', flexShrink: 0 }}>
        <AttackFieldInput atom={atom} index={index} field="toHit" placeholder="To Hit" />
      </Grid>
      <Grid sx={{ width: '60px', flexShrink: 0 }}>
        <AttackFieldInput atom={atom} index={index} field="range" placeholder="Range" />
      </Grid>
      <Grid sx={{ width: '60px', flexShrink: 0 }}>
        <AttackFieldInput atom={atom} index={index} field="damage" placeholder="DMG" />
      </Grid>
      <Grid sx={{ width: '80px', flexShrink: 0 }}>
        <AttackFieldInput atom={atom} index={index} field="damageType" placeholder="Type" />
      </Grid>
      <Grid size="auto">
        <Tooltip title="Delete attack">
          <IconButton size="small" aria-label={`Remove ${attackName || 'attack'}`} onClick={onRemove}>
            <DeleteOutlineIcon fontSize="small" />
          </IconButton>
        </Tooltip>
      </Grid>
    </Grid>
  );
});

// ─── CreatureActions ──────────────────────────────────────────────────────────

export const CreatureActions = ({ creatureAtom }: { creatureAtom: PrimitiveAtom<CreatureType> }) => {
  const lengthAtom = useMemo(() => selectAtom(creatureAtom, (s) => s.attacks.length), [creatureAtom]);
  const length = useAtomValue(lengthAtom);
  const setCreature = useSetAtom(creatureAtom);

  const addAttack = useCallback(() => {
    setCreature((prev) => ({
      ...prev,
      attacks: [
        ...prev.attacks,
        { attackName: '', range: '', toHit: '', damage: '', damageType: '' } satisfies AttackEntry,
      ],
    }));
  }, [setCreature]);

  const removeAttack = useCallback(
    (index: number) => {
      setCreature((prev) => ({
        ...prev,
        attacks: prev.attacks.filter((_, i) => i !== index),
      }));
    },
    [setCreature],
  );

  return (
    <Grid container size={12} component={StyledPaper} direction="column">
      <Stack direction="row" alignItems="center" justifyContent="space-between" spacing={1} sx={{ p: 0.5 }}>
        <Typography variant="subtitle2" component="h3">
          Attacks
        </Typography>
        <Button size="small" startIcon={<AddIcon />} onClick={addAttack}>
          Add attack
        </Button>
      </Stack>
      <Grid container size={12} spacing={0} sx={mergedPaperListSx()}>
        {Array.from({ length }, (_, i) => (
          <AttackRow key={i} atom={creatureAtom} index={i} onRemove={() => removeAttack(i)} />
        ))}
      </Grid>
    </Grid>
  );
};
