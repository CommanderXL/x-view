import { observe } from '../observer/observer'

export function initState (vm) {
  const opts = vm.$options
  opts.data && initData(vm)
}

function initData (vm) {
  let data = vm.$options.data
  data = vm._data = typeof data === 'function'
    ? data()
    : data || {}
  observe(data)
}

