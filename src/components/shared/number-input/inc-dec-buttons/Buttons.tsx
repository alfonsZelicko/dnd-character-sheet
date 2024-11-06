import { Button, Stack } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import React, { ReactNode } from 'react';
import { ButtonsType } from './types';
import { buttonStyles } from './styles';

const ActionButton = ({ icon, action }: { icon: ReactNode; action: () => void }) => (
  <Button variant="contained" size="small" sx={buttonStyles} onClick={action}>
    {icon}
  </Button>
);

export const Buttons = ({ callAction }: ButtonsType) => {
  return (
    <Stack spacing={0.5} direction="column" alignItems="center">
      <ActionButton icon={<AddIcon />} action={() => callAction(+1)} />
      <ActionButton icon={<RemoveIcon />} action={() => callAction(-1)} />
    </Stack>
  );
};
