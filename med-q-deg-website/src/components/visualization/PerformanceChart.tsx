import { useEffect, useRef, useState } from 'react';
import * as d3 from 'd3';

// Sample data - will be replaced with real data
const sampleData = [
  { method: 'DPL (Ours)', accuracy: 87.3, f1: 85.6, auroc: 92.1 },
  { method: 'CLIP', accuracy: 74.9, f1: 74.8, auroc: 76.9 },
  { method: 'CoOp', accuracy: 78.2, f1: 77.6, auroc: 81.3 },
  { method: 'CoCoOp', accuracy: 80.1, f1: 79.3, auroc: 83.7 },
  { method: 'ResNet-50', accuracy: 68.5, f1: 67.2, auroc: 71.4 },
];

export default function PerformanceChart() {
  const svgRef = useRef<SVGSVGElement>(null);
  const [selectedMetric, setSelectedMetric] = useState<'accuracy' | 'f1' | 'auroc'>('accuracy');

  useEffect(() => {
    if (!svgRef.current) return;

    // Clear previous chart
    d3.select(svgRef.current).selectAll('*').remove();

    // Dimensions
    const margin = { top: 40, right: 30, bottom: 60, left: 60 };
    const width = svgRef.current.clientWidth - margin.left - margin.right;
    const height = 400 - margin.top - margin.bottom;

    // Create SVG
    const svg = d3
      .select(svgRef.current)
      .attr('width', width + margin.left + margin.right)
      .attr('height', height + margin.top + margin.bottom)
      .append('g')
      .attr('transform', `translate(${margin.left},${margin.top})`);

    // Scales
    const x = d3
      .scaleBand()
      .domain(sampleData.map((d) => d.method))
      .range([0, width])
      .padding(0.3);

    const y = d3
      .scaleLinear()
      .domain([0, 100])
      .range([height, 0]);

    // Color scale
    const color = d3.scaleOrdinal()
      .domain(sampleData.map(d => d.method))
      .range(['#0ea5e9', '#8b5cf6', '#ec4899', '#f59e0b', '#10b981']);

    // Add bars
    svg
      .selectAll('rect')
      .data(sampleData)
      .enter()
      .append('rect')
      .attr('x', (d) => x(d.method) || 0)
      .attr('y', height)
      .attr('width', x.bandwidth())
      .attr('height', 0)
      .attr('fill', (d) => color(d.method) as string)
      .attr('rx', 8)
      .transition()
      .duration(800)
      .delay((d, i) => i * 100)
      .attr('y', (d) => y(d[selectedMetric]))
      .attr('height', (d) => height - y(d[selectedMetric]));

    // Add value labels on bars
    svg
      .selectAll('.value-label')
      .data(sampleData)
      .enter()
      .append('text')
      .attr('class', 'value-label')
      .attr('x', (d) => (x(d.method) || 0) + x.bandwidth() / 2)
      .attr('y', (d) => y(d[selectedMetric]) - 10)
      .attr('text-anchor', 'middle')
      .attr('fill', '#18181b')
      .attr('font-size', '14px')
      .attr('font-weight', 'bold')
      .attr('opacity', 0)
      .text((d) => `${d[selectedMetric]}%`)
      .transition()
      .duration(800)
      .delay((d, i) => i * 100 + 400)
      .attr('opacity', 1);

    // X axis
    svg
      .append('g')
      .attr('transform', `translate(0,${height})`)
      .call(d3.axisBottom(x))
      .selectAll('text')
      .attr('fill', '#52525b')
      .attr('font-size', '12px')
      .style('text-anchor', 'end')
      .attr('transform', 'rotate(-45)');

    // Y axis
    svg
      .append('g')
      .call(d3.axisLeft(y).ticks(5).tickFormat(d => `${d}%`))
      .selectAll('text')
      .attr('fill', '#52525b')
      .attr('font-size', '12px');

    // Grid lines
    svg
      .append('g')
      .attr('class', 'grid')
      .call(
        d3.axisLeft(y)
          .ticks(5)
          .tickSize(-width)
          .tickFormat(() => '')
      )
      .selectAll('line')
      .attr('stroke', '#d4d4d8')
      .attr('stroke-opacity', 0.6);

    // Remove domain line
    svg.selectAll('.domain').remove();
    svg.selectAll('line').attr('stroke', '#d4d4d8');

  }, [selectedMetric]);

  return (
    <div>
      {/* Metric Selector */}
      <div className="flex gap-2 mb-6">
        {['accuracy', 'f1', 'auroc'].map((metric) => (
          <button
            key={metric}
            onClick={() => setSelectedMetric(metric as any)}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
              selectedMetric === metric
                ? 'bg-primary-500/15 text-primary-700 border border-primary-500/50'
                : 'glass hover:bg-surface-100'
            }`}
          >
            {metric === 'accuracy' && 'Accuracy'}
            {metric === 'f1' && 'F1-Score'}
            {metric === 'auroc' && 'AUROC'}
          </button>
        ))}
      </div>

      {/* Chart */}
      <div className="bg-white/60 rounded-xl p-6 border border-surface-200">
        <svg ref={svgRef} className="w-full" style={{ minHeight: '400px' }} />
      </div>

      {/* Legend */}
      <div className="mt-6 flex flex-wrap gap-4 justify-center">
        {sampleData.map((item, i) => (
          <div key={item.method} className="flex items-center gap-2">
            <div
              className="w-3 h-3 rounded"
              style={{ background: ['#0ea5e9', '#8b5cf6', '#ec4899', '#f59e0b', '#10b981'][i] }}
            />
            <span className="text-sm text-surface-600">{item.method}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
