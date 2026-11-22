import { SxProps, Theme } from '@mui/material';

export const resourceCounterGridTemplateColumns = '3.5rem minmax(0, 1fr) 3.5rem';

export const resourceCounterInputSx = {
  width: '100%',
  minWidth: 0,
  '& input': { fontWeight: 200, fontFamily: 'monospace', fontSize: '0.9rem' },
};

export const resourceCounterLabelSx = {
  ...resourceCounterInputSx,
  '& input': {
    ...resourceCounterInputSx['& input'],
    textAlign: 'center',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
  },
};

export const resourceCounterRowSx = {
  display: 'grid',
  gridTemplateColumns: resourceCounterGridTemplateColumns,
  alignItems: 'center',
  width: '100%',
  minWidth: 0,
  borderBottom: 1,
  borderColor: 'divider',
};

export const resourceUsageIconsRowSx = { display: 'flex', alignItems: 'center', gap: 0.5, minWidth: 0, py: 0.25 };

export const resourceUsageIconsLabelSx = {
  flex: '1 1 auto',
  minWidth: 0,
  overflow: 'hidden',
  textOverflow: 'ellipsis',
  whiteSpace: 'nowrap',
  fontSize: '0.75rem',
};

export const resourceUsageIconsSx = { display: 'flex', flex: '0 0 auto', alignItems: 'center' };
export const resourceUsageIconCheckboxSx = { p: 0.25 };

export const resourceCounterDialogPaperSx = { borderRadius: 3, overflow: 'hidden' };
export const resourceCounterDialogTitleSx = { pr: 7, pb: 1 };
export const resourceCounterDialogCloseSx: SxProps<Theme> = {
  position: 'absolute',
  right: 20,
  top: 8,
};
export const resourceCounterDialogContentSx = { p: 1.5, maxHeight: 'min(65vh, 560px)' };
export const resourceCounterOptionSx = {
  borderRadius: 1.5,
  mb: 0.5,
  '&.Mui-selected': { bgcolor: 'action.selected' },
};
export const resourceCounterOptionChildrenSx = { ml: 2, pl: 1, borderLeft: 1, borderColor: 'divider' };
export const resourceCounterOptionExpandSx = {
  width: 36,
  display: 'flex',
  justifyContent: 'center',
  color: 'text.secondary',
  mr: 1,
};
export const resourceCounterDialogActionsSx = { px: 3, py: 2 };
export const resourceCounterAddButtonSx = { minWidth: 112, borderRadius: 2, textTransform: 'none', fontWeight: 700 };
export const resourceCounterColumnHeadersSx = { textTransform: 'uppercase', fontSize: '0.7rem' };
export const resourceCounterPaperSx = { p: 1.25 };
