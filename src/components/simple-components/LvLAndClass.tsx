import { useAtom } from 'jotai/index';
import { NumberTextFieldInput } from '../shared';
import React from 'react';
import { classAtom, levelAtom } from './atoms';

export const LvlAndClass = () => {
  const [level, setLevel] = useAtom(levelAtom);
  const [classes, setClasses] = useAtom(classAtom);

  return (
    <NumberTextFieldInput
      TextFieldProps={{
        value: classes,
        onChange: (e) => setClasses(e.target.value),
        label: 'Level & class',
        fullWidth: true,
      }}
      NumberInputProps={{
        value: level,
        onChange: (event: any) => setLevel(+event.target.value),
      }}
    />
  );
};
