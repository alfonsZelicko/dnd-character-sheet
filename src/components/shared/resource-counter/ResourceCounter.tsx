import { Box, Typography } from '@mui/material';
import { useAtomValue, useStore } from 'jotai';
import { selectAtom, splitAtom } from 'jotai/utils';
import React, { Fragment, memo, useMemo } from 'react';
import { EditableListHeader } from '../editable-list-header';
import { ResourceCounterRow } from './ResourceCounterRow';
import { CountedResource, ResourceCounterProps, ResourceCounterRowSlotProps, ResourceCounterRowsProps } from './types';
import { StyledPaper } from '../PaperWrapper';
import { ResourceCounterPickerDialog } from './ResourceCounterPickerDialog';
import { ResourceUsageIcons } from './ResourceUsageIcons';
import { resourceCounterColumnHeadersSx, resourceCounterGridTemplateColumns, resourceCounterPaperSx } from './styles';

function ResourceCounterRowsComponent<T extends CountedResource>({
  rowsAtom,
  getKey,
  getLabel,
  renderRow,
  display = 'counter',
}: ResourceCounterRowsProps<T>) {
  const rowAtoms = useAtomValue(rowsAtom);
  const store = useStore();

  return (
    <>
      {rowAtoms.map((itemAtom) => (
        <ResourceCounterRowSlot
          key={getKey(store.get(itemAtom))}
          itemAtom={itemAtom}
          getLabel={getLabel}
          renderRow={renderRow}
          display={display}
        />
      ))}
    </>
  );
}

const areResourceItemsEqual = <T extends CountedResource>(a: T, b: T) =>
  a.max === b.max && a.usage === b.usage && Object.keys(a).every((key) => a[key as keyof T] === b[key as keyof T]);

function ResourceCounterRowSlotComponent<T extends CountedResource>({
  itemAtom,
  getLabel,
  renderRow,
  display,
}: ResourceCounterRowSlotProps<T>) {
  const itemAtomValue = useMemo(() => selectAtom(itemAtom, (item) => item, areResourceItemsEqual), [itemAtom]);
  const item = useAtomValue(itemAtomValue);
  const customRow = renderRow?.(item, itemAtom);
  if (customRow !== undefined) return customRow;
  if (display === 'usage-icons') return <ResourceUsageIcons itemAtom={itemAtom} label={getLabel(item)} />;
  return <ResourceCounterRow itemAtom={itemAtom} label={getLabel(item)} />;
}

const ResourceCounterRowSlot = memo(ResourceCounterRowSlotComponent) as typeof ResourceCounterRowSlotComponent;

const ResourceCounterRows = memo(ResourceCounterRowsComponent) as typeof ResourceCounterRowsComponent;

const ResourceCounterColumnHeaders = memo(function ResourceCounterColumnHeaders({
  resourceLabel = 'Resource',
}: {
  resourceLabel?: string;
}) {
  return (
    <Box
      display="grid"
      gridTemplateColumns={resourceCounterGridTemplateColumns}
      alignItems="center"
      sx={resourceCounterColumnHeadersSx}
    >
      <Typography variant="caption" textAlign="center">
        Max.
      </Typography>
      <Typography variant="caption" textAlign="center">
        {resourceLabel}
      </Typography>
      <Typography variant="caption" textAlign="center">
        Usage
      </Typography>
    </Box>
  );
});

function ResourceCounterComponent<T extends CountedResource>(props: ResourceCounterProps<T>) {
  const { itemsAtom, getKey, getLabel, renderRow, showHeader = 'show', display = 'counter' } = props;
  const rowAtomsAtom = useMemo(() => splitAtom(itemsAtom, getKey), [itemsAtom, getKey]);

  return (
    <Box display={'grid'} component={StyledPaper} variant="outlined" sx={resourceCounterPaperSx}>
      {(props.showHeader === undefined || props.showHeader === 'show') && (
        <ResourceCounterPickerDialog
          itemsAtom={props.itemsAtom}
          options={props.options}
          getKey={props.getKey}
          title={props.title}
          createItem={props.createItem}
        />
      )}
      {showHeader === 'no-button' && <EditableListHeader label={props.title} addItem={undefined} />}
      {display === 'counter' && <ResourceCounterColumnHeaders resourceLabel={props.resourceLabel} />}
      <ResourceCounterRows
        rowsAtom={rowAtomsAtom}
        getKey={getKey}
        getLabel={getLabel}
        renderRow={renderRow}
        display={display}
      />
    </Box>
  );
}

export const ResourceCounter = memo(ResourceCounterComponent) as typeof ResourceCounterComponent;
