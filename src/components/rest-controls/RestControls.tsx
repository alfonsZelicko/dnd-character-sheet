import React, { memo } from 'react';
import { Button, ButtonProps, Grid2 as Grid, Tooltip } from '@mui/material';
import { getRestTypeAbbreviation, RestType } from '../features/types';
import { emitRest, restEventForType } from './restEvents';
import { RestMode } from './types';

const restTypes = [RestType.SR, RestType.LR, RestType.DW];

export type RestControlsProps = {
  mode?: Extract<RestMode, 'local-controls' | 'global-controls'>;
  onRest?: (restType: RestType) => void;
  ButtonProps?: ButtonProps;
};

export const RestControls = memo(({ mode = 'global-controls', onRest, ButtonProps = {} }: RestControlsProps) => (
  <Grid container size={12} justifyContent="right" spacing={1} paddingTop={1}>
    {restTypes.map((restType) => {
      return (
        <Tooltip key={restType} title={`Reset ${restType}`}>
          <Button
            size="small"
            onClick={() => {
              if (mode === 'global-controls') emitRest(restEventForType(restType));
              onRest?.(restType);
            }}
            {...ButtonProps}
          >
            {getRestTypeAbbreviation(restType)}
          </Button>
        </Tooltip>
      );
    })}
  </Grid>
));
