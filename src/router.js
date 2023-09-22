import { createRouter, createWebHistory } from 'vue-router';

import CoachList from './pages/coaches/CoachList.vue';
// import CoachDetails from './pages/coaches/CoachDetails.vue';
// import CoachRegister from './pages/coaches/CoachRegister.vue';
// import RequestsList from './pages/requests/RequestsList.vue';
// import ContactCoach from './pages/requests/ContactCoach.vue';
import NotFound from './pages/NotFound.vue';
// import UserAuth from './pages/auth/UserAuth.vue';
import store from './store/index.js';

const CoachDetails = () => import('./pages/coaches/CoachDetails.vue');
const CoachRegister = () => import('./pages/coaches/CoachRegister.vue');
const ContactCoach = () => import('./pages/requests/ContactCoach.vue');
const RequestsList = () => import('./pages/requests/RequestsList.vue');
const UserAuth = () => import('./pages/auth/UserAuth.vue');

const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: '/', redirect: '/coaches' },
    { path: '/coaches', component: CoachList },
    {
      path: '/coaches/:id',
      component: CoachDetails,
      props: true,
      children: [{ path: 'contact', component: ContactCoach }], //coaches/1/contact
    },
    {
      path: '/register',
      component: CoachRegister,
      meta: { requiresAuth: true },
    },
    {
      path: '/requests',
      component: RequestsList,
      meta: { requiresAuth: true },
    },
    { path: '/:notFound(.*)', component: NotFound },
    { path: '/auth', component: UserAuth, meta: { requiresUnauth: true } },
  ],
});

router.beforeEach(function (to, _1, next) {
  if (to.meta.requiresAuth && !store.getters.isAuthenticated) {
    next('/auth');
  } else if (to.meta.requiresUnauth && store.getters.isAuthenticated) {
    next('/coaches');
  }
  next();
});

export default router;
