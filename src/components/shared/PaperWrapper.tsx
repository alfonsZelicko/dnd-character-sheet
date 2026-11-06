import { Paper, styled } from '@mui/material';
import { dottedBorder } from '../../utils';

export const StyledPaper = styled(Paper)({
  backgroundColor: 'transparent', //alpha(theme.palette.primary.main, 0.1),
  // backdropFilter: 'blur(5px)',
  border: dottedBorder,
  boxShadow: 'none',
  padding: '8px',
});
