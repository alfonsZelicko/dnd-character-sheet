import { useAtom } from 'jotai/index';
import { Checkbox, Grid2 as Grid } from '@mui/material';
import React, { ReactNode } from 'react';

type DeathSavesCounterProps = {
  checkedIcon: ReactNode;
  icon: ReactNode;
  atom: any;
};

export const DeathSavesCounter = ({ atom, checkedIcon, icon }: DeathSavesCounterProps) => {
  const [deathSave, setDeathSave] = useAtom<number>(atom);
  const handleDeathSaveCheck = (value: number) => {
    setDeathSave(deathSave === 1 && value === 1 ? 0 : value);
  };

  return (
    <Grid size={'auto'}>
      {[1, 2, 3].map((value, index) => (
        <Checkbox checkedIcon={checkedIcon} icon={icon} checked={value <= deathSave} onChange={() => handleDeathSaveCheck(value)} key={index} />
      ))}
    </Grid>
  );
};
