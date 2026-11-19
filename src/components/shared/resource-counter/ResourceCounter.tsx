import { Box, Dialog, DialogTitle, List, ListItemButton, ListItemText, Typography } from '@mui/material';
import { useAtomValue, useSetAtom, useStore } from 'jotai';
import { splitAtom } from 'jotai/utils';
import { Atom } from 'jotai/vanilla';
import { PrimitiveAtom } from 'jotai/vanilla/atom';
import React, { memo, useCallback, useMemo, useState } from 'react';
import { EditableListHeader } from '../editable-list-header';
import { resourceCounterGridTemplateColumns, ResourceCounterRow } from './ResourceCounterRow';
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
  const [expandedOptionKey, setExpandedOptionKey] = useState<string | null>(null);

  const openPicker = useCallback(() => {
    const activeKeys = new Set(
      store
        .get(itemsAtom)
        .filter((item) => item.max > 0)
        .map(getKey)
    );
    setAvailableOptions(options.filter((option) => !activeKeys.has(option.key)));
    setExpandedOptionKey(null);
    setPickerOpen(true);
  }, [getKey, itemsAtom, options, store]);

  const addOption = (option: (typeof options)[number], selection?: (typeof options)[number]) => {
    if (!option) return;
    setItems((items) => {
      const existingItem = items.find((item) => getKey(item) === option.key);
      const newItem = createItem(option, selection);
      return existingItem
        ? items.map((item) => (getKey(item) === option.key ? { ...item, ...newItem, max: 1, usage: 0 } : item))
        : [...items, newItem];
    });
    setExpandedOptionKey(null);
    setPickerOpen(false);
  };

  return (
    <>
      <EditableListHeader label={title} addItem={openPicker} addItemLabel="Add" />
      <Dialog open={pickerOpen} onClose={() => { setPickerOpen(false); setExpandedOptionKey(null); }}>
        <DialogTitle>Add {title}</DialogTitle>
        <List>
          {availableOptions.length ? (
            availableOptions.map((option) => (
              <React.Fragment key={option.key}>
                <ListItemButton
                  onClick={() => {
                    if (option.children?.length) setExpandedOptionKey((key) => key === option.key ? null : option.key);
                    else addOption(option);
                  }}
                >
                  <ListItemText primary={option.label} />
                </ListItemButton>
                {expandedOptionKey === option.key && option.children?.map((selection) => (
                  <ListItemButton key={selection.key} sx={{ pl: 5 }} onClick={() => addOption(option, selection)}>
                    <ListItemText primary={selection.label} />
                  </ListItemButton>
                ))}
              </React.Fragment>
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
      sx={{ textTransform: 'uppercase', fontSize: '0.7rem' }}
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
  const { itemsAtom, getKey, getLabel, renderRow, showHeader = true } = props;
  const rowAtomsAtom = useMemo(() => splitAtom(itemsAtom, getKey), [itemsAtom, getKey]);

  return (
    <Box display={'grid'} component={StyledPaper} variant="outlined" sx={{ p: 1.25 }}>
      {showHeader && <ResourceCounterHeader {...props} />}
      <ResourceCounterColumnHeaders resourceLabel={props.resourceLabel} />
      <ResourceCounterRows rowsAtom={rowAtomsAtom} getKey={getKey} getLabel={getLabel} renderRow={renderRow} />
    </Box>
  );
}

export const ResourceCounter = memo(ResourceCounterComponent) as typeof ResourceCounterComponent;
