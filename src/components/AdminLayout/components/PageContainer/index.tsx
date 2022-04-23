import { PropType, VNode, defineComponent, computed } from 'vue';
import { PageHeader } from 'ant-design-vue';
import { Route } from 'ant-design-vue/es/breadcrumb/Breadcrumb';
import Loader, { LoaderPropsType } from '../../../Loader';
import { useLayoutContext } from '../../Context';
import GridContent from '../GridContent';
import { useRoute } from 'vue-router';

export interface HeaderProps {
  title?: string;
  subTitle?: string;
  ghost?: boolean;
  avatar?: any;
  backIcon?: any;
  tags?: any;
  extra?: any;
  breadcrumb?: any;
  footer?: any;
}

export default defineComponent({
  name: 'PageContainer',
  props: {
    ghost: {
      type: Boolean,
      default: true,
    },
    // true 表示只渲染面包屑，false 表示不渲染头部，string 表示渲染面包屑且显示对应字符串的标题，对象用于配置更加复杂的头部
    header: {
      type: [String, Boolean, Object] as PropType<
        string | boolean | HeaderProps
      >,
      default: true,
    },
    loader: Object as PropType<LoaderPropsType>,
  },
  setup(props, { slots }) {
    const route = useRoute();
    const context = useLayoutContext();
    const breadcrumbRoutes = computed(() => {
      const matchedRoutes = route.matched.filter(
        (item) => item.meta?.hideInBreadcrumb !== true,
      );
      return context.breadcrumbRender
        ? context.breadcrumbRender(matchedRoutes)
        : matchedRoutes.map((item) => {
            return {
              path: item.path,
              breadcrumbName: item.meta?.title || item.name,
            };
          });
    });
    return () => {
      const { loader, ghost, header } = props;
      const baseClassName = `${context.prefixCls}-page-container`;
      let headerElement = null;
      if (header) {
        let title = null;
        if (typeof header === 'string') {
          title = header;
        } else if (typeof header === 'object') {
          title = header.title;
        }
        headerElement = (
          <div class={`${baseClassName}-warp`}>
            <PageHeader
              {...(typeof header === 'object' ? header : {})}
              ghost={ghost}
              breadcrumb={{
                routes: breadcrumbRoutes.value,
                itemRender: ({ route }: { route: Route }) => {
                  return (
                    <router-link to={route.path}>
                      {route.breadcrumbName}
                    </router-link>
                  );
                },
                ...(header as any)?.breadcrumb,
              }}
              title={title}
            />
          </div>
        );
      }
      let content: VNode = (
        <>
          <div class={`${baseClassName}-children-content`}>
            {slots.default?.()}
          </div>
          {context.hasFooterToolbar ? (
            <div
              style={{
                height: '48px',
              }}
            />
          ) : null}
        </>
      ) as VNode;
      if (loader) {
        content = (<Loader {...loader}>{content}</Loader>) as VNode;
      }
      return (
        <div
          class={[
            baseClassName,
            {
              [`${baseClassName}-ghost`]: ghost,
            },
          ]}
        >
          <GridContent>
            {headerElement}
            {content}
          </GridContent>
        </div>
      );
    };
  },
});
