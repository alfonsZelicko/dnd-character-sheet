import React from 'react';
import { useAtom } from 'jotai/index';
import { TextInput } from '../../shared';
import { crAtom } from '../atoms';

export const CR = () => {
  const [cr, setCr] = useAtom(crAtom);

  return (
    <TextInput
      size={'small'}
      type={'number'}
      value={cr}
      onChange={(e) => setCr(+e.target.value)}
      label={'CR'}
      variant={'filled'}
    />
  );
};
