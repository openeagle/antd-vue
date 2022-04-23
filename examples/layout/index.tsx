import { VNode, defineComponent, reactive, provide } from 'vue';
import { RouterView } from 'vue-router';
import { GlobalOutlined } from '@ant-design/icons-vue';
import { AdminLayout } from '@/index';
import { LayoutContextProps, Settings } from '@/components/AdminLayout';
import { routes } from '../router';

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
    });
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
    return () => {
      return (
        <AdminLayout
          settings={settings}
          routes={routes}
          rightContentRender={rightContentRender}
        >
          <RouterView />
        </AdminLayout>
      );
    };
  },
});
