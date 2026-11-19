import { SyntheticEvent, useMemo, useState } from 'react';
import { Spell, SpellFile } from '../types';

const spellFiles = import.meta.glob<SpellFile>('../../../data/spells/spells-*.json', {
  eager: true,
  import: 'default',
});

const allSpells: Spell[] = Object.values(spellFiles).flatMap((file) => file.spell ?? []);

const MAX_RESULTS = 50;

export const useSpellFilter = () => {
  const [inputValue, setInputValue] = useState('');
  const [selectedSpell, setSelectedSpell] = useState<Spell | null>(null);

  const options = useMemo(() => {
    const query = inputValue.trim().toLowerCase();

    if (!query) return [];

    return allSpells.filter((spell) => spell.searchName.includes(query)).slice(0, MAX_RESULTS);
  }, [inputValue]);

  const handleInputChange = (_: SyntheticEvent, value: string) => {
    setInputValue(value);
  };

  const handleChange = (_: SyntheticEvent, value: Spell | null) => {
    setSelectedSpell(value);
  };

  const reset = () => {
    setInputValue('');
    setSelectedSpell(null);
  };

  return {
    options,
    inputValue,
    selectedSpell,
    handleInputChange,
    handleChange,
    reset,
  };
};
