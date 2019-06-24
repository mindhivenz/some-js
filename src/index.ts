// Integer where the range must be specified
export const integer = (minInclusive: number, maxInclusive: number) =>
  Math.floor(Math.random() * (maxInclusive - minInclusive + 1)) + minInclusive

export { integer as int }

// A positive value integer (minimum 1) with optional max
export const positiveInt = (max = 100) => integer(1, max)

export const negativeInt = (min = -100) => integer(min, -1)

// A float between 0 (inclusive) and 1 (exclusive)
export const fractionFloat = () => Math.random()

// A float where the range must be specified
export const float = (minInclusive: number, maxExclusive: number) =>
  fractionFloat() * (maxExclusive - minInclusive) + minInclusive

// A float between 0 (exclusive) and the given max (exclusive and optional)
export const positiveFloat = (maxExclusive = 100) => float(1e-10, maxExclusive)

// true or false
export const bool = () => Math.random() >= 0.5

// A string of upper and lowercase latin characters, length is random if omitted
export const chars = (length = integer(3, 5)) => {
  const capitalStartCode = 'A'.charCodeAt(0)
  const lowerStartCode = 'a'.charCodeAt(0)
  let result = ''

  while (result.length < length) {
    const startCode = bool() ? capitalStartCode : lowerStartCode
    result += String.fromCharCode(startCode + integer(0, 25))
  }
  return result
}

// An alias for some.chars
export { chars as string }

const mongoIdChars = '23456789ABCDEFGHJKLMNPQRSTWXYZabcdefghijkmnopqrstuvwxyz'

export const mongoId = () => {
  let result = ''
  while (result.length < 17) {
    result += mongoIdChars[integer(0, mongoIdChars.length - 1)]
  }
  return result
}

export const primitive = () => {
  switch (integer(0, 2)) {
    case 0:
      return bool()
    case 1:
      return integer(-100, 100)
    default:
      return chars()
  }
}

export const notStringPrimitive = () => {
  return bool() ? integer(-100, 100) : bool()
}

export const notNumberPrimitive = () => {
  return bool() ? bool() : chars()
}

export const notBoolPrimitive = () => {
  return bool() ? integer(-100, 100) : chars()
}

export const array = (length = integer(2, 4)) => arrayOf(primitive, length)

export const arrayOf = <T>(generator: () => T, length = integer(2, 4)) => {
  const result = []

  while (result.length < length) {
    result.push(generator())
  }
  return result
}

export const object = (numberOfKeys = 3) => {
  const result: Record<string, ReturnType<typeof primitive>> = {}

  while (Object.keys(result).length < numberOfKeys) {
    result[chars()] = primitive()
  }
  return result
}

export const nullOrUndefined = () => (bool() ? null : undefined)

export { nullOrUndefined as nonExistentReference }

export const ipAddress = () =>
  `${integer(1, 255)}.${integer(1, 255)}.${integer(1, 255)}.${integer(1, 255)}`

export const email = () => `${chars()}@${chars()}.com`

export const one = <T = any>(possibilities: T[]) => {
  return possibilities[integer(0, possibilities.length - 1)]
}

export const pastDate = (before = new Date()) =>
  new Date(before.getTime() - positiveInt(1000 * 60 * 60 * 24 * 1000))

export const pastDates = (length = integer(3, 5), before = new Date()) => {
  let result: Date[] = []
  let lastDate = before
  while (result.length < length) {
    const newDate = pastDate(lastDate)
    result = [newDate, ...result]
    lastDate = newDate
  }
  return result
}

export const futureDate = (after = new Date()) =>
  new Date(after.getTime() + positiveInt(1000 * 60 * 60 * 24 * 1000))

export const futureDates = (length = integer(3, 5), after = new Date()) => {
  let result: Date[] = []
  let lastDate = after
  while (result.length < length) {
    const newDate = futureDate(lastDate)
    result = [...result, newDate]
    lastDate = newDate
  }
  return result
}

export const dateBetween = (startDate: Date, endDate: Date) =>
  new Date(integer(startDate.getTime(), endDate.getTime()))

let uniqueSeq = 0

export const unique = {
  int: () => unique.integer(),
  integer: () => ++uniqueSeq,
  string: (prefix = chars(3)) => {
    let result = prefix
    if (result.includes(' ')) {
      result += ' '
    }
    return result + unique.integer()
  },
}
