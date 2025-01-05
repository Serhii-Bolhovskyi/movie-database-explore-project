module.exports = {
  content: [
    "*.html",
    './src/**/*.js',
    "public/images/*.{png,jpg,jpeg,gif,svg}"
  ],
  theme: {
    extend: {
      colors: {
        darkPurple: "#00072d",
        lightPurple: '#001241',
        voteBg: '#001c55',
        yell: '#ffe033'
      },
      fontFamily: {
        sans: ['Moderustic', 'sans-serif']
      }
    },
  },
  plugins: [],
}

