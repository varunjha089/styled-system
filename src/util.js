const { get } = require('dot-prop')
const { breakpoints } = require('./constants')

const is = n => n !== undefined && n !== null
const num = n => typeof n === 'number' && !isNaN(n)
const px = n => num(n) ? n + 'px' : n
const em = n => num(n) ? n + 'em' : n
const neg = n => n < 0
const arr = n => Array.isArray(n) ? n : [ n ]

// keeping for backwards-compatibility only
const idx = (keys, obj) => get(obj, keys.join('.')) || null

const mq = n => `@media screen and (min-width: ${em(n)})`

const breaks = props => [
  null,
  ...get(props, 'theme.breakpoints', breakpoints).map(mq)
]

const dec = props => val => arr(props)
  .reduce((acc, prop) => (acc[prop] = val, acc), {})

const media = bp => (d, i) => is(d)
  ? bp[i] ? ({ [bp[i]]: d }) : d
  : null

const merge = (a, b) => Object.assign({}, a, b, Object.keys(b).reduce((obj, key) =>
  Object.assign(obj, {
    [key]: a[key] !== null && typeof a[key] === 'object'
    ? merge(a[key], b[key])
    : b[key]
  }),
  {}))

module.exports = {
  is,
  px,
  em,
  neg,
  num,
  arr,
  idx,
  breaks,
  media,
  dec,
  merge,
  mq
}
