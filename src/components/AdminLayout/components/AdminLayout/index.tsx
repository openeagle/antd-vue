import { PropType, defineComponent, reactive, watch, watchEffect } from 'vue';
import { useRoute } from 'vue-router';
import { Layout } from 'ant-design-vue';
import {
  CustomRender,
  LayoutContextProps,
  RouteRecordMenu,
  Settings,
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

export interface AdminLayoutState {
  collapsed: boolean;
  selectedMenus: string[];
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
    // 自定义页脚
    footerRender: AdminLayoutRenderType,
    // 菜单的折叠收起事件
    onCollapse: Function as PropType<(collapsed: boolean) => void>,
  },
  setup(props, { attrs, slots }) {
    const route = useRoute();
    const matchedPath = route.matched.map((item) => item.path);
    const state = reactive<AdminLayoutState>({
      collapsed:
        typeof props.collapsed === 'boolean'
          ? props.collapsed
          : props.defaultCollapsed,
      selectedMenus: matchedPath.slice(0),
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
          selectedMenus: state.selectedMenus,
          openMenus: state.openMenus,
          hasFooter: !!props.footerRender,
          hasFooterToolbar: state.hasFooterToolbar,
          breadcrumbRender: props.breadcrumbRender,
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
        state.selectedMenus = matchedPath.slice(0);
        if (props.settings.layout === 'side' && !state.collapsed) {
          state.openMenus = matchedPath.slice(0);
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
