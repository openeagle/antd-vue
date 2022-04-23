import { createApp, defineComponent, InjectionKey } from 'vue';
import {
  createMemoryHistory,
  createRouter,
  RouterView,
  useRoute,
  useRouter,
} from 'vue-router';
import Simulator from './Simulator';

function withVueApp(VueComponent: any) {
  const key: InjectionKey<any> = Symbol();
  const VueComponentWithApp: {
    [key: string]: any;
  } = {
    mounted() {
      const dom = (this as any).$refs.dom;
      const router = createRouter({
        history: createMemoryHistory(),
        routes: [
          {
            path: '/',
            component: Simulator,
            children: [
              {
                path: '/',
                component: VueComponent,
              },
            ],
          },
        ],
      });
      const app = createApp(RouterView);
      app.use(router, key).mount(dom);
      this.app = app;
    },
    destroyed() {
      if (this.app) {
        this.app.unmount();
      }
    },
    render() {
      return <div ref="dom" />;
    },
  };
  return VueComponentWithApp;
}

export default withVueApp;
