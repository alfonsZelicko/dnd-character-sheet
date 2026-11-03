import React, { ReactNode, useState } from 'react';
import { Button, CircularProgress, Dialog, DialogActions, DialogContent, DialogTitle, Stack, Typography } from '@mui/material';
import {
  markDemoCharacterChoice,
  needsDemoCharacterSeed,
  seedDemoCharacterIfEmpty,
} from './characterData';

export const FirstRunDialog = ({ children }: { children: ReactNode }) => {
  const [open, setOpen] = useState(() => needsDemoCharacterSeed());
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleStartBlank = () => {
    markDemoCharacterChoice();
    setOpen(false);
  };

  const handleLoadDemo = async () => {
    setLoading(true);
    setError('');

    try {
      const demoCharacterUrl = new URL('demo-character.json', window.location.href);
      const response = await fetch(demoCharacterUrl);
      if (!response.ok) throw new Error('The demo character file is not available yet.');

      const wasSeeded = seedDemoCharacterIfEmpty(await response.text());
      if (!wasSeeded) throw new Error('The demo character file does not contain character data.');

      window.location.reload();
    } catch (loadError) {
      setError(loadError instanceof Error ? loadError.message : 'The demo character could not be loaded.');
      setLoading(false);
    }
  };

  return (
    <>
      {children}
      <Dialog open={open} aria-labelledby="first-run-dialog-title" disableEscapeKeyDown>
        <DialogTitle id="first-run-dialog-title">Welcome to the DnD Character Sheet</DialogTitle>
        <DialogContent>
          <Stack spacing={1}>
            <Typography>Would you like to explore the app with a sample character, or start with a blank sheet?</Typography>
            {error && (
              <Typography color="error" role="alert">
                {error}
              </Typography>
            )}
          </Stack>
        </DialogContent>
        <DialogActions sx={{ px: 3, pb: 2, justifyContent: 'space-between', gap: 1 }}>
          <Button onClick={handleStartBlank} disabled={loading}>
            Start with a blank sheet
          </Button>
          <Button variant="contained" onClick={handleLoadDemo} disabled={loading}>
            {loading ? <CircularProgress size={20} color="inherit" /> : 'Load sample character'}
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};
