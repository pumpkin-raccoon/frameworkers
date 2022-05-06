import venn from '@upsetjs/venn.js'

export const initializeDiagram = () => {
  const sets = [
    { sets: ['A'], size: 12 },
    { sets: ['B'], size: 12 },
    { sets: ['A', 'B'], size: 2 },
  ];

  const chart = venn?.VennDiagram();
  if (chart) {
    d3
      .select('#diagram')
      .datum(sets)
      .call(chart);
  }
}
