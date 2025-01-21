import { Button, Grid2 as Grid } from '@mui/material';
import { exportLocalStorageToJSON, importJSONToLocalStorage } from '../../features/utils';
import React from 'react';

export const RestPage = () =>       <Grid size={12}>
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