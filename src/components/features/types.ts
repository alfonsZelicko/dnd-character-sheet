export enum RestType {
  LR = 'Long Rest',
  SR = 'Short Rest',
  DW = 'Dawn',
}

export const getRestTypeAbbreviation = (restType: RestType): string =>
  Object.keys(RestType).find((k) => RestType[k as keyof typeof RestType] === restType) || '';

export type FeatureType = {
  featureName: string;
  type: RestType;
  maxUsages: number;
};

export type FeatureItemType = FeatureType & {
  used: number;
};
