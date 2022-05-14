/**
 * 根据 setting 的 fixedHeader 和 headerHeight 设置头部样式，如果是 side layout 且固定顶部的话，那么需要根据侧边栏是否折叠设置左侧距离。
 */
import { PropType, VNode, defineComponent } from 'vue';
import { Layout } from 'ant-design-vue';
import { useLayoutContext } from '../../Context';

export default defineComponent({
  inheritAttrs: false,
  name: 'Header',
  props: {
    extra: Object as PropType<VNode>,
    prefixCls: String,
  },
  setup(props, { attrs, slots }) {
    const context = useLayoutContext();
    return () => {
      const { class: attrClass, style } = attrs as any;
      const {
        settings: { layout, fixedHeader, headerHeight, siderWidth },
        collapsed,
      } = context;
      const baseClassName = `${context.prefixCls}-header`;
      const needFixedHeader = fixedHeader || layout === 'mix';
      const needSettingWidth = needFixedHeader && (layout === 'side' || layout === 'both');
      const width = needSettingWidth
        ? `calc(100% - ${collapsed ? 48 : siderWidth}px)`
        : '100%';
      const right = needFixedHeader ? 0 : undefined;
      return (
        <>
          {needFixedHeader && (
            <Layout.Header
              style={{
                height: `${headerHeight}px`,
                lineHeight: `${headerHeight}px`,
                background: 'transparent',
              }}
            />
          )}
          <Layout.Header
            class={[
              baseClassName,
              {
                [`${baseClassName}-fixed`]: needFixedHeader,
              },
              attrClass,
            ]}
            style={{
              padding: 0,
              height: `${headerHeight}px`,
              lineHeight: `${headerHeight}px`,
              zIndex: layout === 'mix' ? 100 : 19,
              width,
              right,
              ...style,
            }}
          >
            {slots.default?.()}
          </Layout.Header>
        </>
      );
    };
  },
});
