export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          blue: "#1D51A4",
          light: "#E5ECFF",
          accent: "#2563EB",
        },
        status: {
          ontrack: "#22C55E",
          delayed: "#EF4444",
          intransit: "#A855F7",
          pending: "#F59E0B",
          completed: "#22C55E",
        },
        stats: {
          projects: "#FD8D5B",
          ontrack: "#111827",
          delayed: "#3B82F6",
          completed: "#EC4899",
          rate: "#F59E0B",
          deadlines: "#EF4444",
        }
      },
      borderRadius: {
        'xl': '12px',
        '2xl': '16px',
      }
    },
  },
  plugins: [],
};
