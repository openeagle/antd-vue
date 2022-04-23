import { VNode, defineComponent, isVNode, resolveComponent } from 'vue';
import { Menu } from 'ant-design-vue';
import { createFromIconfontCN } from '@ant-design/icons-vue';
import { LayoutContextProps, RouteRecordMenu } from '../../typings';
import { useLayoutContext } from '../../Context';
import isImg from '../../utils/isImg';
import isUrl from '../../utils/isUrl';

class MenuUtil {
  props: LayoutContextProps;
  IconFont: any;

  constructor(props: LayoutContextProps) {
    this.props = props;
    this.IconFont = createFromIconfontCN({
      scriptUrl: '',
    });
  }

  getIcon = (icon?: string | VNode, iconPrefixes = 'icon-'): VNode | null => {
    if (typeof icon === 'string' && icon !== '') {
      if (isUrl(icon) || isImg(icon)) {
        return (
          <img
            src={icon}
            alt="icon"
            class={`${this.props.prefixCls}-sider-menu-icon`}
          />
        ) as VNode;
      }
      if (icon.startsWith(iconPrefixes)) {
        const IconFont = this.IconFont;
        return (<IconFont type={icon} />) as VNode;
      }
    }
    if (isVNode(icon)) {
      return icon;
    }
    return null;
  };

  getNavMenuItems = (routes: RouteRecordMenu[] = [], isChildren: boolean) => {
    return routes
      .map((item) => this.getSubMenuOrItem(item, isChildren))
      .filter((item) => item);
  };

  getSubMenuOrItem = (item: RouteRecordMenu, isChildren: boolean) => {
    if (item.meta?.hideInMenu) {
      return null;
    }
    if (
      Array.isArray(item.children) &&
      item.children.length > 0 &&
      !item.meta?.hideChildrenInMenu
    ) {
      const { prefixCls = 'ant-pro' } = this.props;
      const menuTitle = item.meta?.title;
      const defaultTitle = item.meta?.icon ? (
        <span class={`${prefixCls}-menu-item`}>
          {!isChildren ? this.getIcon(item.meta.icon) : null}
          <span class={`${prefixCls}-menu-item-title`}>{menuTitle}</span>
        </span>
      ) : (
        <span class={`${prefixCls}-menu-item`}>{menuTitle}</span>
      );
      const MenuComponent =
        item.meta?.type === 'group' ? Menu.ItemGroup : Menu.SubMenu;
      return (
        <MenuComponent title={defaultTitle} key={item.path}>
          {this.getNavMenuItems(item.children, true)}
        </MenuComponent>
      );
    }

    return (
      <Menu.Item
        inlineIndent={24}
        disabled={item.meta?.disabled}
        key={item.path}
        // onClick={}
      >
        {this.getMenuItem(item, isChildren)}
      </Menu.Item>
    );
  };

  getMenuItem = (item: RouteRecordMenu, isChildren: boolean) => {
    const meta = Object.assign({}, item.meta);
    const target = meta.target || null;
    const hasUrl = isUrl(item.path);
    const CustomTag: any = resolveComponent((target && 'a') || 'router-link');
    const props = { to: { path: item.redirect || item.path } };
    const attrs = hasUrl || target ? { href: item.path, target: target } : {};

    const { prefixCls = 'ant-pro' } = this.props;
    const menuTitle = item.meta?.title;
    const defaultTitle = item.meta?.icon ? (
      <CustomTag {...attrs} {...props}>
        <span class={`${prefixCls}-menu-item`}>
          {!isChildren ? this.getIcon(item.meta.icon) : null}
          <span class={`${prefixCls}-menu-item-title`}>{menuTitle}</span>
        </span>
      </CustomTag>
    ) : (
      <CustomTag {...attrs} {...props}>
        <span class={`${prefixCls}-menu-item`}>{menuTitle}</span>
      </CustomTag>
    );

    return defaultTitle;
  };

  conversionPath = (path: string) => {
    if (path && path.indexOf('http') === 0) {
      return path;
    }
    return `/${path || ''}`.replace(/\/+/g, '/');
  };
}

export default defineComponent({
  name: 'BaseMenu',
  setup() {
    const context = useLayoutContext();
    const menuUtils = new MenuUtil(context);
    return () => {
      const {
        settings: { layout, navTheme },
        openMenus,
        selectedMenus,
        onOpenMenusChange,
        onSelectedMenusChange,
      } = context;
      const baseClassName = `${context.prefixCls}-menu`;
      const mode = layout === 'top' ? 'horizontal' : 'inline';
      return (
        <Menu
          class={baseClassName}
          mode={mode}
          theme={navTheme}
          openKeys={openMenus}
          selectedKeys={selectedMenus}
          onOpenChange={onOpenMenusChange}
          onSelectChange={onSelectedMenusChange}
        >
          {menuUtils.getNavMenuItems(context.routes, false)}
        </Menu>
      );
    };
  },
});
