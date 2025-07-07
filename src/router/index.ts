import { createRouter, createWebHistory } from 'vue-router';
import LandingView from '@/views/LandingView/LandingView.vue';
import ContactView from '@/views/ContactView/ContactView.vue';
import LoginView from '@/views/LoginView/LoginView.vue';
import RegistrationView from '@/views/RegistrationView/RegistrationView.vue';
import DashboardView from '@/views/app/DashboardView/DashboardView.vue';
import ProfileView from '@/views/app/ProfileView/ProfileView.vue';
import PortfolioDetailsView from '@/views/app/PortfolioDetailsView/PortfolioDetailsView.vue';
import TemplateRouterView from '@/views/TemplatesView/TemplateRouterView.vue';
import AdminDashboardView from '@/views/admin/DashboardView/DashboardView.vue';
import NotFoundView from '@/views/ErrorsView/NotFoundView/NotFoundView.vue';
import { useAuthStore } from '@/stores/auth';
import UsersView from '@/views/admin/UsersView/UsersView.vue';
import RolesView from '@/views/admin/RolesView/RolesView.vue';
import TemplatesView from '@/views/admin/TemplatesView/TemplatesView.vue';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: LandingView,
    },
    {
      path: '/contact',
      name: 'contact',
      component: ContactView,
    },
    {
      path: '/sign-in',
      name: 'sign-in',
      component: LoginView,
    },
    {
      path: '/sign-up',
      name: 'sign-up',
      component: RegistrationView,
    },
    {
      path: '/profile/:username',
      meta: { layout: 'TemplateLayout' },
      name: 'user-portfolio',
      component: TemplateRouterView,
    },
    {
      path: '/app',
      name: 'app',
      meta: { requiresAuth: true, layout: 'UserLayout' },
      children: [
        {
          path: 'dashboard',
          name: 'dashboard',
          component: DashboardView,
        },
        {
          path: 'profile',
          name: 'profile',
          component: ProfileView,
        },
        {
          path: 'portfolio-details',
          name: 'portfolio-details',
          component: PortfolioDetailsView,
        },
      ],
    },
    {
      path: '/admin',
      name: 'admin',
      meta: { requiresAuth: true, requiresAdmin: true, layout: 'AdminLayout' },
      children: [
        {
          path: 'dashboard',
          name: 'admin-dashboard',
          component: AdminDashboardView,
        },
        {
          path: 'profile',
          name: 'admin-profile',
          component: ProfileView,
        },
        {
          path: 'users',
          name: 'users',
          component: UsersView,
        },
        {
          path: 'roles',
          name: 'roles',
          component: RolesView,
        },
        {
          path: 'templates',
          name: 'templates',
          component: TemplatesView,
        },
      ],
    },
    {
      path: '/:pathMatch(.*)*',
      name: 'not-found',
      meta: { layout: 'EmptyLayout' },
      component: NotFoundView,
    },

    // {
    //   path: '/about',
    //   name: 'about',
    //   // route level code-splitting
    //   // this generates a separate chunk (About.[hash].js) for this route
    //   // which is lazy-loaded when the route is visited.
    //   component: () => import('../views/AboutView.vue'),
    // },
  ],
});

router.beforeEach((to, from, next) => {
  const authStore = useAuthStore();

  if (to.meta.requiresAuth && !authStore.isAuthenticated) {
    return next('/sign-in'); // redirect if not logged in
  } else if (authStore.isAuthenticated && ['sign-in', 'home'].includes(to.name as string)) {
    if (authStore.user?.role?.name === 'admin') {
      return next('/admin/dashboard'); // redirect to admin dashboard if auth
    } else {
      return next('/app/dashboard'); // redirect to user dashboard if auth
    }
  } else if (
    (to.meta.requiresAdmin && authStore.user?.role?.name !== 'admin') ||
    (to.meta.requiresAuth && !to.meta.requiresAdmin && authStore.user?.role?.name === 'admin')
  ) {
    return next('/not-found');
  } else {
    return next();
  }
});

export default router;
