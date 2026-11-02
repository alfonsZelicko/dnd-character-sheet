import { Button, Checkbox, FormControlLabel, Grid2 as Grid, Stack, Typography } from '@mui/material';
import React, { useRef } from 'react';
import { exportLocalStorageToJSON, importJSONFileToLocalStorage } from '../../features/utils';
import FileDownloadOutlinedIcon from '@mui/icons-material/FileDownloadOutlined';
import FileUploadOutlinedIcon from '@mui/icons-material/FileUploadOutlined';
import { useAtom } from 'jotai';
import { showIncDecButtonsAtom } from '../../components/shared/number-input/inc-dec-buttons/atoms';
import { ApplyCharaPicMask } from '../../components/character-image/atoms';
import { DefaultThemeColors, themeColorsAtom } from '../../utils/colors';
import { optionsWeaponsOnPreviewAtom } from '../../components/attack-list/atoms';
import { StandardNumberInput, StyledPaper } from '../../components';

const getColorPickerValue = (color: string): string => {
  if (/^#[\da-f]{6}$/i.test(color)) return color;

  const rgba = color.match(/^rgba?\(\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)/i);
  if (!rgba) return '#000000';

  return `#${rgba
    .slice(1, 4)
    .map((channel) => Number(channel).toString(16).padStart(2, '0'))
    .join('')}`;
};

export const Rest = () => {
  const [getShowHideBtns, setShowHideBtns] = useAtom(showIncDecButtonsAtom);
  const [getApplyMask, setApplyMask] = useAtom(ApplyCharaPicMask);
  const [colors, setColors] = useAtom(themeColorsAtom);
  const [previewWeaponCount, setPreviewWeaponCount] = useAtom(optionsWeaponsOnPreviewAtom);
  const importInputRef = useRef<HTMLInputElement>(null);

  const handleChangeShowIncDecBtns = (event: React.ChangeEvent<HTMLInputElement>) => {
    setShowHideBtns(event.target.checked);
  };

  const handleChangeApplyCharImgMask = (event: React.ChangeEvent<HTMLInputElement>) => {
    setApplyMask(event.target.checked);
  };

  const handleImportFile = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) await importJSONFileToLocalStorage(file);
    event.target.value = '';
  };

  return (
    <Stack spacing={2.5} sx={{ width: '100%', maxWidth: 640, mx: 'auto', p: { xs: 2, sm: 3 } }}>
      <Typography variant="h5" component="h1">
        What next?
      </Typography>

      <Grid container size={12} component={StyledPaper} direction="column">
        <Stack spacing={1.5}>
          <Typography variant="h6" component="h2">
            Character data
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Save a backup of your character or restore one from a JSON file.
          </Typography>
          <Stack direction={{ xs: 'column', sm: 'row' }} spacing={1.5} sx={{ pt: 0.5 }}>
            <Button variant="outlined" startIcon={<FileDownloadOutlinedIcon />} onClick={exportLocalStorageToJSON}>
              Character Export
            </Button>
            <Button
              variant="outlined"
              startIcon={<FileUploadOutlinedIcon />}
              onClick={() => importInputRef.current?.click()}
            >
              Character Import
            </Button>
            <input
              ref={importInputRef}
              type="file"
              accept="application/json,.json"
              onChange={handleImportFile}
              hidden
            />
          </Stack>
        </Stack>
      </Grid>

      <Grid container size={12} component={StyledPaper} direction="column">
        <Stack spacing={0.5}>
          <Typography variant="h6" component="h2">
            Display settings
          </Typography>
          <FormControlLabel
            control={<Checkbox checked={!!getApplyMask} onChange={handleChangeApplyCharImgMask} />}
            label="Apply character image mask"
          />
          <FormControlLabel
            control={<Checkbox checked={getShowHideBtns} onChange={handleChangeShowIncDecBtns} />}
            label="Show increment/decrement buttons"
          />
        </Stack>
      </Grid>

      <Grid container size={12} component={StyledPaper} direction="column">
        <Stack spacing={1.5}>
          <Typography variant="h6" component="h2">
            Character Preview
          </Typography>
          <Stack direction="row" alignItems="center" justifyContent="space-between" spacing={2}>
            <Typography component="label" htmlFor="preview-weapon-count">
              Weapons shown
            </Typography>
            <StandardNumberInput
              name="preview-weapon-count"
              value={previewWeaponCount}
              onChange={(event) => setPreviewWeaponCount(Math.max(0, Math.floor(Number(event.target.value) || 0)))}
              aria-label="Weapons shown on Character Preview"
              fullWidth={false}
              sx={{ width: 56, textAlign: 'center' }}
              variant="standard"
            />
          </Stack>
        </Stack>
      </Grid>

      <Grid container size={12} component={StyledPaper} direction="column">
        <Stack spacing={1.5}>
          <Stack direction="row" alignItems="center" justifyContent="space-between" spacing={1}>
            <Typography variant="h6" component="h2">
              App colors
            </Typography>
            <Button size="small" onClick={() => setColors(DefaultThemeColors)}>
              Reset to defaults
            </Button>
          </Stack>
          <Typography variant="body2" color="text.secondary">
            Choose the accent, panel background, and text colors used throughout the app.
          </Typography>
          <Stack spacing={1}>
            {(
              [
                ['main', 'Accent color'],
                ['content', 'Panel background'],
                ['input', 'Text color'],
              ] as const
            ).map(([key, label]) => (
              <Stack
                key={key}
                direction="row"
                alignItems="center"
                justifyContent="space-between"
                spacing={2}
                sx={{ minHeight: 42 }}
              >
                <Typography component="label" htmlFor={`theme-color-${key}`}>
                  {label}
                </Typography>
                <Stack direction="row" alignItems="center" spacing={1}>
                  <input
                    id={`theme-color-${key}`}
                    type="color"
                    value={getColorPickerValue(colors[key])}
                    onChange={(event) => setColors((current) => ({ ...current, [key]: event.target.value }))}
                    aria-label={label}
                    style={{ width: 48, height: 36, padding: 2, cursor: 'pointer' }}
                  />
                  <Button
                    size="small"
                    onClick={() => setColors((current) => ({ ...current, [key]: DefaultThemeColors[key] }))}
                    aria-label={`Reset ${label.toLowerCase()} to default`}
                  >
                    Default
                  </Button>
                </Stack>
              </Stack>
            ))}
          </Stack>
        </Stack>
      </Grid>
    </Stack>
  );
};
