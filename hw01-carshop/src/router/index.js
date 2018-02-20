import Vue from 'vue'
import Router from 'vue-router'
import CarList from '@/components/CarList'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'CarList',
      component: CarList
    }
  ]
})
