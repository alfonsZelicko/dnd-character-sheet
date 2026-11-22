import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import { IconButton, SxProps, Theme, Tooltip } from '@mui/material';
import React from 'react';
import { SvgIconProps } from '@mui/material/SvgIcon/SvgIcon';

type RemoveButtonProps = {
  onClick: () => void;
  tooltip?: string;
  ariaLabel?: string;
  wrapperSx?: SxProps<Theme>;
  IconProps?: SvgIconProps;
};

export const RemoveButton = ({
  onClick,
  tooltip = 'Delete',
  ariaLabel = 'Remove',
  wrapperSx = {},
  IconProps = {},
}: RemoveButtonProps) => (
  <Tooltip title={tooltip} sx={wrapperSx}>
    <IconButton size="small" aria-label={ariaLabel} onClick={onClick} sx={{ pt: '7px', pb: '3px' }}>
      <DeleteOutlineIcon fontSize="medium" {...IconProps} />
    </IconButton>
  </Tooltip>
);
