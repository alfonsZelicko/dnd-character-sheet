export const hpPreviewContainerSx = {
  display: 'grid',
  gridTemplateColumns: {
    xs: 'repeat(6, 1fr)',
    md: '5.5fr 6.5fr',
  },
  gridTemplateAreas: {
    xs: `
      "temp temp current current max max"
      "exhaustion exhaustion exhaustion death death death"
      "hitdices hitdices hitdices hitdices hitdices hitdices"
    `,
    md: `
      "temp hitdices"
      "current hitdices"
      "max hitdices"
      "exhaustion death"
    `,
  },
  gap: 1,
};

export const abilityPreviewContainerSx = {
  display: 'grid',
  gridTemplateColumns: {
    xs: 'repeat(3, auto)',
    md: '1fr',
  },
  gridTemplateRows: {
    xs: 'repeat(2, auto)',
    md: 'repeat(6, auto)',
  },
  justifyContent: {
    xs: 'space-between',
    md: 'start',
  },
  width: { md: '100px' },
  flexShrink: 0,
  gap: 1,
};
