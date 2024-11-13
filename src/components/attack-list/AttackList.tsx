import React, { Fragment } from 'react';
import { useAtom } from 'jotai';
import { AttackAtomsAtom } from './atoms';
import { AttackItem } from './AttackItem';
import { Grid2 as Grid } from '@mui/material';

const AttackListHeader = () => <></>;

export const AttackList = () => {
  const [attacks] = useAtom(AttackAtomsAtom);
  return (
    // <List component={StyledPaper} sx={{ py: 0 }}>
    <Grid container spacing={1}>
      {attacks.map((attackAtom, index) => (
        <Fragment key={index}>
          {/*<ListItem>*/}
          <AttackItem attackAtom={attackAtom} />
          {/*</ListItem>*/}
          {/*{index < attacks.length - 1 && <Divider component="li" />}*/}
        </Fragment>
      ))}
    </Grid>
    // </List>
  );
};
