import { VNode } from 'vue';
import {
  _RouteRecordBase,
  RouteComponent,
  RouteMeta,
  RouteLocationNormalized,
} from 'vue-router';

export type MenuMode =
  | 'vertical'
  | 'vertical-left'
  | 'vertical-right'
  | 'horizontal'
  | 'inline';

// 路由菜单元信息
export interface RouteMenuMeta extends RouteMeta {
  title?: string; // 路由页面标题
  menu?: string; // 菜单项文本，为空时取 title 值
  icon?: string | VNode; // 菜单项图标
  hideChildrenInMenu?: boolean; // 隐藏子菜单
  hideInMenu?: boolean; // 隐藏菜单
  hideInBreadcrumb?: boolean; // 隐藏面包屑
  authority?: string | string[]; // 菜单权限
  target?: '_self' | '_blank' | '_parent' | '_top'; // 点击新窗口打开
  disabled?: boolean;
  [key: string]: any;
}

// 路由菜单
export interface RouteRecordMenu extends Omit<_RouteRecordBase, 'children'> {
  component?: RouteComponent | (() => Promise<RouteComponent>);
  /** @name 子菜单 */
  children?: RouteRecordMenu[];
  meta?: RouteMenuMeta;
}

// 菜单主题
export type MenuTheme = 'light' | 'dark';

// 内容宽度
export type ContentWidth = 'Fluid' | 'Fixed';

// 布局设置
export type Settings = {
  logo?: string;
  /**
   * 网站标题
   */
  title?: string | false;
  /**
   * 布局模式 both 下右菜单模式
   */
  layout?: 'side' | 'top' | 'mix' | 'both';
  /**
   * 切割菜单，只在 mix 模式下生效
   */
  splitMenus?: boolean;
  /**
   * 固定头部
   */
  fixedHeader?: boolean;
  /**
   * 固定侧边栏
   */
  fixSiderbar?: boolean;
  /**
   * 头部主题，mix 模式下生效，其他模式使用 navTheme 作为主题
   */
  headerTheme?: MenuTheme;
  /**
   * 导航菜单主题
   */
  navTheme?: MenuTheme;
  /**
   * 头部高度
   *
   * - 顶部导航（大部分系统）：一级导航高度 64px，二级导航 48px。
   * - 顶部导航（展示类页面）：一级导航高度 80px，二级导航 56px。
   */
  headerHeight?: number;
  /**
   * 侧边栏宽度，通常为 208px
   */
  siderWidth?: number;
  /**
   * layout 为 top 时的内容宽度，Fluid 撑满窗口疮毒，Fixed 默认固定位 1200px
   */
  contentWidth?: ContentWidth;
  /**
   * 是否启用路由标签页
   */
  routerTabs?: Boolean;
  /**
 * 顶部路由是否显示图标
 */
  topTabsIcon: boolean,
  /**
   * iconfont 线上地址
   */
  iconScriptUrl: string
};

export type CustomRender = (props: LayoutContextProps) => VNode;

export interface RouterTabItem {
  key: string;
  route: RouteLocationNormalized;
}

export interface RouterTabs {
  /**
   * 当前选中的路由标签页
   */
  activeKey: string;
  /**
   * 路由标签页记录
   */
  tabs: RouterTabItem[];
}
/**
 * 顶部路由配置
 */
export interface TopTabs {
  icon?: string | VNode; // 菜单项图标
  key: string
  text: string
}

/**
 * 布局上下文
 */
export type LayoutContextProps = {
  settings: Settings;
  prefixCls: string;
  logo: string | VNode;
  collapsed: boolean;
  routes: RouteRecordMenu[];
  /**
   * 路由标签页状态
   */
  routerTabs: RouterTabs;
  selectedMenus: string[];
  openMenus: string[];
  hasFooter: boolean;
  hasFooterToolbar: boolean;
  topTabs?: TopTabs[],
  breadcrumbRender?: (
    routes: RouteRecordMenu[],
  ) => {
    path: string;
    breadcrumbName: string;
  }[];
  rightContentRender?: CustomRender | boolean;
  onCollapsedChange: (collapsed: boolean) => void;
  onTopTabsClick: (tabs: TopTabs) => void;
  onHasFooterToolbarChange?: (hasFooterToolbar: boolean) => void;
  onSelectedMenusChange: (key: string[]) => void;
  onOpenMenusChange: (key: string[]) => void;
  onMenuHeaderClick?(): void;
};
