import { useAtom } from 'jotai';
import { nameAtom } from './atoms';
import React from 'react';
import { TextInput } from '../shared';

export const Name = () => {
  const [name, setName] = useAtom(nameAtom);

  return <TextInput value={name} onChange={(e) => setName(e.target.value)} label={'Name'} variant={'filled'} />;
};
