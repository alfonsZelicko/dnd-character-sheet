import { Button, FormControlLabel, Grid2 as Grid } from '@mui/material';
import { exportLocalStorageToJSON, importJSONToLocalStorage } from '../../features/utils';
import React from 'react';
import Checkbox from '@mui/material/Checkbox';
import { useAtom } from 'jotai';
import { showIncDecButtonsAtom } from '../../components/shared/number-input/inc-dec-buttons/atoms';

export const Rest = () => {
  const [getShowHideBtns, setShowHideBtns] = useAtom(showIncDecButtonsAtom);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setShowHideBtns(event.target.checked);
  };
  
  return(
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
      <br/>
      <FormControlLabel control={<Checkbox checked={getShowHideBtns} onChange={handleChange} />} label="Show inc/dec buttons" />
    </Grid>
  )
};
