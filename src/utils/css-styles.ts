import { SxProps, Theme } from '@mui/material';
import { Property } from 'csstype';

export const ellipsisWrapper: SxProps = {
  textOverflow: 'ellipsis',
  overflow: 'hidden',
  whiteSpace: 'nowrap',
};

export const dottedBorder: Property.Border = '1px dotted rgba(132,110,84,0.50)';

export const mergedPaperListSx = (): SxProps<Theme> => ({
  '& .paperItem': {
    borderRadius: 0,
  },
  '& .paperItem:first-of-type': (theme: Theme) => ({
    borderTopLeftRadius: theme.shape.borderRadius,
    borderTopRightRadius: theme.shape.borderRadius,
  }),
  '& .paperItem:last-of-type': (theme: Theme) => ({
    borderBottomLeftRadius: theme.shape.borderRadius,
    borderBottomRightRadius: theme.shape.borderRadius,
  }),
});

export const mergeSx = (...sxProps: (SxProps<Theme> | undefined)[]): SxProps<Theme> =>
  (sxProps || [])
    ?.filter(Boolean)
    .reduce((acc: SxProps<Theme>[], sx) => [...acc, ...(Array.isArray(sx) ? sx : [sx])], []) as SxProps<Theme>;

export const scrollBackgroundSx = {
  backgroundImage: 'url(src/assets/app-bg.png)',
  backgroundSize: 'cover',
  backgroundPosition: 'center center',
  backgroundRepeat: 'no-repeat',
};
