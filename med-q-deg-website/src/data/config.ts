/**
 * MedQ-Deg Website Configuration
 *
 * This file contains all configurable data for the website.
 * Modify these values to quickly update the content without changing
 * the component logic.
 */

export const SITE_CONFIG = {
  // Basic Info
  title: 'MedQ-Deg',
  subtitle: 'A Multidimensional Benchmark for Evaluating MLLMs Across Medical Image Quality Degradations',
  description:
    'A VQA benchmark with 24,894 QA pairs evaluating 40 MLLMs across 18 degradation types, 7 medical imaging modalities, and 30 fine-grained clinical skills.',

  // Links
  links: {
    paper: '#',
    github: '#',
    dataset: '#',
    demo: '/examples',
  },

  // Social / Contact
  authors: ['Author 1', 'Author 2', 'Author 3'],
  affiliation: 'Your Institution',

  // Stats shown on homepage
  stats: {
    categories: 5,
    types: 18,
    datasets: 3,
    modalities: ['CT', 'MRI', 'X-Ray', 'Ultrasound', 'Histopathology', 'Dermoscopy', 'Fundus'],
  },

  // Colors for categories
  categoryColors: {
    artifact: '#ec4899',       // Pink
    intensity: '#f59e0b',      // Amber
    resolution: '#6366f1',     // Indigo
    motion: '#10b981',         // Emerald
    noise: '#8b5cf6',          // Violet
  },
} as const;

// Export type for type safety
export type SiteConfig = typeof SITE_CONFIG;

/**
 * Category Configuration
 * Modify these values to update degradation categories
 */
export const CATEGORIES = [
  {
    id: 'artifact',
    name: 'Artifacts',
    nameZh: '伪迹',
    color: '#ec4899',
    icon: 'warning',
    description: 'Limited angle, sparse view, bias field, undersampling, ghosting, blood cell, and dark spots artifacts',
  },
  {
    id: 'motion',
    name: 'Motion Interference',
    nameZh: '运动干扰',
    color: '#10b981',
    icon: 'motion_photos_on',
    description: 'Object rotation and object movement',
  },
  {
    id: 'intensity',
    name: 'Intensity Jitter',
    nameZh: '强度抖动',
    color: '#f59e0b',
    icon: 'brightness_6',
    description: 'Brightness adjustment, exposure, and contrast reduction',
  },
  {
    id: 'noise',
    name: 'Noise',
    nameZh: '噪声',
    color: '#8b5cf6',
    icon: 'grain',
    description: 'Gaussian noise and low dose artifacts',
  },
  {
    id: 'resolution',
    name: 'Resolution & Blur',
    nameZh: '分辨率和模糊',
    color: '#6366f1',
    icon: 'blur_on',
    description: 'Low resolution, motion blur, Gaussian blur, bubble, and X-ray motion blur',
  },
] as const;

/**
 * Degradation Types
 * 19 degradation types across 5 categories based on the paper
 * Severity levels: L0 (original), L1 (moderate), L2 (severe)
 */
