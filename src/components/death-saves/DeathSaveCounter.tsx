import { useAtom } from 'jotai';
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
    setDeathSave((prev) => (prev === value ? value - 1 : value));
  };

  return (
    <Grid container size={'auto'} spacing={{ lg: 2, md: 1 }} direction={'row'}>
      {[1, 2, 3].map((value, index) => (
        <Grid key={index}>
          <Checkbox
            checkedIcon={checkedIcon}
            icon={icon}
            checked={value <= deathSave}
            onChange={() => handleDeathSaveCheck(value)}
          />
        </Grid>
      ))}
    </Grid>
  );
};
