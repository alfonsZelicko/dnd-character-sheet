import {
  Button,
  ButtonGroup,
  Checkbox,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Divider,
  FormControlLabel,
  Grid2 as Grid,
  Menu,
  MenuItem,
  Stack,
  Tooltip,
  Typography,
} from '@mui/material';
import React, { useRef, useState } from 'react';
import { exportLocalStorageToJSON, importJSONFileToLocalStorage } from '../../features/utils';
import FileDownloadOutlinedIcon from '@mui/icons-material/FileDownloadOutlined';
import FileUploadOutlinedIcon from '@mui/icons-material/FileUploadOutlined';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import { useAtom } from 'jotai';
import { showIncDecButtonsAtom } from '../../components/shared/number-input/inc-dec-buttons/atoms';
import { ApplyCharaPicMask } from '../../components/character-image/atoms';
import { DefaultThemeColors, themeColorsAtom } from '../../utils/colors';
import { optionsWeaponsOnPreviewAtom } from '../../components/attack-list/atoms';
import { StandardNumberInput, StyledPaper } from '../../components';
import { APP_VERSION } from '../../features/version';
import { resetCharacterData } from '../../features/characterData';

const getColorPickerValue = (color: string): string => {
  if (/^#[\da-f]{6}$/i.test(color)) return color;

  const rgba = color.match(/^rgba?\(\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)/i);
  if (!rgba) return '#000000';

  return `#${rgba
    .slice(1, 4)
    .map((channel) => Number(channel).toString(16).padStart(2, '0'))
    .join('')}`;
};

export const Options = () => {
  const [getShowHideBtns, setShowHideBtns] = useAtom(showIncDecButtonsAtom);
  const [getApplyMask, setApplyMask] = useAtom(ApplyCharaPicMask);
  const [colors, setColors] = useAtom(themeColorsAtom);
  const [previewWeaponCount, setPreviewWeaponCount] = useAtom(optionsWeaponsOnPreviewAtom);
  const importInputRef = useRef<HTMLInputElement>(null);
  const [exportMenuAnchor, setExportMenuAnchor] = useState<null | HTMLElement>(null);
  const [confirmResetOpen, setConfirmResetOpen] = useState(false);

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

  const handleResetCharacter = () => {
    resetCharacterData();
    window.location.reload();
  };

  return (
    <Stack spacing={2.5} sx={{ width: '100%', maxWidth: 640, mx: 'auto', p: { xs: 2, sm: 3 } }}>
      <Typography variant="h5" component="h1">
        Options
      </Typography>
      <Typography variant="caption" color="text.secondary" sx={{ textAlign: 'right', mt: -2 }}>
        Version {APP_VERSION}
      </Typography>

      <Grid container size={12} component={StyledPaper} direction="column">
        <Stack spacing={1.5}>
          <Typography variant="h6" component="h2">
            Character data
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Export your character or a full backup. Importing a character-only file keeps your current app settings.
          </Typography>
          <Stack direction={{ xs: 'column', sm: 'row' }} spacing={1.5} sx={{ pt: 0.5 }}>
            <ButtonGroup variant="outlined" aria-label="Character export options">
              <Tooltip title="Download this character as a JSON file without app settings." arrow>
                <Button startIcon={<FileDownloadOutlinedIcon />} onClick={() => exportLocalStorageToJSON(false)}>
                  Export character
                </Button>
              </Tooltip>
              <Tooltip title="Choose a full backup that also includes app settings." arrow>
                <Button
                  aria-label="Choose export type"
                  aria-haspopup="menu"
                  aria-expanded={Boolean(exportMenuAnchor)}
                  onClick={(event) => setExportMenuAnchor(event.currentTarget)}
                  sx={{ minWidth: 40, px: 0.5 }}
                >
                  <ArrowDropDownIcon />
                </Button>
              </Tooltip>
            </ButtonGroup>
            <Menu
              anchorEl={exportMenuAnchor}
              open={Boolean(exportMenuAnchor)}
              onClose={() => setExportMenuAnchor(null)}
            >
              <Tooltip title="Includes character data and app settings such as colors and display preferences." arrow>
                <MenuItem
                  onClick={() => {
                    setExportMenuAnchor(null);
                    exportLocalStorageToJSON(true);
                  }}
                >
                  <FileDownloadOutlinedIcon fontSize="small" sx={{ mr: 1 }} />
                  Full backup
                </MenuItem>
              </Tooltip>
            </Menu>
            <Tooltip title="Load character data from a JSON file. A full backup also restores its app settings." arrow>
              <Button
                variant="outlined"
                startIcon={<FileUploadOutlinedIcon />}
                onClick={() => importInputRef.current?.click()}
              >
                Import character
              </Button>
            </Tooltip>
            <input
              ref={importInputRef}
              type="file"
              accept="application/json,.json"
              onChange={handleImportFile}
              hidden
            />
          </Stack>
          <Divider sx={{ my: 1 }} />
          <Stack direction={{ xs: 'column', sm: 'row' }} alignItems={{ sm: 'center' }} justifyContent="space-between" spacing={1}>
            <Typography variant="body2" color="text.secondary">
              Remove this character's saved data. App settings will stay as they are.
            </Typography>
            <Tooltip title="Permanently clear the current character from this browser." arrow>
              <Button
                color="error"
                variant="outlined"
                startIcon={<DeleteOutlineIcon />}
                onClick={() => setConfirmResetOpen(true)}
                sx={{ alignSelf: { xs: 'flex-start', sm: 'auto' }, flexShrink: 0 }}
              >
                Reset character
              </Button>
            </Tooltip>
          </Stack>
        </Stack>
      </Grid>

      <Dialog open={confirmResetOpen} onClose={() => setConfirmResetOpen(false)}>
        <DialogTitle>Reset this character?</DialogTitle>
        <DialogContent>
          <DialogContentText>
            This will permanently remove this character's saved data from this browser. App settings will not be changed.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setConfirmResetOpen(false)}>Cancel</Button>
          <Button color="error" variant="contained" onClick={handleResetCharacter}>
            Reset character
          </Button>
        </DialogActions>
      </Dialog>

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
