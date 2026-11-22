/** Toggle a cumulative counter at a one-based position. */
export const toggleCounterValue = (current: number, value: number) => (current === value ? value - 1 : value);
