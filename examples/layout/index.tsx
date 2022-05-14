import { VNode, defineComponent, reactive, provide, ref } from 'vue';
import { RouterView } from 'vue-router';
import { GlobalOutlined, DatabaseFilled, CopyrightCircleFilled } from '@ant-design/icons-vue';
import { AdminLayout } from '@/index';
import { LayoutContextProps, Settings, TopTabs } from '@/components/AdminLayout';
import { routes, routes2 } from '../router';

export default defineComponent({
  name: 'App',
  setup(props) {
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
        currentRoutes.value = routes2
      } else {
        currentRoutes.value = routes
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
