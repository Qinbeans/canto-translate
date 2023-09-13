/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{html,js,svelte,ts}'],
  theme: {
    extend: {
      // add w-dscreen for 100dvw
      width: {
        'dscreen': '100dvw',
      },
      // add h-dscreen for 100dvh
      height: {
        'dscreen': '100dvh',
      },
    },
  },
  plugins: [],
}

