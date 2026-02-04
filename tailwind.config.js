/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './index.html',
    './src/**/*.{js,jsx}'
  ],
  theme: {
    extend: {
      colors: {
        ink: '#0b0f14',
        night: '#101621',
        steel: '#1b2433',
        frost: '#eef2f6',
        accent: '#ff3b3f'
      },
      boxShadow: {
        glow: '0 0 40px rgba(255, 59, 63, 0.25)'
      },
      backgroundImage: {
        grid: 'radial-gradient(circle at 1px 1px, rgba(255,255,255,0.08) 1px, transparent 0)'
      }
    }
  },
  plugins: [require('@tailwindcss/forms'), require('@tailwindcss/typography')]
}
