/**
 * Data Loading Utilities
 *
 * This file provides interfaces for loading external data.
 * Replace the placeholder data with real data from your benchmark.
 */

export interface DegradationExample {
  id: string;
  type: string;
  category: string;
  severity: 'L0' | 'L1' | 'L2';
  imagePath: string;
  modality: string;
  description?: string;
}

export interface PerformanceData {
  method: string;
  accuracy: number;
  f1Score: number;
  auroc: number;
  parameters?: string;
}

export interface ConfusionMatrixData {
  actual: string;
  predicted: string;
  value: number;
}

export interface TSNEPoint {
  x: number;
  y: number;
  category: string;
  type: string;
  modality?: string;
}

/**
 * Load degradation examples
 * @param category - Optional category filter
 * @param type - Optional degradation type filter
 */
export async function loadDegradationExamples(
  category?: string,
  type?: string
): Promise<DegradationExample[]> {
  try {
    const response = await fetch('/data/degradation-examples.json');
    if (!response.ok) {
      console.warn('Example data not found, using placeholders');
      return getPlaceholderExamples();
    }

    let data = await response.json();

    // Apply filters
    if (category) {
      data = data.filter((item: DegradationExample) => item.category === category);
    }
    if (type) {
      data = data.filter((item: DegradationExample) => item.type === type);
    }

    return data;
  } catch (error) {
    console.error('Error loading degradation examples:', error);
    return getPlaceholderExamples();
  }
}

/**
 * Load performance comparison data
 */
export async function loadPerformanceData(): Promise<PerformanceData[]> {
  try {
    const response = await fetch('/data/performance.json');
    if (!response.ok) {
      return getPlaceholderPerformance();
    }
    return await response.json();
  } catch (error) {
    console.error('Error loading performance data:', error);
    return getPlaceholderPerformance();
  }
}

/**
 * Load confusion matrix data
 */
export async function loadConfusionMatrix(): Promise<number[][]> {
  try {
    const response = await fetch('/data/confusion-matrix.json');
    if (!response.ok) {
      return getPlaceholderConfusionMatrix();
    }
    return await response.json();
  } catch (error) {
    console.error('Error loading confusion matrix:', error);
    return getPlaceholderConfusionMatrix();
  }
}

/**
 * Load t-SNE visualization data
 */
export async function loadTSNEData(): Promise<TSNEPoint[]> {
  try {
    const response = await fetch('/data/tsne.json');
    if (!response.ok) {
      return getPlaceholderTSNE();
    }
    return await response.json();
  } catch (error) {
    console.error('Error loading t-SNE data:', error);
    return getPlaceholderTSNE();
  }
}

// Placeholder data functions
function getPlaceholderExamples(): DegradationExample[] {
  const categories = ['artifact', 'intensity', 'resolution', 'motion', 'noise'];
  const types = ['bias_field_artifact', 'gaussian_blur', 'gaussian_noise', 'motion_blur', 'adjust_brightness'];
  const severities: Array<'L0' | 'L1' | 'L2'> = ['L0', 'L1', 'L2'];
  const modalities = ['CT', 'MRI', 'X-Ray', 'Ultrasound', 'Histopathology', 'Dermoscopy', 'Fundus'];

  const examples: DegradationExample[] = [];

  for (let i = 0; i < 100; i++) {
    examples.push({
      id: `example-${i}`,
      type: types[i % types.length] ?? 'unknown',
      category: categories[i % categories.length] ?? 'unknown',
      severity: severities[i % severities.length] ?? 'L0',
      imagePath: `/images/degradations/placeholder-${i % 10}.jpg`,
      modality: modalities[i % modalities.length] ?? 'CT',
      description: `Example ${i + 1}`,
    });
  }

  return examples;
}

function getPlaceholderPerformance(): PerformanceData[] {
  return [
    { method: 'DPL (Ours)', accuracy: 87.3, f1Score: 85.6, auroc: 92.1, parameters: '86.2M' },
    { method: 'CLIP', accuracy: 74.9, f1Score: 74.8, auroc: 76.9, parameters: '151.3M' },
    { method: 'CoOp', accuracy: 78.2, f1Score: 77.6, auroc: 81.3, parameters: '151.4M' },
    { method: 'CoCoOp', accuracy: 80.1, f1Score: 79.3, auroc: 83.7, parameters: '151.5M' },
    { method: 'ResNet-50', accuracy: 68.5, f1Score: 67.2, auroc: 71.4, parameters: '25.6M' },
  ];
}

function getPlaceholderConfusionMatrix(): number[][] {
  return [
    [89, 3, 2, 4, 1, 1],
    [2, 92, 1, 2, 2, 1],
    [3, 2, 85, 6, 2, 2],
    [4, 1, 5, 86, 3, 1],
    [2, 3, 1, 2, 88, 4],
    [5, 2, 4, 3, 4, 82],
  ];
}

function getPlaceholderTSNE(): TSNEPoint[] {
  const categories = ['Blur', 'Noise', 'Artifact', 'Contrast', 'Compress', 'Other'];
  const points: TSNEPoint[] = [];

  categories.forEach((category, catIndex) => {
    const centerX = Math.cos((catIndex / categories.length) * 2 * Math.PI) * 150;
    const centerY = Math.sin((catIndex / categories.length) * 2 * Math.PI) * 150;

    for (let i = 0; i < 50; i++) {
      const angle = Math.random() * 2 * Math.PI;
      const radius = Math.random() * 60 + 20;
      points.push({
        x: centerX + Math.cos(angle) * radius,
        y: centerY + Math.sin(angle) * radius,
        category,
        type: `${category}-${i}`,
      });
    }
  });

  return points;
}
