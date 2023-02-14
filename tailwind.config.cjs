/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './index.html',
    './main.html',
    './src/**/*.{js,jsx,ts,tsx}'
  ],
  theme: {
    extend: {
      colors: {
        'fondo': '#E8B2BF',
      },
      backgroundImage: {
        'perros': "url('/public/logos/perros.jpg')",
        'gatos': "url('/public/logos/gatos.jpg')",
        'otros': "url('/public/logos/otros.jpg')",
        'adopta': "url('/public/logos/adopta.jpg')",
        'encontrados': "url('/public/logos/encontrados.jpg')",
        'perdidos': "url('/public/logos/perdidos.jpg')",
        'fundaciones': "url('/public/logos/fundaciones.jpg')",
      },
      gridTemplateRows: {
        'layout': '64px 1fr 108px',
      },
      height: {
        '450': '450px',
      },
      width: {
        '450': '450px',
      },
      zIndex: {
        '1': '1',
        '8': '8',
        '5': '5',
        '100': '100',
      },
    },
  },
  plugins: [
    require('@tailwindcss/line-clamp'),
  ],
}