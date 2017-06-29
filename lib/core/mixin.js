import { initState } from './initState'

export function mixin (XView) {
  XView.prototype._init = function (options) {
    /**
     * el
     * data
     * props
     * computed
     */
    const vm = this
    this.$options = options || {}
    initState(vm)
  }
}
