import { defineComponent } from 'vue';
import { useLayoutContext } from '../../Context';
import Header from '../Header';
import RouterTabs from '../RouterTabs';

export default defineComponent({
  name: 'GlobalHeader',
  inheritAttrs: false,
  setup(props, { attrs }) {
    const context = useLayoutContext();

    return () => {
      const { class: attrClass, style, ...restAttrs } = attrs as any;
      const { prefixCls, rightContentRender } = context;
      const baseClassName = `${prefixCls}-global-header`;
      const leftClassName = `${prefixCls}-global-header-left`;
      const rightClassName = `${prefixCls}-global-header-right`;
      return (
        <Header>
          <div {...restAttrs} class={[baseClassName, attrClass]} style={style}>
            <div class={[leftClassName]}>
              {context.settings.routerTabs && <RouterTabs />}
            </div>
            <div class={[rightClassName]}>
              {typeof rightContentRender === 'function'
                ? rightContentRender(context)
                : null}
            </div>
          </div>
        </Header>
      );
    };
  },
});
