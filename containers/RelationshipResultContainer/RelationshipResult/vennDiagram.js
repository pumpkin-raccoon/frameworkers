import { VennDiagram } from '@upsetjs/venn.js'

export const initializeDiagram = async (sets) => {
  const chart = VennDiagram();
  d3.select('#diagram').datum(sets).call(chart);
}
