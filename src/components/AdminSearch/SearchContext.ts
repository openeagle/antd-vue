import { InjectionKey, PropType, defineComponent, inject, provide } from 'vue';
import { SearchContextProps } from './typings';

const routeContextInjectKey: InjectionKey<SearchContextProps> = Symbol();

export const useSearchContext = (): SearchContextProps | undefined => {
  return inject(routeContextInjectKey);
};

export default defineComponent({
  name: 'AdminSearchContext',
  props: {
    value: {
      type: Object as PropType<SearchContextProps>,
      required: true,
    },
  },
  setup(props, { slots }) {
    provide(routeContextInjectKey, props.value);
    return () => slots.default?.();
  },
});
