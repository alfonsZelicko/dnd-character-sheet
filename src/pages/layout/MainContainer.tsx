import React, { ReactNode, useEffect } from 'react';
import { Box, Grid2 as Grid } from '@mui/material';

export const MainContainer = ({ children }: { children: ReactNode }) => {
  useEffect(() => {
    const handleResize = () => {
      const baseFontSize = Math.min(window.innerWidth / 60); // Maximum 16px
      document.documentElement.style.fontSize = `${baseFontSize}px`;
    };

    handleResize();
    window.addEventListener('resize', handleResize);

    return () => window.removeEventListener('resize', handleResize);
  }, []);
  return (
    <Grid
      container
      justifyContent="center"
      alignItems="center"
      sx={{
        height: '100vh',
        width: '100vw',
      }}
    >
      <Box
        sx={{
          width: '100%',
          maxWidth: 'calc(100vh * (16 / 9))', // Max šířka podle poměru 16:9
          aspectRatio: '16 / 9',
          m: 1,
        }}
      >
        {children}
      </Box>
    </Grid>
  );
};
