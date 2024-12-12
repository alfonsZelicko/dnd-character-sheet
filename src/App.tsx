import { MainContainer } from './pages';
import React from 'react';
import { GlobalStyles } from '@mui/material';
import { BrowserRouter } from 'react-router-dom';

export const App = () => (
  <>
    <BrowserRouter>
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
    </BrowserRouter>
  </>
);

export default App;
