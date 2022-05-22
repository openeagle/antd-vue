import { PropType, defineComponent, reactive, watch, watchEffect } from 'vue';
import { useRoute } from 'vue-router';
import { Layout, message } from 'ant-design-vue';
import {
  CustomRender,
  CustomTabItemRender,
  LayoutContextProps,
  RouteRecordMenu,
  Settings,
  TopTabs
} from '../../typings';
import defaultSettings from '../../defaultSettings';
import LayoutContext from '../../Context';
import getCustomRender from '../../utils/getCustomRender';
import Footer from '../Footer';
import FooterToolbar from '../FooterToolbar';
import GlobalHeader from '../GlobalHeader';
import PageContainer from '../PageContainer';
import PageLoading from '../PageLoading';
import RightContent from '../RightContent';
import SiderMenu from '../SiderMenu';
import TopNavHeader from '../TopNavHeader';
import TopTabsHeader from '../TopTabsHeader';

export interface AdminLayoutState {
  collapsed: boolean;
  selectedMenus: string[];
  // 顶部 tabs 激活 key
  activeTabsKey?: string;
  openMenus: string[];
  hasFooterToolbar: boolean;
}

export const AdminLayoutRenderType = {
  type: [Function, Boolean] as PropType<CustomRender | boolean>,
  default: false,
};

