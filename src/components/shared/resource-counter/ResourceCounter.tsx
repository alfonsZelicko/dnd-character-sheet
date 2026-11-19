import { Box, Dialog, DialogTitle, List, ListItemButton, ListItemText, Typography } from '@mui/material';
import { useAtomValue, useSetAtom, useStore } from 'jotai';
import { splitAtom } from 'jotai/utils';
import { Atom } from 'jotai/vanilla';
import { PrimitiveAtom } from 'jotai/vanilla/atom';
import React, { memo, useCallback, useMemo, useState } from 'react';
import { EditableListHeader } from '../editable-list-header';
import { ResourceCounterRow, resourceCounterGridTemplateColumns } from './ResourceCounterRow';
import { CountedResource, ResourceCounterProps } from './types';
import { StyledPaper } from '../PaperWrapper';

type ResourceCounterRowsProps<T extends CountedResource> = {
  rowsAtom: Atom<PrimitiveAtom<T>[]>;
  getKey: (item: T) => string;
  getLabel: (item: T) => string;
  renderRow?: (item: T, itemAtom: PrimitiveAtom<T>) => React.ReactNode;
};

function ResourceCounterRowsComponent<T extends CountedResource>({
  rowsAtom,
  getKey,
  getLabel,
  renderRow,
}: ResourceCounterRowsProps<T>) {
  const rowAtoms = useAtomValue(rowsAtom);
  const store = useStore();

  return (
    <>
      {rowAtoms.map((itemAtom) => {
        const item = store.get(itemAtom);
        if (renderRow) return renderRow(item, itemAtom);
        return <ResourceCounterRow key={getKey(item)} itemAtom={itemAtom} label={getLabel(item)} />;
      })}
    </>
  );
}

const ResourceCounterRows = memo(ResourceCounterRowsComponent) as typeof ResourceCounterRowsComponent;

function ResourceCounterHeaderComponent<T extends CountedResource>({
  itemsAtom,
  options,
  getKey,
  createItem,
  title,
}: ResourceCounterProps<T>) {
  const setItems = useSetAtom(itemsAtom);
  const store = useStore();
  const [pickerOpen, setPickerOpen] = useState(false);
  const [availableOptions, setAvailableOptions] = useState<typeof options>([]);

  const openPicker = useCallback(() => {
    const activeKeys = new Set(
      store
        .get(itemsAtom)
        .filter((item) => item.max > 0)
        .map(getKey)
    );
    setAvailableOptions(options.filter((option) => !activeKeys.has(option.key)));
    setPickerOpen(true);
  }, [getKey, itemsAtom, options, store]);

  const addOption = (key: string) => {
    const option = options.find((candidate) => candidate.key === key);
    if (!option) return;
    setItems((items) => {
      const existingItem = items.find((item) => getKey(item) === option.key);
      return existingItem
        ? items.map((item) => (getKey(item) === option.key ? { ...item, max: 1, usage: 0 } : item))
        : [...items, createItem(option)];
    });
    setPickerOpen(false);
  };

  return (
    <>
      <EditableListHeader label={title} addItem={openPicker} addItemLabel="Add" />
      <Dialog open={pickerOpen} onClose={() => setPickerOpen(false)}>
        <DialogTitle>Add {title}</DialogTitle>
        <List>
          {availableOptions.length ? (
            availableOptions.map((option) => (
              <ListItemButton key={option.key} onClick={() => addOption(option.key)}>
                <ListItemText primary={option.label} />
              </ListItemButton>
            ))
          ) : (
            <ListItemText sx={{ px: 3, py: 1 }} primary="All resources are already added" />
          )}
        </List>
      </Dialog>
    </>
  );
}

const ResourceCounterHeader = memo(ResourceCounterHeaderComponent) as typeof ResourceCounterHeaderComponent;

const ResourceCounterColumnHeaders = memo(function ResourceCounterColumnHeaders() {
  return (
    <Box
      display="grid"
      gridTemplateColumns={resourceCounterGridTemplateColumns}
      alignItems="center"
      sx={{ textTransform: 'uppercase', fontSize: '0.7rem' }}
    >
      <Typography variant="caption" textAlign="center">
        Max.
      </Typography>
      <Typography variant="caption" textAlign="center">
        Resource
      </Typography>
      <Typography variant="caption" textAlign="center">
        Usage
      </Typography>
    </Box>
  );
});

function ResourceCounterComponent<T extends CountedResource>(props: ResourceCounterProps<T>) {
  const { itemsAtom, getKey, getLabel, renderRow } = props;
  const rowAtomsAtom = useMemo(() => splitAtom(itemsAtom, getKey), [itemsAtom, getKey]);

  return (
    <Box display={'grid'} component={StyledPaper} variant="outlined" sx={{ p: 1.25 }}>
      <ResourceCounterHeader {...props} />
      <ResourceCounterColumnHeaders />
      <ResourceCounterRows rowsAtom={rowAtomsAtom} getKey={getKey} getLabel={getLabel} renderRow={renderRow} />
    </Box>
  );
}

export const ResourceCounter = memo(ResourceCounterComponent) as typeof ResourceCounterComponent;
