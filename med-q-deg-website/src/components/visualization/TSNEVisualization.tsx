import { useEffect, useRef, useState } from 'react';
import * as d3 from 'd3';

// Sample t-SNE data - replace with real data from paper
const categories = ['Blur', 'Noise', 'Artifact', 'Contrast', 'Compress', 'Other'];
const categoryColors = ['#6366f1', '#8b5cf6', '#ec4899', '#f59e0b', '#10b981', '#64748b'];

// Generate sample data points
const generateSampleData = () => {
  const data: { x: number; y: number; category: string; type: string }[] = [];

  categories.forEach((category, catIndex) => {
    // Create clusters for each category
    const centerX = Math.cos((catIndex / categories.length) * 2 * Math.PI) * 150;
    const centerY = Math.sin((catIndex / categories.length) * 2 * Math.PI) * 150;

    // Generate points around center
    for (let i = 0; i < 50; i++) {
      const angle = Math.random() * 2 * Math.PI;
      const radius = Math.random() * 60 + 20;
      data.push({
        x: centerX + Math.cos(angle) * radius,
        y: centerY + Math.sin(angle) * radius,
        category,
        type: `${category}-${i}`,
      });
    }
  });

  return data;
};

export default function TSNEVisualization() {
  const svgRef = useRef<SVGSVGElement>(null);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [data] = useState(generateSampleData());

  useEffect(() => {
    if (!svgRef.current) return;

    // Clear previous chart
    d3.select(svgRef.current).selectAll('*').remove();

    // Dimensions
    const margin = { top: 40, right: 40, bottom: 40, left: 40 };
    const width = svgRef.current.clientWidth - margin.left - margin.right;
    const height = 500 - margin.top - margin.bottom;

    // Create SVG
    const svg = d3
      .select(svgRef.current)
      .attr('width', width + margin.left + margin.right)
      .attr('height', height + margin.top + margin.bottom)
      .append('g')
      .attr('transform', `translate(${margin.left + width / 2},${margin.top + height / 2})`);

    // Scales
    const xExtent = d3.extent(data, (d) => d.x) as [number, number];
    const yExtent = d3.extent(data, (d) => d.y) as [number, number];

    const x = d3
      .scaleLinear()
      .domain([xExtent[0] - 50, xExtent[1] + 50])
      .range([-width / 2, width / 2]);

    const y = d3
      .scaleLinear()
      .domain([yExtent[0] - 50, yExtent[1] + 50])
      .range([height / 2, -height / 2]);

    // Color scale
    const color = d3
      .scaleOrdinal<string>()
      .domain(categories)
      .range(categoryColors);

    // Add grid (light gray for light theme)
    const gridOpacity = 0.5;
    svg
      .append('g')
      .selectAll('line')
      .data(x.ticks(10))
      .enter()
      .append('line')
      .attr('x1', (d) => x(d))
      .attr('x2', (d) => x(d))
      .attr('y1', -height / 2)
      .attr('y2', height / 2)
      .attr('stroke', '#d4d4d8')
      .attr('stroke-opacity', gridOpacity);

    svg
      .append('g')
      .selectAll('line')
      .data(y.ticks(10))
      .enter()
      .append('line')
      .attr('x1', -width / 2)
      .attr('x2', width / 2)
      .attr('y1', (d) => y(d))
      .attr('y2', (d) => y(d))
      .attr('stroke', '#d4d4d8')
      .attr('stroke-opacity', gridOpacity);

    // Add points
    const points = svg
      .selectAll('circle')
      .data(data)
      .enter()
      .append('circle')
      .attr('cx', (d) => x(d.x))
      .attr('cy', (d) => y(d.y))
      .attr('r', 0)
      .attr('fill', (d) => color(d.category))
      .attr('opacity', (d) =>
        selectedCategory === null || selectedCategory === d.category ? 0.7 : 0.15
      )
      .attr('class', 'tsne-point')
      .style('cursor', 'pointer');

    // Animate points
    points
      .transition()
      .duration(800)
      .delay((d, i) => i * 5)
      .attr('r', 5);

    // Add hover effects
    points
      .on('mouseenter', function (event, d) {
        d3.select(this)
          .transition()
          .duration(200)
          .attr('r', 8)
          .attr('opacity', 1);

        // Show tooltip
        const tooltip = svg
          .append('g')
          .attr('class', 'tooltip')
          .attr('transform', `translate(${x(d.x)},${y(d.y) - 20})`);

        tooltip
          .append('rect')
          .attr('x', -40)
          .attr('y', -25)
          .attr('width', 80)
          .attr('height', 20)
          .attr('fill', '#ffffff')
          .attr('stroke', '#e4e4e7')
          .attr('stroke-width', 1)
          .attr('rx', 6)
          .attr('opacity', 0.95);

        tooltip
          .append('text')
          .attr('text-anchor', 'middle')
          .attr('y', -11)
          .attr('fill', color(d.category))
          .attr('font-size', '12px')
          .attr('font-weight', '600')
          .text(d.category);
      })
      .on('mouseleave', function (event, d) {
        d3.select(this)
          .transition()
          .duration(200)
          .attr('r', 5)
          .attr('opacity', selectedCategory === null || selectedCategory === d.category ? 0.7 : 0.15);

        svg.select('.tooltip').remove();
      });

    // Add category labels
    categories.forEach((category, i) => {
      const categoryData = data.filter((d) => d.category === category);
      const centerX = d3.mean(categoryData, (d) => x(d.x)) || 0;
      const centerY = d3.mean(categoryData, (d) => y(d.y)) || 0;

      svg
        .append('text')
        .attr('x', centerX)
        .attr('y', centerY)
        .attr('text-anchor', 'middle')
        .attr('dominant-baseline', 'middle')
        .attr('fill', color(category))
        .attr('font-size', '16px')
        .attr('font-weight', 'bold')
        .attr('opacity', 0)
        .attr('pointer-events', 'none')
        .text(category)
        .transition()
        .duration(800)
        .delay(1000)
        .attr('opacity', 0.8);
    });

  }, [data, selectedCategory]);

  return (
    <div>
      {/* Category Filter */}
      <div className="flex flex-wrap gap-2 mb-6">
        <button
          onClick={() => setSelectedCategory(null)}
          className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
            selectedCategory === null
              ? 'bg-primary-500/15 text-primary-700 border border-primary-500/50'
              : 'glass hover:bg-surface-100'
          }`}
        >
          All Categories
        </button>
        {categories.map((cat, i) => (
          <button
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
              selectedCategory === cat
                ? 'border'
                : 'glass hover:bg-surface-100'
            }`}
            style={
              selectedCategory === cat
                ? {
                    background: `${categoryColors[i]}20`,
                    borderColor: `${categoryColors[i]}80`,
                    color: categoryColors[i],
                  }
                : {}
            }
          >
            <span className="flex items-center gap-2">
              <span
                className="w-3 h-3 rounded-full"
                style={{ background: categoryColors[i] }}
              />
              {cat}
            </span>
          </button>
        ))}
      </div>

      {/* Chart */}
      <div className="bg-white/60 rounded-xl p-6 border border-surface-200">
        <svg ref={svgRef} className="w-full" style={{ minHeight: '500px' }} />
      </div>

      {/* Info */}
      <div className="mt-6 glass rounded-xl p-4">
        <p className="text-surface-500 text-sm">
          <strong className="text-surface-700">t-SNE Visualization:</strong> Each point
          represents a medical image sample. Points are colored by their degradation category.
          Clusters indicate similar feature representations in the learned embedding space.
        </p>
      </div>
    </div>
  );
}
