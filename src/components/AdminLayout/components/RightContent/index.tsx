import { defineComponent } from 'vue';
import { useLayoutContext } from '../../Context';

export default defineComponent({
  name: 'RightContent',
  setup(props, { slots }) {
    const context = useLayoutContext();
    return () => {
      const baseClassName = `${context.prefixCls}-right-content`;
      return (
        <div
          class={[
            baseClassName,
            {
              [`${baseClassName}_dark`]:
                context.settings.navTheme === 'dark' &&
                context.settings.layout === 'top',
            },
          ]}
        >
          {slots.default?.()}
        </div>
      );
    };
  },
});
