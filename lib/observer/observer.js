import { isArray, isObject } from '../util/index'

export function observe (data) {
  if (!isObject(data)) return
  let ob = new Observer(data)

  return ob
}


function defineReactive (obj, key, value) {
  const dep = new Dep()

  const property = Object.getOwnPropertyDescriptor(obj, key)
  if (property && !property.configurable) {
    return
  }

  const getter = property && property.get
  const setter = property && property.set

  let childOb = observe(value)
  Object.defineProperty(obj, key, {
    enumerable: true,
    configurable: true,
    get () {
      const value = getter ? getter.call(this) : value

      if (Dep.target) {
        dep.depend()
      }

      return value
    },
    set (newValue) {
      value = getter ? getter.call(this) : value
      if (setter) {
        setter.call(this, newValue)
      } else {
        value = newValue
      }
      childOb = observe(newValue)
      dep.notify()
    }
  })
}


function walk (obj) {
  // 不用for in循环，不需要遍历
  const keys = Object.keys(obj)
  for (let i = 0; i < keys.length; i++) {
    defineReactive(obj, keys[i], obj[keys[i]])
  }
}

function observeArray(arr) {
  for (let i = 0; i < arr.length; i++) {
    observe(arr[i])
  }
}

class Observer {
  constructor (value) {
    this.value = value
    this.dep = new Dep()

    if (isArray(value)) {
      observeArray(value)
    } else {
      walk(value)
    }
  }
}

let uid = 0
class Dep {
  constructor () {
    this.uid = uid++
    this.subs = []
  }

  depend () {
    if (Dep.target) {
      Dep.target.addDep(this)
    }
  }

  addDep (dep) {
    this.subs.push(dep)
  }

  removeDep (dep) {
    // remove(dep)
  }
}

let wid = 0

class Watcher {
  constructor (
    vm,
    expOrFn,
    cn,
    options
  ) {
    this.vm = vm
    this.id = wid++
    vm._watchers.push(this)
    this.deps = []

    if (typeof expOrFn === 'function') {
      this.getter = expOrFn
    } else {
      // 这里parsePath是做属性的切分，返回一个匿名函数，接收vm
      this.getter = parsePath(expOrFn)
    }

    this.value = this.lazy
      ? undefined
      : this.get()
  }

  get () {
    pushTarget(this)
    let value
    const vm = this.vm
    if (this.user) {
    } else {
      value = this.getter.call(vm, vm)
    }
  }
}

function parsePath (path) {
  var segments = path.split('.')
  return function (obj) {
    for (let i = 0; i < segments.length; i++) {
      if (!obj) return
      obj = obj[segments[i]]
    }
    return obj
  }
}

Dep.target = null
const targetStack = []

function pushTarget (watcher) {
  if (Dep.target) targetStack.push(watcher)
  Dep.target = watcher
}

function popTarget () {
  Dep.target = targetStack.pop()
}
