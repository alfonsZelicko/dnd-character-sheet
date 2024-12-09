import { BoxProps, Grid2Props } from '@mui/material';

export type FeatType = {
  featName: string;
  featDescription: string;
};

export type FeatListProps = {
  GridProps?: Grid2Props;
  WrapperProps?: BoxProps;
};
