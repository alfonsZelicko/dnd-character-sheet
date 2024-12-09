import { TextInput } from '../../shared';
import React from 'react';
import { useAtom } from 'jotai';
import { nameAtom } from '../atoms';

export const Name = () => {
  const [name, setName] = useAtom(nameAtom);

  return (
    <TextInput
      size={'small'}
      value={name}
      onChange={(e) => setName(e.target.value)}
      label={'Companion Name'}
      variant={'filled'}
    />
  );
};
