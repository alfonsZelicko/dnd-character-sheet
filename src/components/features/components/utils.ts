import { useAtom } from 'jotai';
import { FeatureItemType } from '../types';

export const featureCommonProps = {
  variant: 'standard' as 'standard',
  sx: {
    '& input': { textAlign: 'center', fontWeight: 200, fontSize: '1rem' },
    '& .MuiSelect-select': { fontSize: '1rem !important', lineHeight: '1.3rem' },
  },
  fullWidth: true,
};

export const useFeatureChange = (featureAtom: any) => {
  const [feature, setFeature] = useAtom<FeatureItemType>(featureAtom);

  return (event: any) => {
    const { name, value } = event.target;
    if (+value < 0 && ['maxUsages', 'used'].includes(name)) return;
    if (name === 'used' && +value > feature.maxUsages) return;

    setFeature((prev: any) => ({ ...prev, [name]: value }));
  };
};
