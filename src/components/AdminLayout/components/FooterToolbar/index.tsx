import {
  PropType,
  VNode,
  defineComponent,
  inject,
  onMounted,
  onUnmounted,
} from 'vue';
import { useLayoutContext } from '../../Context';

export default defineComponent({
  name: 'FooterToolbar',
  props: {
    extra: [String, Object] as PropType<string | VNode>,
    prefixCls: String,
  },
  setup(props, { slots }) {
    const context = useLayoutContext();
    onMounted(() => {
      if (context.onHasFooterToolbarChange) {
        context.onHasFooterToolbarChange(true);
      }
    });
    onUnmounted(() => {
      if (context.onHasFooterToolbarChange) {
        context.onHasFooterToolbarChange(false);
      }
    });
    return () => {
      const {
        settings: { layout, siderWidth },
        collapsed,
        prefixCls,
      } = context;
      const baseClassName = `${prefixCls}-footer-bar`;
      const width =
        layout === 'side'
          ? `calc(100% - ${collapsed ? 48 : siderWidth}px)`
          : undefined;
      return (
        <div class={baseClassName} style={{ width }}>
          <div class={`${baseClassName}-left`}>
            {props.extra || slots.extra?.()}
          </div>
          <div class={`${baseClassName}-right`}>{slots.default?.()}</div>
        </div>
      );
    };
  },
});
