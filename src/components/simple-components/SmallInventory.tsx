import { useAtom } from 'jotai';
import { noteAtomsAtom } from './atoms';
import { Grid2 as Grid } from '@mui/material';
import React from 'react';
import { Notes } from '../notes';

export const SmallInventory = () => {
  const [inventory] = useAtom(noteAtomsAtom);

  return (
    <>
      {inventory.map((atom, index) => (
        <Grid size={12 / inventory.length} key={index}>
          <Notes
            rows={15}
            variant={'outlined'}
            placeholder={'Notes ' + (index + 1)}
            atom={atom}
            WrapperProps={{ component: 'div' }}
          />
        </Grid>
      ))}
    </>
  );
};
