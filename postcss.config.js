/* eslint-disable global-require */

/* Hot reloading css variables */
module.exports = (config, hotLoadedVariables) => [
  // require('postcss-cssnext')({ browsers: 'last 2 versions' }),
  require('postcss-simple-vars')({
    variables: function variables() {
      return hotLoadedVariables
    },
    onVariables(variables) { // eslint-disable-line
      // console.log(variables)
    },
    unknown: function unknown(node, name, result) {
      node.warn(result, `Unknown variable ${name}`)
    }
  }),
  require('postcss-nested'),
  require('cssnano')(),
]
