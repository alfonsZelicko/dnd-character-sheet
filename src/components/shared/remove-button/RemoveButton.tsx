import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import { IconButton, SxProps, Theme, Tooltip } from '@mui/material';
import React from 'react';

type RemoveButtonProps = {
  onClick: () => void;
  tooltip?: string;
  ariaLabel?: string;
  wrapperSx?: SxProps<Theme>;
};

export const RemoveButton = ({
  onClick,
  tooltip = 'Delete',
  ariaLabel = 'Remove',
  wrapperSx = {},
}: RemoveButtonProps) => (
  <Tooltip title={tooltip} sx={wrapperSx}>
    <IconButton size="small" aria-label={ariaLabel} onClick={onClick} sx={{ pt: '7px', pb: '3px' }}>
      <DeleteOutlineIcon fontSize="medium" />
    </IconButton>
  </Tooltip>
);
