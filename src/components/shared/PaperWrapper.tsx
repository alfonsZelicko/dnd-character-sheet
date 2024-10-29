import { Paper, styled } from '@mui/material';
import { dottedBorder } from '../../utils';

export const StyledPaper = styled(Paper)({
  backgroundColor: 'transparent',
  border: dottedBorder,
  boxShadow: 'none',
  padding: '8px',
});
