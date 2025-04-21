// tailwind.config.js
export default {
  content: [
    './index.html',
    './src/**/*.{js,ts,vue,jsx,tsx}', // <- make sure your paths are correct!
  ],
  theme: {
    extend: {
      // ✅ extend instead of overwrite
      spacing: {
        // custom values, optional
      },
    },
  },
  plugins: [],
}
