import { Button, Grid2 as Grid } from '@mui/material';
import React from 'react';
import { ComponentLabel } from '../component-label';
import AddIcon from '@mui/icons-material/Add';

type EditableListHeaderProps = {
  label: string;
  addItem?: () => void;
  addItemLabel?: string;
};

export const EditableListHeader = ({ label, addItem, addItemLabel = 'Add Item' }: EditableListHeaderProps) => {
  return (
    <Grid container size={12} direction="row" alignItems="center" justifyContent="space-between">
      <Grid size={'grow'}>
        <ComponentLabel textAlign={'left'} sx={{ display: 'block !important' }}>
          {label}
        </ComponentLabel>
      </Grid>
      {addItem && (
        <Grid>
          <Button startIcon={<AddIcon />} onClick={addItem}>
            {addItemLabel}
          </Button>
        </Grid>
      )}
    </Grid>
  );
};
