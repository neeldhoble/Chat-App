// /** @type {import('tailwindcss').Config} */
// export default {
//   content: [
//     "./index.html",
//     "./src/**/*.{js,ts,jsx,tsx}",
//   ],
//   theme: {
//     extend: {
//       colors: {
//         darkblue1: '#2C5364',
//         darkblue2: '#203A43',
//         darkblue3: '#0F2027',
//       },
//       backgroundImage: {
//         'custom-gradient': 'linear-gradient(to right, #2C5364, #203A43, #0F2027)',
//       },
//     },
//   },
//   plugins: [require("daisyui")],
// }



















/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        darkblue1: '#2C5364',
        darkblue2: '#203A43',
        darkblue3: '#0F2027',
      },
      backgroundImage: {
        'custom-gradient': 'linear-gradient(to right, #2C5364, #203A43, #0F2027)',
        'chat-bg': "url('/src/assets/background.jpg')",
        // You can name it anything; 'chat-bg' is an example
      },
    },
  },
  plugins: [require("daisyui")],
}
