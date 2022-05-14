import { RouterView, createWebHistory, RouteRecordRaw } from 'vue-router';
import { RouteRecordMenu } from '@/components/AdminLayout';
import { createRouter } from '../src';

export const routes: RouteRecordMenu[] = [
  {
    name: 'components',
    path: '/components',
    component: RouterView,
    redirect: '/components/admin-layout',
    meta: {
      title: 'Components',
    },
    children: [
      {
        name: 'components_admin-layout',
        path: '/components/admin-layout',
        component: () => import('./components/AdminLayout'),
        meta: {
          title: 'AdminLayout',
        },
      },
      {
        name: 'components_admin-search',
        path: '/components/admin-search',
        component: RouterView,
        meta: {
          title: 'AdminSearch',
        },
        children: [
          {
            name: 'components_admin-search_search-form',
            path: '/components/admin-search/search-form',
            component: RouterView,
            meta: {
              title: 'SearchForm',
            },
            children: [
              {
                name: 'components_admin-search_initial-value',
                path: '/components/admin-search/search-form/initial-value',
                component: () =>
                  import('./components/AdminSearch/SearchForm/InitialValue'),
                meta: {
                  title: 'Initial Value',
                },
              },
              {
                name: 'components_admin-search_search_form_layout',
                path: '/components/admin-search/search-form/layout',
                component: () =>
                  import('./components/AdminSearch/SearchForm/Layout'),
                meta: {
                  title: 'Layout',
                },
              },
              {
                name: 'components_admin-search_search_form_custom-control',
                path: '/components/admin-search/search-form/custom-control',
                component: () =>
                  import('./components/AdminSearch/SearchForm/CustomControl'),
                meta: {
                  title: 'CustomControl',
                },
              },
            ],
          },
          {
            name: 'components_admin-search_search-table',
            path: '/components/admin-search/search-table',
            component: RouterView,
            meta: {
              title: 'SearchTable',
            },
            children: [
              {
                name: 'components_admin-search_search_table_realworld',
                path: '/components/admin-search/search-table/realworld',
                component: () =>
                  import('./components/AdminSearch/SearchTable/RealWorld'),
                meta: {
                  title: 'RealWorld',
                },
              },
            ],
          },
        ],
      },
      {
        name: 'components_loader',
        path: '/components/loader',
        component: () => import('./components/Loader'),
        meta: {
          title: 'Loader',
        },
      },
      {
        name: 'components_number-text',
        path: '/components/number-text',
        component: () => import('./components/NumberText'),
        meta: {
          title: 'NumberText',
        },
      },
      {
        name: 'components_remote-select',
        path: '/components/remote-select',
        component: () => import('./components/RemoteSelect'),
        meta: {
          title: 'RemoteSelect',
        },
      },
      {
        name: 'components_search-select',
        path: '/components/search-select',
        component: () => import('./components/SearchSelect'),
        meta: {
          title: 'SearchSelect',
        },
      },
      {
        name: 'components_uploader',
        path: '/components/uploader',
        component: () => import('./components/Uploader'),
        meta: {
          title: 'Uploader',
        },
      },
      {
        name: 'components_url-image-uploader',
        path: '/components/url-image-uploader',
        component: () => import('./components/URLImageUploader'),
        meta: {
          title: 'URLImageUploader',
        },
      },
      {
        name: 'components_url-video-uploader',
        path: '/components/url-video-uploader',
        component: () => import('./components/URLVideoUploader'),
        meta: {
          title: 'URLVideoUploader',
        },
      },
      {
        name: 'components_video-uploader',
        path: '/components/video-uploader',
        component: () => import('./components/VideoUploader'),
        meta: {
          title: 'VideoUploader',
        },
      },
      {
        name: 'components_week-time',
        path: '/components/week-time',
        component: () => import('./components/WeekTime'),
        meta: {
          title: 'WeekTime',
        },
      },
      {
        name: 'components_address-select',
        path: '/components/address-select',
        component: () => import('./components/AddressSelect'),
        meta: {
          title: 'AddressSelect',
        },
      },
      {
        name: 'components_count-down',
        path: '/components/count-down',
        component: () => import('./components/CountDown'),
        meta: {
          title: 'CountDown',
        },
      },
      {
        name: 'components_address-detail',
        path: '/components/address-detail',
        component: () => import('./components/AddressDetail'),
        meta: {
          title: 'AddressDetail',
        },
      },
      {
        name: 'components_code',
        path: '/components/code',
        component: () => import('./components/Catpcha'),
        meta: {
          title: 'Catpcha',
        },
      },
      {
        name: 'components_address-tree-select',
        path: '/components/AddressTreeSelect',
        component: () => import('./components/AddressTreeSelect'),
        meta: {
          title: 'AddressTreeSelect',
        },
      },
      {
        name: 'components_mix-check',
        path: '/components/MixCheck',
        component: () => import('./components/MixCheck'),
        meta: {
          title: 'MixCheck',
        },
      },
      {
        name: 'components_tinymce',
        path: '/components/Tinymce',
        component: () => import('./components/Tinymce'),
        meta: {
          title: 'Tinymce',
        },
      },
    ],
  },
  {
    name: 'hook',
    path: '/hook',
    component: RouterView,
    redirect: '/components/admin-layout',
    meta: {
      title: 'Hook',
    },
    children: [
      {
        name: 'hook_useModal',
        path: '/hook/useModal',
        component: () => import('./hooks/useModal'),
        meta: {
          title: 'UseModal',
        },
      },
    ],
  },
];

export const routes2: RouteRecordMenu[] = [
  {
    name: 'router-test',
    path: '/router-test',
    component: RouterView,
    redirect: '/router-test/test-1',
    meta: {
      title: 'test',
    },
    children: [
      {
        name: 'router-test-1',
        path: '/router-test/test-1',
        component: () => import('./components/RouterTest1'),
        meta: {
          title: 'test-1',
        },
      },
      {
        name: 'router-test-2',
        path: '/router-test/test-2',
        component: () => import('./components/RouterTest2'),
        meta: {
          title: 'test-2',
        },
      },
    ],
  },
  // {
  //   name: 'components',
  //   path: '/test1',
  //   component: RouterView,
  //   redirect: '/components/test-1',
  //   meta: {
  //     title: 'test2',
  //   },
  //   children: [
  //     {
  //       name: 'router-test-3',
  //       path: '/components/test-3',
  //       component: () => import('./components/RouterTest3'),
  //       meta: {
  //         title: 'AdminLayout',
  //       },
  //     },
  //     {
  //       name: 'router-test-4',
  //       path: '/components/test-4',
  //       component: () => import('./components/RouterTest4'),
  //       meta: {
  //         title: 'AdminLayout',
  //       },
  //     },
  //   ],
  // }
];

const router = createRouter({
  history: createWebHistory('/'),
  routes: [
    {
      path: '/',
      name: 'openeagle',
      redirect: '/components',
      component: () => import('./layout'),
      meta: {
        title: '布局',
      },
      children: routes as RouteRecordRaw[],
    },
  ],
  scrollBehavior() {
    // 始终滚动到顶部
    return { top: 0 };
  },
});

export default router;
