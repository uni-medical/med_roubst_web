import { useEffect, useRef } from 'react';
import * as d3 from 'd3';

// Sample confusion matrix data - replace with real data
const categories = ['Blur', 'Noise', 'Artifact', 'Contrast', 'Compress', 'Other'];
const categoryColors = ['#6366f1', '#8b5cf6', '#ec4899', '#f59e0b', '#10b981', '#64748b'];

// Sample data: rows are actual, columns are predicted
const sampleMatrix = [
  [89, 3, 2, 4, 1, 1],
  [2, 92, 1, 2, 2, 1],
  [3, 2, 85, 6, 2, 2],
  [4, 1, 5, 86, 3, 1],
  [2, 3, 1, 2, 88, 4],
  [5, 2, 4, 3, 4, 82],
];

export default function ConfusionMatrix() {
  const svgRef = useRef<SVGSVGElement>(null);

  useEffect(() => {
    if (!svgRef.current) return;

    // Clear previous chart
    d3.select(svgRef.current).selectAll('*').remove();

    // Dimensions
    const margin = { top: 80, right: 30, bottom: 30, left: 80 };
    const cellSize = 70;
    const width = cellSize * categories.length;
    const height = cellSize * categories.length;

    // Create SVG
    const svg = d3
      .select(svgRef.current)
      .attr('width', width + margin.left + margin.right)
      .attr('height', height + margin.top + margin.bottom)
      .append('g')
      .attr('transform', `translate(${margin.left},${margin.top})`);

    // Color scale
    const colorScale = d3
      .scaleSequential()
      .interpolator(d3.interpolateBlues)
      .domain([0, d3.max(sampleMatrix.flat()) || 100]);

    // Create cells
    sampleMatrix.forEach((row, i) => {
      row.forEach((value, j) => {
        const g = svg
          .append('g')
          .attr('transform', `translate(${j * cellSize},${i * cellSize})`);

        // Cell background
        g.append('rect')
          .attr('width', cellSize - 2)
          .attr('height', cellSize - 2)
          .attr('fill', colorScale(value))
          .attr('rx', 8)
          .attr('opacity', 0)
          .transition()
          .duration(500)
          .delay(i * 50 + j * 50)
          .attr('opacity', 1);

        // Cell value
        g.append('text')
          .attr('x', cellSize / 2)
          .attr('y', cellSize / 2)
          .attr('text-anchor', 'middle')
          .attr('dominant-baseline', 'middle')
          .attr('fill', value > 50 ? '#fff' : '#18181b')
          .attr('font-size', '16px')
          .attr('font-weight', 'bold')
          .attr('opacity', 0)
          .text(value)
          .transition()
          .duration(500)
          .delay(i * 50 + j * 50 + 200)
          .attr('opacity', 1);
      });
    });

    // X axis labels (Predicted)
    categories.forEach((cat, i) => {
      svg
        .append('text')
        .attr('x', i * cellSize + cellSize / 2)
        .attr('y', -40)
        .attr('text-anchor', 'middle')
        .attr('fill', categoryColors[i] ?? '#000')
        .attr('font-size', '14px')
        .attr('font-weight', '600')
        .text(cat);
    });

    // Y axis labels (Actual)
    categories.forEach((cat, i) => {
      svg
        .append('text')
        .attr('x', -40)
        .attr('y', i * cellSize + cellSize / 2)
        .attr('text-anchor', 'end')
        .attr('dominant-baseline', 'middle')
        .attr('fill', categoryColors[i] ?? '#000')
        .attr('font-size', '14px')
        .attr('font-weight', '600')
        .text(cat);
    });

    // Axis titles
    svg
      .append('text')
      .attr('x', width / 2)
      .attr('y', -60)
      .attr('text-anchor', 'middle')
      .attr('fill', '#52525b')
      .attr('font-size', '12px')
      .attr('font-weight', '600')
      .text('PREDICTED CLASS');

    svg
      .append('text')
      .attr('x', -height / 2)
      .attr('y', -60)
      .attr('text-anchor', 'middle')
      .attr('fill', '#52525b')
      .attr('font-size', '12px')
      .attr('font-weight', '600')
      .attr('transform', `rotate(-90, -60, ${height / 2})`)
      .text('ACTUAL CLASS');

  }, []);

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <p className="text-surface-500 text-sm">
          Values represent the percentage of predictions for each combination of actual and predicted classes.
        </p>
      </div>

      <div className="bg-white/60 rounded-xl p-8 overflow-x-auto border border-surface-200">
        <div className="flex justify-center">
          <svg ref={svgRef} className="max-w-full" />
        </div>
      </div>

      {/* Color Legend */}
      <div className="mt-6">
        <div className="flex items-center justify-center gap-4">
          <span className="text-sm text-surface-500">Low</span>
          <div className="flex gap-1">
            {[...Array(10)].map((_, i) => (
              <div
                key={i}
                className="w-8 h-4 rounded"
                style={{
                  background: d3.interpolateBlues(i / 9),
                }}
              />
            ))}
          </div>
          <span className="text-sm text-surface-500">High</span>
        </div>
      </div>
    </div>
  );
}
