import React from 'react';
import { Button, Grid2 as Grid } from '@mui/material';
import { exportLocalStorageToJSON, importJSONToLocalStorage } from '../../features/utils';

export const Inventory = () => {
  return (
    <Grid container size={12} padding={2}>
      <Grid size={12}>
        <Button
          variant={'outlined'}
          onClick={() => {
            exportLocalStorageToJSON();
          }}
        >
          Character Export
        </Button>
        <Button
          variant={'outlined'}
          onClick={() => {
            importJSONToLocalStorage();
          }}
        >
          Character Import
        </Button>
      </Grid>
    </Grid>
  );
};
