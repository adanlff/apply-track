/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  theme: {
    extend: {
      colors: {
        brand: {
          50: '#E4E9E7',
          100: '#C7D1CC',
          200: '#99ABA3',
          300: '#6C867A',
          400: '#466658',
          500: '#1D4533', // Primary default
          600: '#183A2B',
          700: '#132E22',
          800: '#0F231A',
          900: '#0A1812',
          950: '#060E0A',
        },
        // Light theme surface tokens
        surface: {
          base: '#F8FAFC',
          page: '#FFFFFF',
          card: '#FFFFFF',
          panel: '#F1F5F9',
          muted: '#F8FAFC',
          border: '#E2E8F0',
          'border-strong': '#CBD5E1',
        },
      },
      fontFamily: {
        sans: ['Bricolage Grotesque', 'system-ui', 'sans-serif'],
      },
      fontSize: {
        'golden-xs': ['0.618rem', { lineHeight: '1.4' }],
        'golden-sm': ['0.786rem', { lineHeight: '1.45' }],
        'golden-base': ['1rem', { lineHeight: '1.55' }],
        'golden-h4': ['1.272rem', { lineHeight: '1.35' }],
        'golden-h3': ['1.618rem', { lineHeight: '1.3' }],
        'golden-h2': ['2.618rem', { lineHeight: '1.2' }],
        'golden-h1': ['4.236rem', { lineHeight: '1.15' }],
        'golden-hero': ['6.854rem', { lineHeight: '1.05' }],
      },
      borderRadius: {
        DEFAULT: '8px',
        md: '8px',
        lg: '12px',
      },
      boxShadow: {
        card: '0 1px 3px 0 rgba(0,0,0,0.07), 0 1px 2px -1px rgba(0,0,0,0.05)',
        'card-hover': '0 4px 12px 0 rgba(0,0,0,0.10), 0 2px 4px -1px rgba(0,0,0,0.06)',
        panel: '0 2px 8px 0 rgba(0,0,0,0.08)',
        dialog: '0 20px 60px 0 rgba(0,0,0,0.18)',
      },
    },
  },
  plugins: [],
};
