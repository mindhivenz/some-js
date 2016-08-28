
const some = {}

// Integer where the range must be specified
some.int = (min, max) =>
  Math.floor(Math.random() * (max - min + 1)) + min

// A positive value integer (minimum 1) with optional max
some.positiveInt = (max = 100) =>
  some.int(1, max)

// A float between 0 (inclusive) and 1 (exclusive)
some.fractionFloat = () =>
  Math.random()

// A float where the range must be specified
some.float = (minInclusive, maxExclusive) =>
  some.fractionFloat() * (maxExclusive - minInclusive) + minInclusive

// A float between 0 (exclusive) and the given max (exclusive and optional)
some.positiveFloat = (maxExclusive = 100) =>
  some.float(1e-10, maxExclusive)

// true or false
some.bool = () =>
  Math.random() >= 0.5

// A string of upper and lowercase latin characters, length is random if omitted
some.chars = (length = some.int(3, 5)) => {
  const capitalStartCode = 'A'.charCodeAt(0)
  const lowerStartCode = 'a'.charCodeAt(0)
  let result = ''

  while (result.length < length) {
    const startCode = some.bool() ? capitalStartCode : lowerStartCode
    result += String.fromCharCode(startCode + some.int(0, 25))
  }
  return result
}

// An alias for some.chars
some.string = some.chars

const mongoIdChars = '23456789ABCDEFGHJKLMNPQRSTWXYZabcdefghijkmnopqrstuvwxyz'

some.mongoId = () => {
  let result = ''
  while (result.length < 17) {
    result += mongoIdChars[some.int(0, mongoIdChars.length - 1)]
  }
  return result
}

some.primitive = () => {
  switch (some.int(0, 2)) {
    case 0:
      return some.bool()
    case 1:
      return some.int(0, 100)
    default:
      return some.string()
  }
}

some.array = (length = 3) =>
  some.arrayOf(some.primitive, length)

some.arrayOf = (generator, length = 3) => {
  const result = []

  while (result.length < length) {
    result.push(generator())
  }
  return result
}

some.object = (numberOfKeys = 3) => {
  const result = {}

  while (Object.keys(result).length < numberOfKeys) {
    result[some.string()] = some.primitive()
  }
  return result
}

some.nullOrUndefined = () =>
  some.bool() ? null : undefined

some.nonExistantReference = some.nullOrUndefined

some.exception = () => {
  function SomeException() {}
  return SomeException
}

some.error = some.exception

some.ipAddress = () =>
  `${some.int(1, 255)}.${some.int(1, 255)}.${some.int(1, 255)}.${some.int(1, 255)}`

some.one = (object) => {
  const values = Object.values(object)
  return values[some.int(0, values.length - 1)]
}

some.enum = (enumClass) =>
  some.one(enumClass.enumValues)

some.pastDate = () =>
  new Date(Date.now() - some.positiveInt(1000 * 60 * 60 * 24 * 1000))

some.futureDate = () =>
  new Date(Date.now() + some.positiveInt(1000 * 60 * 60 * 24 * 1000))

let uniqueSeq = 0

some.unique = {}

// An integer guaranteed not to produce the same value twice
some.unique.int = () =>
  ++uniqueSeq

some.unique.string = (prefix = some.chars(3)) => {
  let result = prefix
  if (result.includes(' ')) {
    result += ' '
  }
  return result + some.positiveInt()
}

module.exports = some
