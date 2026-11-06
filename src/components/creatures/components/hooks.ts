import { useAtomValue, useSetAtom } from 'jotai';
import { selectAtom } from 'jotai/utils';
import { PrimitiveAtom } from 'jotai/vanilla/atom';
import { useCallback, useMemo } from 'react';
import { CreatureType } from '../types';

export type NumericCreatureField = {
  [K in keyof CreatureType]: CreatureType[K] extends number ? K : never;
}[keyof CreatureType];

export const useCreatureNumberField = <K extends NumericCreatureField>(atom: PrimitiveAtom<CreatureType>, field: K) => {
  const fieldAtom = useMemo(() => selectAtom(atom, (s) => s[field]), [atom, field]);

  const value = useAtomValue(fieldAtom);
  const set = useSetAtom(atom);

  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      set(
        (prev) =>
          ({
            ...prev,
            [field]: Number(e.target.value),
          }) as CreatureType
      );
    },
    [set, field]
  );

  return { value, handleChange };
};
