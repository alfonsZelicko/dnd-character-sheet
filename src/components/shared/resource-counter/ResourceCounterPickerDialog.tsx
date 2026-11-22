import {
  Box,
  Button,
  Collapse,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  List,
  ListItemButton,
  ListItemText,
  Radio,
  Typography,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import CheckIcon from '@mui/icons-material/Check';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import React, { useState } from 'react';
import { useSetAtom, useStore } from 'jotai';
import { EditableListHeader } from '../editable-list-header';
import {
  resourceCounterAddButtonSx,
  resourceCounterDialogActionsSx,
  resourceCounterDialogCloseSx,
  resourceCounterDialogContentSx,
  resourceCounterDialogPaperSx,
  resourceCounterDialogTitleSx,
  resourceCounterOptionChildrenSx,
  resourceCounterOptionExpandSx,
  resourceCounterOptionSx,
} from './styles';
import { CountedResource, ResourceCounterPickerDialogProps } from './types';

export function ResourceCounterPickerDialog<T extends CountedResource>({
  itemsAtom,
  options,
  getKey,
  createItem,
  title,
}: ResourceCounterPickerDialogProps<T>) {
  const setItems = useSetAtom(itemsAtom);
  const store = useStore();
  const [open, setOpen] = useState(false);
  const [availableOptions, setAvailableOptions] = useState<typeof options>([]);
  const [expandedOptionKey, setExpandedOptionKey] = useState<string | null>(null);
  const [selectedOption, setSelectedOption] = useState<{
    option: (typeof options)[number];
    selection?: (typeof options)[number];
  } | null>(null);

  const openPicker = () => {
    const activeKeys = new Set(
      store
        .get(itemsAtom)
        .filter((item) => item.max > 0)
        .map(getKey)
    );
    setAvailableOptions(options.filter((option) => !activeKeys.has(option.key)));
    setExpandedOptionKey(null);
    setSelectedOption(null);
    setOpen(true);
  };

  const closePicker = () => {
    setOpen(false);
    setExpandedOptionKey(null);
    setSelectedOption(null);
  };

  const addOption = () => {
    if (!selectedOption) return;
    const { option, selection } = selectedOption;
    setItems((items) => {
      const existingItem = items.find((item) => getKey(item) === option.key);
      const newItem = createItem(option, selection);
      return existingItem
        ? items.map((item) => (getKey(item) === option.key ? { ...item, ...newItem, max: 1, usage: 0 } : item))
        : [...items, newItem];
    });
    closePicker();
  };

  return (
    <>
      <EditableListHeader label={title} addItem={openPicker} addItemLabel="Add" />
      <Dialog
        open={open}
        onClose={closePicker}
        fullWidth
        maxWidth="sm"
        slotProps={{ paper: { sx: resourceCounterDialogPaperSx } }}
      >
        <DialogTitle sx={resourceCounterDialogTitleSx}>
          <Typography variant="h6" component="div" sx={{ fontWeight: 700 }}>
            Add {title}
          </Typography>
          <IconButton aria-label="Close" onClick={closePicker} edge="end" sx={resourceCounterDialogCloseSx}>
            <CloseIcon />
          </IconButton>
        </DialogTitle>
        <DialogContent dividers sx={resourceCounterDialogContentSx}>
          <List disablePadding>
            {availableOptions.length ? (
              availableOptions.map((option) => (
                <React.Fragment key={option.key}>
                  <ListItemButton
                    selected={selectedOption?.option.key === option.key && !selectedOption.selection}
                    sx={resourceCounterOptionSx}
                    onClick={() => {
                      setSelectedOption({ option });
                      if (option.children?.length)
                        setExpandedOptionKey((key) => (key === option.key ? null : option.key));
                    }}
                  >
                    {option.children?.length ? (
                      <Box sx={resourceCounterOptionExpandSx}>
                        {expandedOptionKey === option.key ? <ExpandLessIcon /> : <ExpandMoreIcon />}
                      </Box>
                    ) : (
                      <Radio checked={selectedOption?.option.key === option.key} sx={{ mr: 1, p: 0.75 }} />
                    )}
                    <ListItemText primary={option.label} />
                  </ListItemButton>
                  <Collapse in={expandedOptionKey === option.key} timeout="auto" unmountOnExit>
                    <List component="div" disablePadding sx={resourceCounterOptionChildrenSx}>
                      {option.children?.map((selection) => {
                        const isSelected =
                          selectedOption?.option.key === option.key && selectedOption.selection?.key === selection.key;
                        return (
                          <ListItemButton
                            key={selection.key}
                            selected={isSelected}
                            sx={resourceCounterOptionSx}
                            onClick={() => setSelectedOption({ option, selection })}
                          >
                            <Radio checked={isSelected} sx={{ mr: 1, p: 0.75 }} />
                            <ListItemText primary={selection.label} />
                            {isSelected && <CheckIcon color="success" fontSize="small" />}
                          </ListItemButton>
                        );
                      })}
                    </List>
                  </Collapse>
                </React.Fragment>
              ))
            ) : (
              <ListItemText sx={{ px: 2, py: 3, textAlign: 'center' }} primary="All resources are already added" />
            )}
          </List>
        </DialogContent>
        <DialogActions sx={resourceCounterDialogActionsSx}>
          <Button onClick={closePicker} color="inherit">
            Cancel
          </Button>
          <Button variant="contained" onClick={addOption} disabled={!selectedOption} sx={resourceCounterAddButtonSx}>
            Add
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
