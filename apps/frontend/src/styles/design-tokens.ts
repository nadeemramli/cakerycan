export const tokens = {
  colors: {
    // Primary colors - easily replaceable when brand colors are finalized
    primary: {
      50: '#f8f9fa',
      100: '#f0f4f7', // Current footer background
      500: '#000000', // Current text color
      600: '#666666',
      700: '#333333',
    },
    // Semantic colors - these won't change much with branding
    background: {
      main: '#ffffff',
      subtle: '#f0f4f7',
      transparent: 'rgba(255, 255, 255, 0.7)',
    },
    text: {
      primary: '#000000',
      secondary: '#666666',
      muted: '#888888',
    },
    border: {
      light: '#e5e7eb',
      default: '#d1d5db',
    },
  },
  typography: {
    // Temporary font settings - easily replaceable
    fonts: {
      body: 'var(--font-inter)', // Currently using Inter, can be replaced
      display: 'var(--font-inter)', // Can be different for headings later
    },
    sizes: {
      xs: '0.75rem',
      sm: '0.875rem',
      base: '1rem',
      lg: '1.125rem',
      xl: '1.25rem',
      '2xl': '1.5rem',
      '3xl': '1.875rem',
    },
    weights: {
      normal: '400',
      medium: '500',
      semibold: '600',
      bold: '700',
    },
  },
  spacing: {
    // Consistent spacing scale
    0: '0',
    1: '0.25rem',
    2: '0.5rem',
    3: '0.75rem',
    4: '1rem',
    5: '1.25rem',
    6: '1.5rem',
    8: '2rem',
    10: '2.5rem',
    12: '3rem',
    16: '4rem',
  },
  breakpoints: {
    sm: '640px',
    md: '768px',
    lg: '1024px',
    xl: '1280px',
  },
  // Placeholder for brand assets
  assets: {
    // These will be updated when assets are ready
    logoPlaceholder: {
      width: '120px',
      height: '40px',
    },
  },
} as const; 