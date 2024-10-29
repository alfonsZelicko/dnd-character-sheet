import { AbilityItem } from './AbilityItem';
import React from 'react';
import { Abilities } from './types';

export const AbilityListView = () => Object.values(Abilities).map((ability) => <AbilityItem ability={ability} key={ability} />);
