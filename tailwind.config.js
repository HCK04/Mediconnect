/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx,ts,tsx}'], // Paths to your files
  darkMode: 'class', // Specify dark mode configuration
  theme: {
    extend: {},
  },
  plugins: [
    require('daisyui'), // Add daisyUI plugin
    // Custom plugin for Firefox variant
    function ({ addVariant, e, postcss }) {
      addVariant('firefox', ({ container, separator }) => {
        const isFirefoxRule = postcss.atRule({
          name: '-moz-document',
          params: 'url-prefix()',
        });
        isFirefoxRule.append(container.nodes);
        container.append(isFirefoxRule);
        isFirefoxRule.walkRules((rule) => {
          rule.selector = `.${e(
            `firefox${separator}${rule.selector.slice(1)}`
          )}`;
        });
      });
    }
  ],
};
