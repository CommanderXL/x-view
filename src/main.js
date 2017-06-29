// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import 'babel-polyfill'
import XView from 'lib/index'

/* eslint-disable no-new */
new XView({
  el: '#app',
  data: {
    a: 1,
    b: 2,
    c: 3
  }
})
