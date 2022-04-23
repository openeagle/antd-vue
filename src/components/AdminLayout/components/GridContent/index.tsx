import { defineComponent } from 'vue';
import { useLayoutContext } from '../../Context';

export default defineComponent({
  name: 'GridContent',
  setup(props, { slots }) {
    const context = useLayoutContext();
    return () => {
      const baseClassName = `${context.prefixCls}-grid-content`;
      return (
        <div
          class={[
            baseClassName,
            {
              wide:
                context.settings.layout === 'top' &&
                context.settings.contentWidth === 'Fixed',
            },
          ]}
        >
          {slots.default?.()}
        </div>
      );
    };
  },
});
