import { MainContainer } from './pages';
import React, { useMemo } from 'react';
import { CssBaseline, GlobalStyles, ThemeProvider } from '@mui/material';
import { BrowserRouter } from 'react-router-dom';
import { useAtomValue } from 'jotai';
import { themeColorsAtom } from './utils/colors';
import { createAppTheme } from './utils/theme';
import { FirstRunDialog } from './features/FirstRunDialog';

export const App = () => {
  const colors = useAtomValue(themeColorsAtom);
  const theme = useMemo(() => createAppTheme(colors.main), [colors.main]);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <GlobalStyles
        styles={{
          ':root': {
            '--app-main-color': colors.main,
            '--app-content-color': colors.content,
            '--app-input-color': colors.input,
          },
          '.control-arrow': { display: 'none' },
          '.slider': { all: 'unset' },
          body: {
            userSelect: 'none',
          },
          'input, textarea': {
            userSelect: 'text',
          },
        }}
      />
      <FirstRunDialog>
        <BrowserRouter>
          <MainContainer />
        </BrowserRouter>
      </FirstRunDialog>
    </ThemeProvider>
  );
};

export default App;
