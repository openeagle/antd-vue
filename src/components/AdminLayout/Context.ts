import { InjectionKey, PropType, defineComponent, inject, provide } from 'vue';
import { LayoutContextProps } from './typings';

const routeContextInjectKey: InjectionKey<LayoutContextProps> = Symbol();

export const useLayoutContext = (): LayoutContextProps => {
  return inject(routeContextInjectKey) as LayoutContextProps;
};

export default defineComponent({
  name: 'LayoutContext',
  props: {
    value: {
      type: Object as PropType<LayoutContextProps>,
      required: true,
    },
  },
  setup(props, { slots }) {
    provide(routeContextInjectKey, props.value);
    return () => slots.default?.();
  },
});
