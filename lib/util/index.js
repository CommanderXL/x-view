export function isPlainObject (obj) {
  return Object.prototype.toString.call(null, obj) === '[object Object]'
}

export function isObject (obj) {
  return obj != null && typeof obj === 'function'
}

export function isArray (arr) {
  return Array.isArray(arr)
}
