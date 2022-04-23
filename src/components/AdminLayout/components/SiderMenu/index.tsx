import { defineComponent } from 'vue';
import { Layout, Menu } from 'ant-design-vue';
import { MenuFoldOutlined, MenuUnfoldOutlined } from '@ant-design/icons-vue';
import { useLayoutContext } from '../../Context';
import BaseMenu from '../BaseMenu';
import LogoAndTitle from '../LogoAndTitle';

export default defineComponent({
  name: 'SiderMenu',
  setup(props, { attrs }) {
    const context = useLayoutContext();
    return () => {
      const {
        prefixCls,
        settings: { layout, fixSiderbar, siderWidth, navTheme },
        collapsed,
        onCollapsedChange,
      } = context;
      const baseClassName = `${prefixCls}-sider`;
      return (
        <>
          {fixSiderbar && (
            <div
              style={{
                width: collapsed ? 48 : siderWidth,
                overflow: 'hidden',
                flex: `0 0 ${collapsed ? 48 : siderWidth}px`,
                maxWidth: `${collapsed ? 48 : siderWidth}px`,
                minWidth: `${collapsed ? 48 : siderWidth}px`,
                transition: `background-color 0.3s, min-width 0.3s, max-width 0.3s cubic-bezier(0.645, 0.045, 0.355, 1)`,
                ...(attrs.style as any),
              }}
            />
          )}
          <Layout.Sider
            collapsible
            trigger={null}
            collapsed={collapsed}
            onCollapse={onCollapsedChange}
            collapsedWidth={48}
            style={{
              overflow: 'hidden',
              ...(attrs.style as any),
            }}
            width={siderWidth}
            theme={navTheme}
            class={[
              baseClassName,
              {
                [`${baseClassName}-fixed`]: fixSiderbar,
                [`${baseClassName}-layout-${layout}`]: layout,
                [`${baseClassName}-light`]: navTheme === 'light',
              },
            ]}
          >
            <div
              class={[
                `${baseClassName}-logo`,
                {
                  [`${baseClassName}-collapsed`]: collapsed,
                },
              ]}
              id="logo"
            >
              <LogoAndTitle />
            </div>
            <div
              style={{
                flex: 1,
                overflowY: 'auto',
                overflowX: 'hidden',
              }}
            >
              <BaseMenu class={`${baseClassName}-menu`} />
            </div>
            <div class={`${baseClassName}-links`}>
              <Menu
                theme={navTheme}
                inlineIndent={16}
                class={`${baseClassName}-link-menu`}
                selectedKeys={[]}
                openKeys={[]}
                mode="inline"
              >
                <Menu.Item
                  class={`${baseClassName}-collapsed-button`}
                  title={false}
                  onClick={() => onCollapsedChange(!collapsed)}
                >
                  {collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
                </Menu.Item>
              </Menu>
            </div>
          </Layout.Sider>
        </>
      );
    };
  },
});