export const DEGRADATION_TYPES = [
  // Artifacts (7 types)
  { id: 'limited_angle', name: 'Limited Angle', category: 'artifact' as const, severity: ['L0', 'L1', 'L2'] },
  { id: 'sparse_view', name: 'Sparse View', category: 'artifact' as const, severity: ['L0', 'L1', 'L2'] },
  { id: 'bias_field_artifact', name: 'Bias Field Artifact', category: 'artifact' as const, severity: ['L0', 'L1', 'L2'] },
  { id: 'undersampling_artifact', name: 'Undersampling Artifact', category: 'artifact' as const, severity: ['L0', 'L1', 'L2'] },
  { id: 'ghosting_artifact', name: 'Ghosting Artifact', category: 'artifact' as const, severity: ['L0', 'L1', 'L2'] },
  { id: 'blood_cell_artifact', name: 'Blood Cell Artifact', category: 'artifact' as const, severity: ['L0', 'L1', 'L2'] },
  { id: 'dark_spots_artifact', name: 'Dark Spots Artifact', category: 'artifact' as const, severity: ['L0', 'L1', 'L2'] },

  // Motion Interference (2 types)
  { id: 'rotation_artifact', name: 'Object Rotation', category: 'motion' as const, severity: ['L0', 'L1', 'L2'] },
  { id: 'random_motion_artifact', name: 'Object Movement', category: 'motion' as const, severity: ['L0', 'L1', 'L2'] },

  // Intensity Jitter (3 types)
  { id: 'adjust_brightness', name: 'Adjust Brightness', category: 'intensity' as const, severity: ['L0', 'L1', 'L2'] },
  { id: 'exposure_artifact', name: 'Exposure', category: 'intensity' as const, severity: ['L0', 'L1', 'L2'] },
  { id: 'reduce_contrast', name: 'Reduce Contrast', category: 'intensity' as const, severity: ['L0', 'L1', 'L2'] },

  // Noise (2 types)
  { id: 'gaussian_noise', name: 'Gaussian Noise', category: 'noise' as const, severity: ['L0', 'L1', 'L2'] },
  { id: 'low_dose', name: 'Low Dose', category: 'noise' as const, severity: ['L0', 'L1', 'L2'] },

  // Resolution & Blur (5 types)
  { id: 'downsample_artifact', name: 'Low Resolution', category: 'resolution' as const, severity: ['L0', 'L1', 'L2'] },
  { id: 'motion_blur', name: 'Motion Blur', category: 'resolution' as const, severity: ['L0', 'L1', 'L2'] },
  { id: 'gaussian_blur', name: 'Gaussian Blur', category: 'resolution' as const, severity: ['L0', 'L1', 'L2'] },
  { id: 'bubble_artifact', name: 'Bubble', category: 'resolution' as const, severity: ['L0', 'L1', 'L2'] },
  { id: 'xray_motion_blur_artifact', name: 'X-ray Motion Blur', category: 'resolution' as const, severity: ['L0', 'L1', 'L2'] },
] as const;

/**
 * Methods / Contributions
 * Modify to update the contributions section
 */
export const CONTRIBUTIONS = [
  {
    id: 'dataset',
    title: 'Comprehensive Dataset',
    description: '24,894 QA pairs across 18 degradation types, 7 medical imaging modalities, and 30 fine-grained clinical skills',
    icon: 'dataset',
    link: '/benchmark',
  },
  {
    id: 'evaluation',
    title: 'Extensive Evaluation',
    description: '40 MLLMs evaluated with Calibration Shift metric to assess model reliability and confidence calibration',
    icon: 'assessment',
    link: '/results',
  },
  {
    id: 'discovery',
    title: 'AI Dunning-Kruger Effect',
    description: 'Discovery of the AI Dunning-Kruger Effect: models with lower performance often exhibit higher confidence',
    icon: 'psychology',
    link: '/results',
  },
] as const;

/**
 * Page Layout Configuration
 * Modify these values to change page layouts
 */
export const PAGE_LAYOUTS = {
  home: {
    hero: 'centered', // 'centered' | 'split' | 'full'
    stats: 'cards',   // 'cards' | 'inline' | 'minimal'
    contributions: 'grid', // 'grid' | 'list' | 'carousel'
  },
  benchmark: {
    view: 'grid',     // 'grid' | 'list' | 'table'
    filter: 'sidebar', // 'sidebar' | 'top' | 'inline'
    cards: 'standard', // 'standard' | 'detailed' | 'minimal'
  },
  results: {
    charts: 'tabs',   // 'tabs' | 'stacked' | 'grid'
  },
} as const;

/**
 * Animation Configuration
 */
export const ANIMATION_CONFIG = {
  enabled: true,
  duration: 500,      // ms
  stagger: 100,       // ms
  easing: 'ease-out',
  scrollThreshold: 0.1,
} as const;

/**
 * Theme Configuration
 */
export const THEME_CONFIG = {
  defaultMode: 'light', // 'light' | 'dark' | 'system'
  allowToggle: true,
  gradients: {
    primary: 'from-primary-600 to-accent-600',
    hero: 'from-surface-50 via-white to-surface-50',
  },
} as const;
