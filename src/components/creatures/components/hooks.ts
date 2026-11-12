import { useAtomValue, useSetAtom } from 'jotai';
import { selectAtom } from 'jotai/utils';
import { PrimitiveAtom } from 'jotai/vanilla/atom';
import { ChangeEvent, useCallback, useMemo } from 'react';
import { CreatureType } from '../types';

export type NumericCreatureField = {
  [K in keyof CreatureType]: CreatureType[K] extends number | string ? K : never;
}[keyof CreatureType];

export const useCreatureField = <K extends NumericCreatureField>(atom: PrimitiveAtom<CreatureType>, field: K) => {
  const fieldAtom = useMemo(() => selectAtom(atom, (s) => s[field]), [atom, field]);

  const value = useAtomValue(fieldAtom);
  const set = useSetAtom(atom);

  const handleChange = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      set((prev) => ({
        ...prev,
        [field]: typeof prev[field] === 'number' ? Number(e.target.value) : e.target.value,
      }));
    },
    [set, field]
  );

  return { value, handleChange };
};