const AdminLayout = defineComponent({
  inheritAttrs: false,
  name: 'AdminLayout',
  props: {
    prefixCls: {
      type: String,
      default: 'ant-admin-layout',
    },
    logo: [String, Object] as PropType<LayoutContextProps['logo']>,
    // 设置
    settings: {
      type: Object as PropType<Settings>,
      default: defaultSettings,
    },
    // 菜单路由
    routes: {
      type: Array as PropType<RouteRecordMenu[]>,
      required: true,
    },
    topTabs: {
      type: Array as PropType<TopTabs[]>,
      default: () => []
    },
    // 控制菜单的收起和展开
    collapsed: {
      type: Boolean,
    },
    // 默认的菜单的收起和展开
    defaultCollapsed: {
      type: Boolean,
      default: false,
    },
    breadcrumbRender: (Function as unknown) as PropType<
      LayoutContextProps['breadcrumbRender']
    >,
    // 自定义头右部的 render 方法
    rightContentRender: AdminLayoutRenderType,
    // 自定义顶部 tabItem 内容
    tapItemContentRender: {
      type: [Function, Boolean] as PropType<CustomTabItemRender | boolean>,
      default: false,
    },
    // 自定义页脚
    footerRender: AdminLayoutRenderType,
    // 菜单的折叠收起事件
    onCollapse: Function as PropType<(collapsed: boolean) => void>,
    // 头部路由点击事件
    onTopTabsClick: Function as PropType<(tabs: TopTabs) => void>,
  },
  setup(props, { attrs, slots }) {
    const route = useRoute();
    const matchedPath = route.matched.map((item) => item.path);
    const activeTabsKey = props.settings.layout === 'both' ? matchedPath[0].replace('/', '') || props.topTabs[0].key : ''
    const state = reactive<AdminLayoutState>({
      collapsed:
        typeof props.collapsed === 'boolean'
          ? props.collapsed
          : props.defaultCollapsed,
      selectedMenus: matchedPath.slice(0),
      activeTabsKey,
      openMenus: props.settings.layout === 'side' ? matchedPath.slice(0) : [],
      hasFooterToolbar: false,
    });
    watch(
      () => props.collapsed,
      () => {
        state.collapsed = props.collapsed;
      },
    );
    const onCollapsedChange = (collapsed: boolean) => {
      state.collapsed = collapsed;
      state.openMenus = [];
      props.onCollapse?.(collapsed);
    };
    const onTopTabsClick = (tabs: TopTabs) => {
      props.onTopTabsClick?.(tabs);
    };
    const onHasFooterToolbarChange = (hasFooterToolbar: boolean) => {
      state.hasFooterToolbar = hasFooterToolbar;
    };
    const onSelectedMenusChange = (keys: string[]) => {
      state.selectedMenus = keys;
    };
    const onOpenMenusChange = (keys: string[]) => {
      state.openMenus = keys;
    };
    const context = reactive<Partial<LayoutContextProps>>({
      routerTabs: {
        activeKey: '',
        tabs: [],
      },
      onCollapsedChange,
      onTopTabsClick,
      onSelectedMenusChange,
      onOpenMenusChange,
      onHasFooterToolbarChange,
    });
    watchEffect(
      () => {
        Object.assign(context, {
          ...state,
          settings: props.settings,
          prefixCls: props.prefixCls,
          logo: props.logo,
          collapsed: state.collapsed,
          routes: props.routes,
          topTabs: props.topTabs,
          selectedMenus: state.selectedMenus,
          openMenus: state.openMenus,
          hasFooter: !!props.footerRender,
          hasFooterToolbar: state.hasFooterToolbar,
          breadcrumbRender: props.breadcrumbRender,
          tapItemContentRender: getCustomRender(
            props,
            slots,
            'tapItemContentRender',
          ),
          rightContentRender: getCustomRender(
            props,
            slots,
            'rightContentRender',
          ),
        });
      },
      {
        flush: 'pre',
      },
    );
    watch(
      () => route.path,
      () => {
        const matchedPath = route.matched.map((item) => item.path);
        if (props.settings.layout === 'both') {
          const activeTabsKey = matchedPath[0].replace('/', '') || props.topTabs[0].key
          state.selectedMenus = matchedPath.slice(1);
          state.activeTabsKey = activeTabsKey
          if (!state.collapsed) {
            state.openMenus = matchedPath.slice(1);
          }
        } else {
          state.selectedMenus = matchedPath.slice(0);
          if (props.settings.layout === 'side' && !state.collapsed) {
            state.openMenus = matchedPath.slice(0);
          }
        }

      },
    );
    return () => {
      const { class: attrClass, ...restAttrs } = attrs;
      const baseClassName = `${props.prefixCls}`;
      const children = slots.default?.();
      let footerDom = null;
      if (typeof props.footerRender === 'function') {
        footerDom = props.footerRender(context as LayoutContextProps);
      }
      let layout = null;
      if (props.settings.layout === 'side') {
        layout = (
          <Layout {...restAttrs} class={[baseClassName, attrClass]}>
            <SiderMenu>...</SiderMenu>
            <Layout>
              <GlobalHeader />
              <Layout.Content
                class={[
                  `${baseClassName}-content`,
                  {
                    [`${baseClassName}-has-header`]: true,
                    [`${baseClassName}-content-disable-margin`]: false,
                  },
                ]}
              >
                {children}
              </Layout.Content>
              {footerDom}
            </Layout>
          </Layout>
        );
      } else if (props.settings.layout === 'top') {
        layout = (
          <Layout {...restAttrs} class={[baseClassName, attrClass]}>
            <TopNavHeader />
            <Layout.Content
              class={[
                `${baseClassName}-content`,
                {
                  [`${baseClassName}-has-header`]: true,
                  [`${baseClassName}-content-disable-margin`]: false,
                },
              ]}
            >
              {children}
            </Layout.Content>
            {footerDom}
          </Layout>
        );
      } else if (props.settings.layout === 'both') {
        const hasTopTabs = Array.isArray(props.topTabs) && props.topTabs.length > 0
        if (!hasTopTabs) {
          message.error('layout 为 both 模式时，需要配置 topTabs 值')
        }
        layout = (
          <Layout {...restAttrs} class={[baseClassName, attrClass]}>
            <SiderMenu>...</SiderMenu>
            <Layout>
              {hasTopTabs && <TopTabsHeader />}
              <Layout.Content
                class={[
                  `${baseClassName}-content`,
                  {
                    [`${baseClassName}-has-header`]: true,
                    [`${baseClassName}-content-disable-margin`]: false,
                  },
                ]}
              >
                {children}
              </Layout.Content>
            </Layout>
            {footerDom}
          </Layout>
        )
      }
      return (
        <LayoutContext value={context as LayoutContextProps}>
          {layout}
        </LayoutContext>
      );
    };
  },
});

AdminLayout.defaultSettings = defaultSettings;
AdminLayout.Footer = Footer;
AdminLayout.FooterToolbar = FooterToolbar;
AdminLayout.PageContainer = PageContainer;
AdminLayout.PageLoading = PageLoading;
AdminLayout.RightContent = RightContent;

export default AdminLayout as typeof AdminLayout & {
  readonly defaultSettings: typeof defaultSettings;
  readonly Footer: typeof Footer;
  readonly FooterToolbar: typeof FooterToolbar;
  readonly PageContainer: typeof PageContainer;
  readonly PageLoading: typeof PageLoading;
  readonly RightContent: typeof RightContent;
};
