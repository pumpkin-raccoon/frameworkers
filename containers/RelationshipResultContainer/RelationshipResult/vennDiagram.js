import { VennDiagram, sortAreas } from '@upsetjs/venn.js'

export const initializeDiagram = async (sets) => {
  const chart = VennDiagram();

  d3.select('#diagram').datum(sets).call(chart);

  // d3.select('#diagram').datum(sets).call(chart);
  // d3.selectAll('#diagram .venn-circle path').style('fill-opacity', 0.8);
  // d3.selectAll('#diagram text').style('fill', 'white');
}
