/**
 * Older character saves omit newer keys and object fields.
 * Do not migrate those additions; treat a missing value as the feature default.
 */
export const storedOrDefault = <T>(value: T | undefined, fallback: T): T =>
  value === undefined ? fallback : value;
