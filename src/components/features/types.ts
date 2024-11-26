export enum RestType {
  LR = 'Long Rest',
  SR = 'Short Rest',
  DW = 'Dawn',
}

export const getRestTypeAbbreviation = (restType: RestType): string => restType.match(/[A-Z]/g)?.join('') || '';

export type FeatureType = {
  featureName: string;
  type: RestType;
  maxUsages: number;
};

export type FeatureItemType = FeatureType & {
  used: number;
};
