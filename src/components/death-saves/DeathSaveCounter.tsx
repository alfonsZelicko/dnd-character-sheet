import { useAtom } from 'jotai';
import { Checkbox, Grid2 as Grid, Grid2Props } from '@mui/material';
import React, { ReactNode } from 'react';
import { mergeSx } from '../../utils';

type DeathSavesCounterProps = {
  checkedIcon: ReactNode;
  icon: ReactNode;
  atom: any;
  WrapperProps?: Grid2Props;
};

export const DeathSavesCounter = ({ atom, checkedIcon, icon, WrapperProps = {} }: DeathSavesCounterProps) => {
  const [deathSave, setDeathSave] = useAtom<number>(atom);
  const handleDeathSaveCheck = (value: number) => {
    setDeathSave((prev) => (prev === value ? value - 1 : value));
  };

  return (
    <Grid
      container
      size="grow"
      spacing={{ lg: 2, md: 1 }}
      direction="row"
      justifyContent="left"
      sx={mergeSx({ flex: { xs: 1, md: 'auto' } }, WrapperProps.sx ? WrapperProps.sx : {})}
      {...WrapperProps}
    >
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
