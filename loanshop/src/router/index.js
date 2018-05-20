import Vue from 'vue'
import Router from 'vue-router'
import loanList from '@/components/loanList'
import register from '@/components/register'
import his from '@/components/his'
import evaluate from '@/components/evaluate' 
import evaluateDetails from '@/components/evaluateDetails' 

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'loanList',
      component: loanList
    },
    {
      path: '/register',
      name: 'register',
      component: register
    },
    {
      path: '/his',
      name: 'his',
      component: his
    },
    {
      path: '/evaluate',
      name: 'evaluate',
      component: evaluate
    },
    {
      path: '/evaluateDetails',
      name: 'evaluateDetails',
      component: evaluateDetails
    }
  ]
})
