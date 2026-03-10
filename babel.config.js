export default {
  presets: [
    ['@babel/preset-env', {
      targets: {
        chrome: '60',
        firefox: '60',
        safari: '12',
        edge: '79'
      }
    }],
    ['@babel/preset-react', {
      runtime: 'automatic'
    }]
  ],
  plugins: [
    [
      '@babel/plugin-proposal-decorators',
      {
        legacy: true
      }
    ],
    '@babel/plugin-proposal-class-properties'
  ]
}
