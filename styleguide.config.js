module.exports = {
  components: 'src/components/**/*.tsx',
  propsParser: require("react-docgen-typescript").withCustomConfig(
    "./tsconfig.json",
  ).parse,
};


// const path = require('path');
// const glob = require('glob');

// module.exports = {
//   // components: function () {
//   //   return glob.sync(path.resolve(__dirname, 'src/components/**/*.tsx'))
//   //     .filter(function (module) {
//   //       return /\/[A-Z]\w*\.tsx$/.test(module);
//   //     });
//   // },
//   components: 'src/components/**/*.tsx',
//   resolver: require('react-docgen').resolver.findAllComponentDefinitions,
//   propsParser: require('react-docgen-typescript').withDefaultConfig({ propFilter: { skipPropsWithoutDoc: true } }).parse
// };