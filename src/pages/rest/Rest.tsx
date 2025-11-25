import { Button, FormControlLabel, Grid2 as Grid } from '@mui/material';
import { exportLocalStorageToJSON, importJSONToLocalStorage } from '../../features/utils';
import React from 'react';
import Checkbox from '@mui/material/Checkbox';
import { useAtom } from 'jotai';
import { showIncDecButtonsAtom } from '../../components/shared/number-input/inc-dec-buttons/atoms';
import { ApplyCharaPicMask } from '../../components/character-image/atoms';

export const Rest = () => {
  const [getShowHideBtns, setShowHideBtns] = useAtom(showIncDecButtonsAtom);
  const [getApplyMask, setApplyMask] = useAtom(ApplyCharaPicMask);

  const handleChangeShowIncDecBtns = (event: React.ChangeEvent<HTMLInputElement>) => {
    setShowHideBtns(event.target.checked);
  };

  const handleChangeAplyCharImgMask = (event: React.ChangeEvent<HTMLInputElement>) => {
    setApplyMask(event.target.checked);
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
      <FormControlLabel control={<Checkbox checked={!!getApplyMask} onChange={handleChangeAplyCharImgMask} />} label="Aply Character image mask" />
      <FormControlLabel control={<Checkbox checked={getShowHideBtns} onChange={handleChangeShowIncDecBtns} />} label="Show inc/dec buttons" />
    </Grid>
  )
};
