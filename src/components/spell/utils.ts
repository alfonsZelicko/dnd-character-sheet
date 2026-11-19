export type SpellLevelLabelContext = 'spell-list' | 'spell-slots';

/** Shared level naming for the spell list and the spell slot counter. */
export const getSpellLevelLabel = (level: number, context: SpellLevelLabelContext) => {
  if (!Number.isInteger(level) || level < 0 || level > 10) throw new Error(`Invalid spell level: ${level}`);

  if (level === 0) return 'Cantrips';
  if (level === 10) return 'Pact Magic';

  const ordinal = `${level}${level === 1 ? 'st' : level === 2 ? 'nd' : level === 3 ? 'rd' : 'th'}`;
  return context === 'spell-list' ? `Spells of ${ordinal} level` : `${ordinal} level spell slot`;
};
