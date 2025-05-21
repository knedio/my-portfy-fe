import { createRouter, createWebHistory } from 'vue-router';
import LandingView from '@/views/LandingView/LandingView.vue';
import ContactView from '@/views/ContactView/ContactView.vue';
import LoginView from '@/views/LoginView/LoginView.vue';
import RegistrationView from '@/views/RegistrationView/RegistrationView.vue';
import DashboardView from '@/views/app/DashboardView/DashboardView.vue';
import ProfileView from '@/views/app/ProfileView/ProfileView.vue';
import PortfolioDetailsView from '@/views/app/PortfolioDetailsView/PortfolioDetailsView.vue';
import TemplateNebulaView from '@/views/TemplatesView/TemplateNebulaView/TemplateNebulaView.vue';
import TemplateMistView from '@/views/TemplatesView/TemplateMistView/TemplateMistView.vue';
import TemplateLuminaView from '@/views/TemplatesView/TemplateLuminaView/TemplateLuminaView.vue';
import TemplateAetherView from '@/views/TemplatesView/TemplateAetherView/TemplateAetherView.vue';
import TemplateOrionView from '@/views/TemplatesView/TemplateOrionView/TemplateOrionView.vue';

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
      path: '/templates',
      name: 'templates',
      meta: { layout: 'TemplateLayout' },
      children: [
        {
          path: 'nebula',
          name: 'nebula',
          component: TemplateNebulaView,
        },
        {
          path: 'mist',
          name: 'mist',
          component: TemplateMistView,
        },
        {
          path: 'lumina',
          name: 'lumina',
          component: TemplateLuminaView,
        },
        {
          path: 'aether',
          name: 'aether',
          component: TemplateAetherView,
        },
        {
          path: 'orion',
          name: 'orion',
          component: TemplateOrionView,
        },
      ],
    },
    {
      path: '/app',
      name: 'app',
      meta: { requiresAuth: true },
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
  const token = localStorage.getItem('token');

  if (to.meta.requiresAuth && !token) {
    next('/sign-in'); // redirect if not logged in
  } else if (token && to.name === 'sign-in') {
    next('/app/dashboard'); // redirect to dashboard if auth
  } else {
    next();
  }
});

export default router;
