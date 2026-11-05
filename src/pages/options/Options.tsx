import {
  Button,
  ButtonGroup,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Divider,
  FormControlLabel,
  Checkbox,
  Grid2 as Grid,
  Menu,
  MenuItem,
  Stack,
  Tooltip,
  Typography,
} from '@mui/material';
import React, { memo, useCallback, useMemo, useRef, useState } from 'react';
import { exportLocalStorageToJSON, importJSONFileToLocalStorage } from '../../features/utils';
import FileDownloadOutlinedIcon from '@mui/icons-material/FileDownloadOutlined';
import FileUploadOutlinedIcon from '@mui/icons-material/FileUploadOutlined';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import { useAtom, useAtomValue, useSetAtom } from 'jotai';
import { selectAtom } from 'jotai/utils';
import { showIncDecButtonsAtom } from '../../components/shared/number-input/inc-dec-buttons/atoms';
import { ApplyCharaPicMask } from '../../components/character-image/atoms';
import { DefaultThemeColors, ThemeColors, themeColorsAtom } from '../../utils/colors';
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

// ─── Character data section ───────────────────────────────────────────────────
// No atoms — local state only, never causes atom-driven rerenders.

const CharacterDataSection = memo(function CharacterDataSection() {
  const importInputRef = useRef<HTMLInputElement>(null);
  const [exportMenuAnchor, setExportMenuAnchor] = useState<null | HTMLElement>(null);
  const [confirmResetOpen, setConfirmResetOpen] = useState(false);

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
    <>
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
          <Stack
            direction={{ xs: 'column', sm: 'row' }}
            alignItems={{ sm: 'center' }}
            justifyContent="space-between"
            spacing={1}
          >
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
            This will permanently remove this character's saved data from this browser. App settings will not be
            changed.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setConfirmResetOpen(false)}>Cancel</Button>
          <Button color="error" variant="contained" onClick={handleResetCharacter}>
            Reset character
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
});

// ─── Display settings section ─────────────────────────────────────────────────
// Two separate components — each subscribes to exactly one atom.

const ApplyMaskCheckbox = memo(function ApplyMaskCheckbox() {
  const [applyMask, setApplyMask] = useAtom(ApplyCharaPicMask);

  return (
    <FormControlLabel
      control={
        <Checkbox
          checked={!!applyMask}
          onChange={(e) => setApplyMask(e.target.checked)}
        />
      }
      label="Apply character image mask"
    />
  );
});

const ShowIncDecCheckbox = memo(function ShowIncDecCheckbox() {
  const [showBtns, setShowBtns] = useAtom(showIncDecButtonsAtom);

  return (
    <FormControlLabel
      control={
        <Checkbox
          checked={showBtns}
          onChange={(e) => setShowBtns(e.target.checked)}
        />
      }
      label="Show increment/decrement buttons"
    />
  );
});

const DisplaySettingsSection = memo(function DisplaySettingsSection() {
  return (
    <Grid container size={12} component={StyledPaper} direction="column">
      <Stack spacing={0.5}>
        <Typography variant="h6" component="h2">
          Display settings
        </Typography>
        <ApplyMaskCheckbox />
        <ShowIncDecCheckbox />
      </Stack>
    </Grid>
  );
});

// ─── Character preview section ────────────────────────────────────────────────

const WeaponCountInput = memo(function WeaponCountInput() {
  const [previewWeaponCount, setPreviewWeaponCount] = useAtom(optionsWeaponsOnPreviewAtom);

  return (
    <StandardNumberInput
      name="preview-weapon-count"
      value={previewWeaponCount}
      onChange={(event) => setPreviewWeaponCount(Math.max(0, Math.floor(Number(event.target.value) || 0)))}
      aria-label="Weapons shown on Character Preview"
      fullWidth={false}
      sx={{ width: 56, textAlign: 'center' }}
      variant="standard"
    />
  );
});

const CharacterPreviewSection = memo(function CharacterPreviewSection() {
  return (
    <Grid container size={12} component={StyledPaper} direction="column">
      <Stack spacing={1.5}>
        <Typography variant="h6" component="h2">
          Character Preview
        </Typography>
        <Stack direction="row" alignItems="center" justifyContent="space-between" spacing={2}>
          <Typography component="label" htmlFor="preview-weapon-count">
            Weapons shown on Character Preview
          </Typography>
          <WeaponCountInput />
        </Stack>
      </Stack>
    </Grid>
  );
});

// ─── App colors section ───────────────────────────────────────────────────────
// One component per color key — each subscribes only to its own slice of themeColorsAtom.

type ColorKey = keyof ThemeColors;

const colorLabels: Record<ColorKey, string> = {
  main: 'Accent color',
  content: 'Panel background',
  input: 'Text color',
};

const ThemeColorPicker = memo(function ThemeColorPicker({ colorKey }: { colorKey: ColorKey }) {
  const colorAtom = useMemo(() => selectAtom(themeColorsAtom, (c) => c[colorKey]), [colorKey]);
  const color = useAtomValue(colorAtom);
  const setColors = useSetAtom(themeColorsAtom);
  const label = colorLabels[colorKey];

  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setColors((current) => ({ ...current, [colorKey]: e.target.value }));
    },
    [setColors, colorKey],
  );

  const handleReset = useCallback(() => {
    setColors((current) => ({ ...current, [colorKey]: DefaultThemeColors[colorKey] }));
  }, [setColors, colorKey]);

  return (
    <Stack
      direction="row"
      alignItems="center"
      justifyContent="space-between"
      spacing={2}
      sx={{ minHeight: 42 }}
    >
      <Typography component="label" htmlFor={`theme-color-${colorKey}`}>
        {label}
      </Typography>
      <Stack direction="row" alignItems="center" spacing={1}>
        <input
          id={`theme-color-${colorKey}`}
          type="color"
          value={getColorPickerValue(color)}
          onChange={handleChange}
          aria-label={label}
          style={{ width: 48, height: 36, padding: 2, cursor: 'pointer' }}
        />
        <Button size="small" onClick={handleReset} aria-label={`Reset ${label.toLowerCase()} to default`}>
          Default
        </Button>
      </Stack>
    </Stack>
  );
});

const AppColorsSection = memo(function AppColorsSection() {
  const setColors = useSetAtom(themeColorsAtom);

  return (
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
          {(Object.keys(colorLabels) as ColorKey[]).map((key) => (
            <ThemeColorPicker key={key} colorKey={key} />
          ))}
        </Stack>
      </Stack>
    </Grid>
  );
});

// ─── Options page ─────────────────────────────────────────────────────────────

export const Options = () => {
  return (
    <Stack spacing={2.5} sx={{ width: '100%', maxWidth: 640, mx: 'auto', p: { xs: 2, sm: 3 } }}>
      <Typography variant="h5" component="h1">
        Options
      </Typography>
      <Typography variant="caption" color="text.secondary" sx={{ textAlign: 'right', mt: -2 }}>
        Version {APP_VERSION}
      </Typography>

      <CharacterDataSection />
      <DisplaySettingsSection />
      <CharacterPreviewSection />
      <AppColorsSection />
    </Stack>
  );
};
