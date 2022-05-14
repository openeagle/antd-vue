import { VNode, defineComponent, reactive, provide, ref } from 'vue';
import { RouterView, useRouter } from 'vue-router';
import { GlobalOutlined, DatabaseFilled, CopyrightCircleFilled } from '@ant-design/icons-vue';
import { AdminLayout } from '@/index';
import { LayoutContextProps, Settings, TopTabs } from '@/components/AdminLayout';
import { routes, routes2 } from '../router';

export default defineComponent({
  name: 'App',
  setup(props) {
    const router = useRouter()
    const settings = reactive<Settings>({
      ...AdminLayout.defaultSettings,
      title: '@openeagle/antd-vue',
      layout: 'side',
      fixedHeader: true,
      headerTheme: 'dark',
      navTheme: 'dark',
      contentWidth: 'Fluid',
      routerTabs: true,
      topTabsIcon: true,
      iconScriptUrl: '//at.alicdn.com/t/font_2193705_45vwi7jvpg7.js'
    });
    const currentRoutes = ref(routes)
    const topTabs = [{
      icon: <DatabaseFilled />,
      key: "data",
      text: "数据",
    }, {
      icon: <CopyrightCircleFilled />,
      key: "tuiguang",
      text: "推广",
    }

    ]
    provide('settings', settings);

    const rightContentRender = (context: LayoutContextProps) => {
      return (
        <AdminLayout.RightContent>
          <a
            class="action"
            style={{
              color: 'inherit',
            }}
            target="_blank"
            href="https://openeagle.github.io/antd-vue/"
            rel="noopener noreferrer"
          >
            <GlobalOutlined />
          </a>
        </AdminLayout.RightContent>
      ) as VNode;
    };
    const onTopTabsClick = (tab: TopTabs) => {
      if (tab.key === 'tuiguang') {
        const routerArr = [{
          path: '/router-test/test-1',
          name: 'router-test-1',
          component: 'RouterTest1',
          meta: {
            icon: ''
          }
        }, {
          path: '/router-test/test-2',
          name: 'router-test-2',
          component: 'RouterTest2',
          meta: {
            icon: ''
          }
        }]
        currentRoutes.value = routes2
        routerArr.forEach((navigation) => {
          router.addRoute('openeagle', {
            path: navigation.path,
            meta: navigation.meta,
            name: navigation.name,
            component: () => import(`../components/${navigation.component}`)
          })
        })
        console.log('router.currentRoute.value.fullPath')
        router.replace('/router-test/test-1')
      } else {
        currentRoutes.value = routes
        router.replace('/components')
      }
    }


    return () => {
      return (
        <AdminLayout
          settings={settings}
          topTabs={topTabs}
          routes={currentRoutes.value}
          onTopTabsClick={onTopTabsClick}
          rightContentRender={rightContentRender}
        >
          <RouterView />
        </AdminLayout>
      );
    };
  },
});
