import { SxProps, Theme } from '@mui/material';

const NOTE_LINE_HEIGHT_REM = 1.5;
const PADDING = '4px';
const NOTE_LINE_HEIGHT = `${NOTE_LINE_HEIGHT_REM}rem`;
const NOTE_LINE_BACKGROUND = `repeating-linear-gradient(
  to bottom,
  transparent,
  transparent calc(${NOTE_LINE_HEIGHT} - 1px),
  #d3d3d3 calc(${NOTE_LINE_HEIGHT} - 1px),
  #d3d3d3 ${NOTE_LINE_HEIGHT}
)`;

export const getNotesSx = (rowCount: number, fullWidth: boolean): SxProps<Theme> => ({
  display: 'flex',
  flexDirection: 'column',
  boxSizing: 'border-box',
  // set minHeight precisely to the product of lines + fixed paddings (2 * 4px = 8px / 0.5rem).
  minHeight:
    Number.isFinite(rowCount) && rowCount > 0
      ? `calc(${rowCount * NOTE_LINE_HEIGHT_REM}rem + ${PADDING} + ${PADDING})`
      : undefined,
  position: 'relative',
  width: fullWidth ? '100%' : undefined,
  overflow: 'hidden',
  '& .notes-editor-frame': {
    display: 'flex',
    flexDirection: 'column',
    flex: 1,
    minWidth: 0,
    overflow: 'auto',
    '& > div': {
      display: 'flex',
      flexDirection: 'column',
      flex: 1,
      minWidth: 0,
    },
  },
  '& .notes-editor-content': {
    boxSizing: 'border-box',
    flex: 1,
    width: '100%',
    margin: 0,
    padding: PADDING,
    outline: 0,
    overflowWrap: 'anywhere',
    whiteSpace: 'pre-wrap',
    position: 'relative',
    fontFamily: 'Special Elite',
    fontSize: '1rem',
    fontWeight: 200,
    lineHeight: NOTE_LINE_HEIGHT,
    '&::before': {
      position: 'absolute',
      zIndex: 0,
      // background based on padding value
      top: PADDING,
      bottom: PADDING,
      left: PADDING,
      right: PADDING,
      content: '""',
      pointerEvents: 'none',
      backgroundImage: NOTE_LINE_BACKGROUND,
      backgroundSize: `100% ${NOTE_LINE_HEIGHT}`,
      backgroundPosition: 'top left',
      backgroundPositionY: '-0.3rem',
    },
    '& p': {
      position: 'relative',
      zIndex: 1,
      minHeight: NOTE_LINE_HEIGHT,
      margin: 0,
      lineHeight: NOTE_LINE_HEIGHT,
    },
    '& strong': { fontWeight: 700 },
    '& em': { fontStyle: 'italic' },
    '& u': { textDecoration: 'underline' },
    '& ul, & ol': { margin: 0, paddingLeft: '1.5rem' },
    '& p.is-editor-empty:first-of-type::before': {
      color: 'text.disabled',
      content: 'attr(data-placeholder)',
      float: 'left',
      height: 0,
      pointerEvents: 'none',
    },
  },
});
