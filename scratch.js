const nlp = require('./src/index')
nlp.extend(require('./plugins/numbers/src'))
nlp.extend(require('./plugins/dates/src'))
const spacetime = require('/Users/spencer/mountain/spacetime')
// nlp.extend(require('./plugins/match-runner/src'))
// const text = require('/Users/spencer/mountain/compromise/scripts/perf/flame/_sotu-text.js')
// const fmt = iso => (iso ? spacetime(iso).format('{day-short} {nice} {year}') : '-')
nlp.verbose(true)

nlp('visit https://www.fu4bar.f3schools.com').debug()
// let doc = nlp('2am - 5pm').debug()
// let doc = nlp('9-5pm tuesday').debug()
// let m = doc.match('to 5pm tuesday').debug()
// console.log(m)
