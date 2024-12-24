module.exports = {
  arrowParens: 'avoid',
  bracketSameLine: false,
  bracketSpacing: true,
  singleQuote: true,
  trailingComma: 'all',
  tabWidth: 2,
  useTabs: false,
  semi: true,
  jsxBracketSameLine: false,
  proseWrap: 'always',
  importOrder: [
    '^base/|^components/|^helpers/|^hooks/|^modules/|^navigation/|^screens/|^styles/',
    '^[./]',
    '^assets/',
  ],
  importOrderSeparation: true,
  importOrderParserPlugins: [
    'typescript',
    'jsx',
    'tsx',
    'ts',
    'js',
    '["decorators-legacy", {"decoratorsBeforeExport": true}]',
    'classProperties',
  ],
};
 