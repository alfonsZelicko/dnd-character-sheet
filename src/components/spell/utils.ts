export type SpellLevelLabelContext = 'spell-list' | 'spell-slots';

/** Shared level naming for the spell list and the spell slot counter. */
export const getSpellLevelLabel = (level: number, context: SpellLevelLabelContext, pactLevel = 1) => {
  if (!Number.isInteger(level) || level < 0 || level > 10) throw new Error(`Invalid spell level: ${level}`);

  if (level === 0) return 'Cantrips';
  if (level === 10) {
    const ordinal = `${pactLevel}${pactLevel === 1 ? 'st' : pactLevel === 2 ? 'nd' : pactLevel === 3 ? 'rd' : 'th'}`;
    return context === 'spell-list' ? `Pact Magic ${ordinal} Level` : `Pact Magic ${ordinal} lvl`;
  }

  const ordinal = `${level}${level === 1 ? 'st' : level === 2 ? 'nd' : level === 3 ? 'rd' : 'th'}`;
  return context === 'spell-list' ? `Spells of ${ordinal} level` : `${ordinal} level spell slot`;
};
