import { defineComponent, reactive } from 'vue';
import {
  RouterView,
  onBeforeRouteUpdate,
  useRoute,
  useRouter,
} from 'vue-router';
import { Button, Input } from 'ant-design-vue';
import {
  ArrowLeftOutlined,
  ArrowRightOutlined,
  SyncOutlined,
} from '@ant-design/icons-vue';
import classes from './Simulator.module.less';

export default defineComponent({
  setup() {
    const route = useRoute();
    const router = useRouter();
    const state = reactive({
      url: route.fullPath,
    });
    const handleKeyPress = (event: KeyboardEvent) => {
      if (event?.code === 'Enter') {
        router.push(state.url);
      }
    };
    const handleGoBack = () => {
      router.back();
    };
    const handleGoForward = () => {
      router.forward();
    };
    const handleRefresh = () => {
      router.replace(route.fullPath);
    };
    onBeforeRouteUpdate((to, from) => {
      state.url = to.fullPath;
    });
    return () => {
      return (
        <div>
          <div class={classes.toolbar}>
            <Button
              class={classes.button}
              shape="circle"
              onClick={handleGoBack}
            >
              <ArrowLeftOutlined />
            </Button>
            <Button
              class={classes.button}
              shape="circle"
              onClick={handleGoForward}
            >
              <ArrowRightOutlined />
            </Button>
            <Button
              class={classes.button}
              shape="circle"
              onClick={handleRefresh}
            >
              <SyncOutlined />
            </Button>
            <Input
              class={classes.address}
              type="url"
              v-model={[state.url, 'value']}
              onKeypress={handleKeyPress}
            />
          </div>
          <RouterView />
        </div>
      );
    };
  },
});
