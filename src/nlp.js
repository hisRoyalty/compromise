import View from './API/View.js'
import world from './API/world.js'
import version from '../lib/_version.js'
import extend from './API/extend.js'

const nlp = function (input, lex) {
  const { methods, hooks } = world
  if (lex) {
    nlp.addWords(lex)
  }
  //assume ./01-tokenize is installed
  let document = methods.one.tokenize(input, world)
  let doc = new View(document)
  doc.compute(hooks)
  return doc
}

/** log the decision-making to console */
nlp.verbose = function (set) {
  let env = typeof process === undefined ? self.env : process.env //use window, in browser
  env.DEBUG_TAGS = set === 'tagger' || set === true ? true : ''
  env.DEBUG_MATCH = set === 'match' || set === true ? true : ''
  env.DEBUG_CHUNKS = set === 'chunker' || set === true ? true : ''
  return this
}

/** pre-parse any match statements */
nlp.parseMatch = function (str) {
  return world.methods.one.parseMatch(str)
}

/** extend compromise functionality */
nlp.plugin = function (plugin) {
  extend(plugin, world, View, this)
  return this
}
nlp.extend = nlp.plugin

/** reach-into compromise internals */
nlp.world = () => world

nlp.version = version

nlp.addWords = function (words) {
  const { methods, model } = world
  if (!words) {
    return
  }
  // add some words to our lexicon
  if (!methods.two.expandLexicon) {
    Object.assign(model.two.lexicon, words) //no fancy-business
  } else {
    // expand it, if appropriate
    let { lex, _multi } = methods.two.expandLexicon(words, world)
    Object.assign(model.two.lexicon, lex)
    Object.assign(model.two._multiCache, _multi)
  }
}

/** don't run the POS-tagger */
nlp.tokenize = function (input, lex) {
  const { methods, compute } = world
  // add user-given words to lexicon
  if (lex) {
    nlp.addWords(lex)
  }
  // run the tokenizer
  let document = methods.one.tokenize(input, world)
  let doc = new View(document)
  // give contractions a shot, at least
  if (compute.contractions) {
    doc.compute(['alias', 'normal', 'machine', 'contractions']) //run it if we've got it
  }
  return doc
}

// some helper methods
nlp.model = () => world.model
nlp.methods = () => world.methods
nlp.hooks = () => world.hooks

// apply our only default plugins
export default nlp
const { parseMatch, plugin } = nlp
export { parseMatch, plugin, version, plugin as extend }
