import { Box } from '@mui/material';
import React, { memo } from 'react';
import { StandardNumberInput, StyledStandardTextField } from '../../shared';
import {
  resourceCounterGridTemplateColumns,
  resourceCounterInputSx,
  resourceCounterLabelSx,
} from '../../shared/resource-counter';
import { getSpellLevelLabel } from '../utils';

const infiniteInputSx = {
  ...resourceCounterInputSx,
  '& input::placeholder': { opacity: 1, color: 'text.primary', fontWeight: 600 },
};

export const CantripSlotRow = memo(function CantripSlotRow() {
  return (
    <Box
      sx={{
        display: 'grid',
        gridTemplateColumns: resourceCounterGridTemplateColumns,
        alignItems: 'center',
        width: '100%',
        minWidth: 0,
        borderBottom: 1,
        borderColor: 'divider',
      }}
    >
      <StandardNumberInput disabled fullWidth value="" placeholder="∞" sx={infiniteInputSx} />
      <StyledStandardTextField
        fullWidth
        disabled
        variant="standard"
        type="text"
        value={getSpellLevelLabel(0, 'spell-slots')}
        sx={resourceCounterLabelSx}
      />
      <StandardNumberInput disabled fullWidth value="" placeholder="∞" sx={infiniteInputSx} />
    </Box>
  );
});
