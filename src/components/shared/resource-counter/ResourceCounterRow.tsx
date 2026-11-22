import { Box } from '@mui/material';
import { useAtomValue, useSetAtom } from 'jotai';
import { selectAtom } from 'jotai/utils';
import { PrimitiveAtom } from 'jotai/vanilla/atom';
import React, { memo, useEffect, useMemo } from 'react';
import { StandardNumberInput, StyledStandardTextField } from '../number-input';
import { removeLeadingZeros } from '../../../features/utils';
import { CountedResource, ResourceCounterRowProps } from './types';
import { resourceCounterInputSx, resourceCounterLabelSx, resourceCounterRowSx } from './styles';
export { resourceCounterGridTemplateColumns, resourceCounterInputSx, resourceCounterLabelSx } from './styles';

type ResourceFieldProps<T extends CountedResource> = { itemAtom: PrimitiveAtom<T> };

function ResourceMaxInputComponent<T extends CountedResource>({ itemAtom }: ResourceFieldProps<T>) {
  const maxAtom = useMemo(() => selectAtom(itemAtom, (item) => item.max), [itemAtom]);
  const max = useAtomValue(maxAtom);
  const setItem = useSetAtom(itemAtom);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = Number(event.target.value);
    const maxValue = Number.isFinite(value) ? Math.max(0, value) : 0;
    setItem((current) => ({ ...current, max: maxValue, usage: Math.min(current.usage, maxValue) }));
  };

  return (
    <StandardNumberInput
      onChange={handleChange}
      name="max"
      value={removeLeadingZeros(max)}
      fullWidth
      sx={resourceCounterInputSx}
    />
  );
}

const ResourceMaxInput = memo(ResourceMaxInputComponent) as typeof ResourceMaxInputComponent;

function ResourceUsageInputComponent<T extends CountedResource>({ itemAtom }: ResourceFieldProps<T>) {
  const stateAtom = useMemo(
    () =>
      selectAtom(
        itemAtom,
        ({ max, usage }) => ({ max, usage }),
        (a, b) => a.max === b.max && a.usage === b.usage
      ),
    [itemAtom]
  );
  const { max, usage } = useAtomValue(stateAtom);
  const setItem = useSetAtom(itemAtom);

  useEffect(() => {
    if (usage > max) setItem((current) => ({ ...current, usage: current.max }));
  }, [max, setItem, usage]);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = Number(event.target.value);
    const usageValue = Number.isFinite(value) ? Math.max(0, value) : 0;
    setItem((current) => ({ ...current, usage: Math.min(current.max, usageValue) }));
  };

  return (
    <StandardNumberInput
      onChange={handleChange}
      name="usage"
      value={removeLeadingZeros(Math.min(usage, max))}
      inputProps={{ min: 0, max, step: 1 }}
      fullWidth
      sx={resourceCounterInputSx}
    />
  );
}

const ResourceUsageInput = memo(ResourceUsageInputComponent) as typeof ResourceUsageInputComponent;

function ResourceCounterRowComponent<T extends CountedResource>({ itemAtom, label }: ResourceCounterRowProps<T>) {
  const maxAtom = useMemo(() => selectAtom(itemAtom, (item) => item.max), [itemAtom]);
  const max = useAtomValue(maxAtom);

  if (max < 1) return null;

  return (
    <Box sx={resourceCounterRowSx}>
      <ResourceMaxInput itemAtom={itemAtom} />
      <StyledStandardTextField fullWidth disabled variant="standard" type="text" value={label} sx={resourceCounterLabelSx} />
      <ResourceUsageInput itemAtom={itemAtom} />
    </Box>
  );
}

export const ResourceCounterRow = memo(ResourceCounterRowComponent) as typeof ResourceCounterRowComponent;
