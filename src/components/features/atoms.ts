import { atomWithStorage, splitAtom } from 'jotai/utils';
import { FeatureItemType, RestType } from './types';

const initFeatureAtomsValue: FeatureItemType[] = [
  {
    featureName: '',
    type: RestType.SR,
    maxUsages: 0,
    used: 0,
  },
  {
    featureName: '',
    type: RestType.SR,
    maxUsages: 0,
    used: 0,
  },
  {
    featureName: '',
    type: RestType.SR,
    maxUsages: 0,
    used: 0,
  },
  {
    featureName: '',
    type: RestType.SR,
    maxUsages: 0,
    used: 0,
  },
  {
    featureName: '',
    type: RestType.SR,
    maxUsages: 0,
    used: 0,
  },
  {
    featureName: '',
    type: RestType.SR,
    maxUsages: 0,
    used: 0,
  },
  {
    featureName: '',
    type: RestType.SR,
    maxUsages: 0,
    used: 0,
  },
  {
    featureName: '',
    type: RestType.SR,
    maxUsages: 0,
    used: 0,
  },
];

export const FeatureAtoms = atomWithStorage<FeatureItemType[]>('features', initFeatureAtomsValue);
export const FeatureAtomsAtom = splitAtom(FeatureAtoms);
