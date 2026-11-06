import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import { IconButton, Tooltip } from '@mui/material';
import React from 'react';

type RemoveButtonProps = {
  onClick: () => void;
  tooltip?: string;
  ariaLabel?: string;
};

export const RemoveButton = ({ onClick, tooltip = 'Delete', ariaLabel = 'Remove' }: RemoveButtonProps) => (
  <Tooltip title={tooltip}>
    <IconButton size="small" aria-label={ariaLabel} onClick={onClick} sx={{ pt: '7px', pb: '3px' }}>
      <DeleteOutlineIcon fontSize="medium" />
    </IconButton>
  </Tooltip>
);
