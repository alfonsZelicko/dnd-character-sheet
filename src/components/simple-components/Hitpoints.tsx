import { useAtom } from 'jotai/index';
import { NumberLabelInput } from '../shared';
import React from 'react';
import { currentHitPointsAtom, maxHitPointsAtom, temporaryHitPointsAtom } from './atoms';

export const TemporaryHitPoints = () => {
  const [temporaryHitPoints, setTemporaryHitPoints] = useAtom(temporaryHitPointsAtom);

  return <NumberLabelInput NumberInputProps={{ value: temporaryHitPoints, onChange: (e) => setTemporaryHitPoints(+e.target.value) }} label="Tmp. Hit points" />;
};

export const CurrentHitPoints = () => {
  const [currentHitPoints, setCurrentHitPoints] = useAtom(currentHitPointsAtom);

  return <NumberLabelInput NumberInputProps={{ value: currentHitPoints, onChange: (e) => setCurrentHitPoints(+e.target.value) }} label="Current Hit points" />;
};

export const MaxHitPoints = () => {
  const [maxHitPoints, setMaxHitPoints] = useAtom(maxHitPointsAtom);

  return <NumberLabelInput NumberInputProps={{ value: maxHitPoints, onChange: (e) => setMaxHitPoints(+e.target.value) }} label="Max Hit points" />;
};
