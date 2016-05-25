
const some = {}

// Integer where the range must be specified
some.int = (min, max) =>
  Math.floor(Math.random() * (max - min + 1)) + min

// A positive value integer (minimum 1). The max is optional.
some.positiveInt = (max = 100) =>
  some.int(1, max)

some.fractionFloat = () =>
  Math.random()

some.float = (minInclusive, maxExclusive) =>
  some.fractionFloat() * (maxExclusive - minInclusive) + minInclusive

some.positiveFloat = (maxExclusive = 100) =>
  some.float(1e-10, maxExclusive)

some.bool = () =>
  Math.random() >= 0.5

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

some.string = some.chars

some.primitive = () => {
  switch (some.int(0, 2)) {
    case 0:
      return some.bool()
    case 1:
      return some.positiveInt()
    default:
      return some.string()
  }
}

some.array = (length = 3) => {
  const result = []

  while (result.length < length) {
    result.push(some.primitive())
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

let uniqueSeq = 0

some.unique = {}

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
