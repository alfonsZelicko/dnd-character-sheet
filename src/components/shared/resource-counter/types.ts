import { ReactNode, SetStateAction } from 'react';
import { PrimitiveAtom, WritableAtom } from 'jotai/vanilla/atom';

export type CountedResource = { max: number; usage: number };
export type ResourceOption = { key: string; label: string };

export type ResourceCounterProps<T extends CountedResource> = {
  itemsAtom: WritableAtom<T[], [SetStateAction<T[]>], void>;
  options: readonly ResourceOption[];
  getKey: (item: T) => string;
  getLabel: (item: T) => string;
  createItem: (option: ResourceOption) => T;
  title: string;
  renderRow?: (item: T, itemAtom: PrimitiveAtom<T>) => ReactNode;
};

export type ResourceCounterRowProps<T extends CountedResource> = {
  itemAtom: PrimitiveAtom<T>;
  label: string;
};
