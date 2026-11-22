import { Box, Checkbox, Tooltip } from '@mui/material';
import { PrimitiveAtom } from 'jotai/vanilla/atom';
import { useAtomValue, useSetAtom } from 'jotai';
import { selectAtom } from 'jotai/utils';
import React, { ReactNode } from 'react';
import { CountedResource } from './types';
import {
  resourceUsageIconCheckboxSx,
  resourceUsageIconsLabelSx,
  resourceUsageIconsRowSx,
  resourceUsageIconsSx,
} from './styles';
import { toggleCounterValue } from './counter-utils';
import SvgIcon, { SvgIconProps } from '@mui/material/SvgIcon';

export function SquareRadioIcon(props: SvgIconProps) {
  return (
    <SvgIcon {...props} viewBox="0 0 24 24">
      <rect x="3" y="3" width="18" height="18" rx="2" ry="2" fill="none" stroke="currentColor" strokeWidth="2" />
    </SvgIcon>
  );
}

export function SquareRadioCheckedIcon(props: SvgIconProps) {
  return (
    <SvgIcon {...props} viewBox="0 0 24 24">
      <rect x="3" y="3" width="18" height="18" rx="2" ry="2" fill="none" stroke="currentColor" strokeWidth="2" />
      <rect x="6" y="6" width="12" height="12" rx="1" ry="1" fill="currentColor" />
    </SvgIcon>
  );
}

export type ResourceUsageIconsProps<T extends CountedResource> = {
  itemAtom: PrimitiveAtom<T>;
  label: string;
  icon?: ReactNode;
  checkedIcon?: ReactNode;
  max?: number;
};

export function ResourceUsageIcons<T extends CountedResource>({
  itemAtom,
  label,
  icon = <SquareRadioIcon fontSize="small" />,
  checkedIcon = <SquareRadioCheckedIcon fontSize="small" />,
  max,
}: ResourceUsageIconsProps<T>) {
  const usageAtom = React.useMemo(() => selectAtom(itemAtom, (item) => item.usage), [itemAtom]);
  const itemMaxAtom = React.useMemo(() => selectAtom(itemAtom, (item) => item.max), [itemAtom]);
  const usage = useAtomValue(usageAtom);
  const itemMax = useAtomValue(itemMaxAtom);
  const setItem = useSetAtom(itemAtom);
  const slots = max ?? itemMax;

  if (itemMax < 1) return null;

  const toggleUsage = (index: number) => {
    setItem((current) => ({
      ...current,
      usage: Math.min(current.max, toggleCounterValue(current.usage, index + 1)),
    }));
  };

  return (
    <Box sx={resourceUsageIconsRowSx}>
      <Tooltip title={label}>
        <Box component="span" sx={resourceUsageIconsLabelSx}>
          {label}
        </Box>
      </Tooltip>
      <Box sx={resourceUsageIconsSx}>
        {Array.from({ length: Math.max(0, slots) }, (_, index) => (
          <Checkbox
            key={index}
            size="small"
            checked={index < usage}
            onChange={() => toggleUsage(index)}
            icon={icon}
            checkedIcon={checkedIcon}
            inputProps={{ 'aria-label': `${label} usage ${index + 1}` }}
            sx={resourceUsageIconCheckboxSx}
          />
        ))}
      </Box>
    </Box>
  );
}
