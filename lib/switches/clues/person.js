const p = 'Person'

export default {
  before: {
    Honorific: p,
    Person: p,
    Preposition: p, //with sue
  },
  after: {
    Person: p,
    ProperNoun: p,
    Modal: p, //bob could
    Copula: p, //bob is
  },
  ownTags: {
    // ProperNoun: p, //capital letter
  },
  beforeWords: {
    hi: p,
    hey: p,
    yo: p,
    dear: p,
    hello: p,
  },
  afterWords: {
    // person-usually verbs
    said: p,
    says: p,
    told: p,
    tells: p,
    feels: p,
    felt: p,
    thinks: p,
    thought: p,
    spends: p,
    spendt: p,
    plays: p,
    played: p,
    sing: p,
    sang: p,
    learn: p,
    learned: p,
    // and: p, //sue and jeff
  },
}