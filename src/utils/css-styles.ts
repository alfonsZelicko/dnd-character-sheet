import { SxProps } from '@mui/material';
import { Property } from 'csstype';

export const ellipsisWrapper: SxProps = {
  textOverflow: 'ellipsis',
  overflow: 'hidden',
  whiteSpace: 'nowrap',
};

export const dottedBorder: Property.Border = '1px dotted rgba(132,110,84,0.50)';

export function mergeStyles<T extends object>(...styles: T[]): T {
  return Object.assign({}, ...styles);
}
