module.exports = {
  presets: [
    '@babel/preset-env', // For transpiling ES6+ syntax to ES5
    '@babel/preset-react', // For transpiling JSX and React-specific syntax
  ],
  plugins: [
    '@babel/plugin-transform-runtime', // To optimize the use of helpers
    '@babel/plugin-proposal-class-properties', // For class properties
    '@babel/plugin-proposal-optional-chaining', // For optional chaining (?.)
    '@babel/plugin-proposal-nullish-coalescing-operator', // For nullish coalescing (??)
  ],
};
