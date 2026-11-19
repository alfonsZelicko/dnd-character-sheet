import { ReactNode, SetStateAction } from 'react';
import { PrimitiveAtom, WritableAtom } from 'jotai/vanilla/atom';
import { RestMode } from '../../rest-controls';

export type CountedResource = { max: number; usage: number };
export type ResourceOption = { key: string; label: string; children?: readonly ResourceOption[] };

export type ResourceCounterComponentProps = {
  restMode?: RestMode;
  showHeader?: boolean;
};

export type ResourceCounterProps<T extends CountedResource> = {
  itemsAtom: WritableAtom<T[], [SetStateAction<T[]>], void>;
  options: readonly ResourceOption[];
  getKey: (item: T) => string;
  getLabel: (item: T) => string;
  createItem: (option: ResourceOption, selection?: ResourceOption) => T;
  title: string;
  resourceLabel?: string;
  renderRow?: (item: T, itemAtom: PrimitiveAtom<T>) => ReactNode;
  showHeader?: boolean;
};

export type ResourceCounterRowProps<T extends CountedResource> = {
  itemAtom: PrimitiveAtom<T>;
  label: string;
};
