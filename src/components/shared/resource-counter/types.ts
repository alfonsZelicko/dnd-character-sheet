import { ReactNode, SetStateAction } from 'react';
import { PrimitiveAtom, WritableAtom } from 'jotai/vanilla/atom';
import { RestMode } from '../../rest-controls';
import { Atom } from 'jotai/vanilla';

export type CountedResource = { max: number; usage: number };
export type ResourceOption = { key: string; label: string; children?: readonly ResourceOption[] };

export type ResourceCounterDisplay = 'counter' | 'usage-icons';

export type ResourceCounterRowsProps<T extends CountedResource> = {
  rowsAtom: Atom<PrimitiveAtom<T>[]>;
  getKey: (item: T) => string;
  getLabel: (item: T) => string;
  renderRow?: (item: T, itemAtom: PrimitiveAtom<T>) => React.ReactNode;
  display?: ResourceCounterDisplay;
};

export type ResourceCounterRowSlotProps<T extends CountedResource> = Pick<
  ResourceCounterRowsProps<T>,
  'getLabel' | 'renderRow' | 'display'
> & { itemAtom: PrimitiveAtom<T> };

export type ResourceCounterComponentProps = {
  restMode?: RestMode;
  headerMode?: ResourceCounterHeaderMode;
  display?: ResourceCounterDisplay;
};

export type ResourceCounterHeaderMode = 'show' | 'hide' | 'no-button';

export type ResourceCounterPickerDialogProps<T extends CountedResource> = {
  itemsAtom: WritableAtom<T[], [SetStateAction<T[]>], void>;
  options: readonly ResourceOption[];
  getKey: (item: T) => string;
  title: string;
  createItem: (option: ResourceOption, selection?: ResourceOption) => T;
};

type ResourceCounterBaseProps<T extends CountedResource> = {
  itemsAtom: WritableAtom<T[], [SetStateAction<T[]>], void>;
  getKey: (item: T) => string;
  getLabel: (item: T) => string;
  title: string;
  resourceLabel?: string;
  renderRow?: (item: T, itemAtom: PrimitiveAtom<T>) => ReactNode;
  display?: ResourceCounterDisplay;
  children?: ReactNode;
};

type ResourceCounterAddProps<T extends CountedResource> = {
  options: readonly ResourceOption[];
  createItem: (option: ResourceOption, selection?: ResourceOption) => T;
};

export type ResourceCounterProps<T extends CountedResource> = ResourceCounterBaseProps<T> &
  (
    | ({ showHeader?: 'show' } & ResourceCounterAddProps<T>)
    | { showHeader: 'hide'; options?: readonly ResourceOption[]; createItem?: ResourceCounterAddProps<T>['createItem'] }
    | {
        showHeader: 'no-button';
        options?: readonly ResourceOption[];
        createItem?: ResourceCounterAddProps<T>['createItem'];
      }
  );

export type ResourceCounterRowProps<T extends CountedResource> = {
  itemAtom: PrimitiveAtom<T>;
  label: string;
};
