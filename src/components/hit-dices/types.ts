export type HitDiceType = {
  max: number;
  /** Legacy saved value; converted to `max` when loading old character data. */
  level?: number;
  die: DiceType;
  usage: number;
};

export type DiceType = 'd6' | 'd8' | 'd10' | 'd12';
