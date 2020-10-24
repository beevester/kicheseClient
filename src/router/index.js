import Vue from 'vue'
import VueRouter from 'vue-router'
import VueBodyClass from 'vue-body-class'

import store from '../store'
import SignIn from '../pages/SignIn'
import MainSlot from '../components/layout/MainSlot'

import taskRoutes from './task'
import companyRoutes from './company'
import projectRoutes from './project'
import documentRoutes from './document'
import templateRoutes from './template'
import templateTypeRoutes from './templateType'
import paymentTypeRoutes from './paymentType'
import shipmentMethodRoutes from './shipmentMethod'
import clientRoutes from './client'
import searchRoutes from './search'
import calendarRoutes from './calendar'
import userRoutes from './user'
import groupRoutes from './group'
import contactRoutes from './contact'
import contactTypeRoutes from './contactType'
import labelRoutes from './label'
import addressRoutes from './address'
import categoryRoutes from './category'
import countryRoutes from './country'
import currencyRoutes from './currency'
import orderHeaderRoutes from './orderHeader'
import orderStatusRoutes from './orderStatus'
import orderLineStatusRoutes from './orderLineStatus'
import invoiceHeaderRoutes from './invoiceHeader'
import invoiceStatusRoutes from './invoiceStatus'
import invoiceTypeRoutes from './invoiceType'
import languageRoutes from './language'
import productRoutes from './product'
import vatRoutes from './vat'
import projectStatusRoutes from './projectStatus'
import projectTypeRoutes from './projectType'
import taskStatusRoutes from './taskStatus'
import dashboardRoutes from './dashboard'
import brandRoutes from './brand'
import channelRoutes from './channel'
import textRoutes from './text'
import historyRoutes from './history'
import opportunityRoutes from './opportunity'
import opportunityStatusRoutes from './opportunityStatus';

Vue.use(VueRouter)

const routes = [
  {
    path: '/signin',
    name: 'SignIn',
    component: SignIn,
    meta: {
      requiresAuth: false,
      bodyClass: 'hold-transition login-page'
    }
  },
  {
    path: '/',
    component: MainSlot,
    children: [
      ...textRoutes,
      ...labelRoutes,
      ...paymentTypeRoutes,
      ...shipmentMethodRoutes,
      ...brandRoutes,
      ...dashboardRoutes,
      ...searchRoutes,
      ...calendarRoutes,
      ...clientRoutes,
      ...companyRoutes,
      ...documentRoutes,
      ...templateRoutes,
      ...templateTypeRoutes,
      ...taskRoutes,
      ...projectRoutes,
      ...opportunityRoutes,
      ...opportunityStatusRoutes,
      ...userRoutes,
      ...contactRoutes,
      ...contactTypeRoutes,
      ...groupRoutes,
      ...channelRoutes,
      ...addressRoutes,
      ...categoryRoutes,
      ...countryRoutes,
      ...currencyRoutes,
      ...orderHeaderRoutes,
      ...orderStatusRoutes,
      ...orderLineStatusRoutes,
      ...invoiceHeaderRoutes,
      ...invoiceStatusRoutes,
      ...invoiceTypeRoutes,
      ...languageRoutes,
      ...productRoutes,
      ...projectStatusRoutes,
      ...projectTypeRoutes,
      ...taskStatusRoutes,
      ...historyRoutes,
      ...vatRoutes
    ],
    redirect: { name: 'Dashboard' },
    meta: {
      requiresAuth: true,
      bodyClass: 'hold-transition skin-blue sidebar-mini'
    }
  }
]

const router = new VueRouter({
  mode: 'history',
  routes
})

const vueBodyClass = new VueBodyClass(routes);

router.beforeEach((to, from, next) => {
  vueBodyClass.guard(to, next)

  const token = store.getters['auth/jwtDecoded'] || null
  const authorized = token && token.exp > Date.now() / 1000

  if (authorized) {
    if (to.matched.some(record => !record.meta.requiresAuth)) {
      next({ name: 'Dashboard' })
    }
  } else if (to.matched.some(record => record.meta.requiresAuth)) {
    next({ name: 'SignIn' })
  }

  next()
})

export default router