import { MainContainer } from './pages';
import React from 'react';
import { GlobalStyles } from '@mui/material';

export const App = () => (
  <>
    <GlobalStyles
      styles={{
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
    <MainContainer />
  </>
);

export default App;
