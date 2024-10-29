import { Abilities, getAbilityAtom } from '../abilities/atoms';
import { focusAtom } from 'jotai-optics';
import { AbilityItemType } from '../abilities/types';

export const savingThrowAtom = (ability: Abilities, prop: keyof AbilityItemType) => focusAtom(getAbilityAtom(ability), (optic) => optic.prop(prop));
