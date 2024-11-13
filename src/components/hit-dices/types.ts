export type HitDiceType = {
  level: number;
  die: DiceType;
  usage: number;
};

export type DiceType = 'd6' | 'd8' | 'd10' | 'd12';
