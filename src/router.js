import Vue from 'vue'
import Router from 'vue-router'
import LoginView from './views/LoginView.vue'
import ChangePasswordView from './views/ChangePasswordView.vue'
import GalleryView from './views/GalleryView.vue'
import DetailsView from './views/DetailsView.vue'
import ProfileView from './views/ProfileView.vue'
import CartView from './views/CartView.vue'
import CheckOutView from './views/CheckOutView.vue'

Vue.use(Router);

export default new Router({
    currentRoute: "",
    mode: 'hash',
    routes: [
      {
        path: '/',
        name: 'gallery',
        component: GalleryView
      },
      {
        path: '/change-password',
        name: 'change-password',
        component: ChangePasswordView
      },
      {
        path: '/login',
        name: 'login',
        component: LoginView
      },
      {
        path: '/details',
        name: 'details',
        component: DetailsView
      },
      {
        path: '/profile',
        name: 'profile',
        component: ProfileView
      },
      {
        path: '/cart',
        name: 'cart',
        component: CartView
      },
      {
        path: '/checkout',
        name: 'checkout',
        component: CheckOutView
      },
      
      ]
})
