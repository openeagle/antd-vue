import { UnwrapRef, defineComponent, onBeforeUnmount, onMounted } from 'vue';
import { Tabs } from 'ant-design-vue';
import {
  RouteLocationNormalized,
  isNavigationFailure,
  useRouter,
  useRoute,
} from 'vue-router';
import { RouterTabs } from '../../typings';
import { useLayoutContext } from '../../Context';

export interface TabItem {
  key: string;
  route: RouteLocationNormalized;
}

const defaultTabKey = '0';

export default defineComponent({
  setup() {
    const context = useLayoutContext();
    const router = useRouter();
    const route = useRoute();

    let lastTabKey: string = defaultTabKey;
    const state: UnwrapRef<RouterTabs> = context.routerTabs;
    onMounted(() => {
      // TODO: 优化初始化逻辑，组件结构调整容易导致重新初始化而丢失状态，应该将状态管理逻辑放在 AdminLayout 那层处理
      const currentTabKey = window.history.state.tabKey || defaultTabKey;
      state.activeKey = currentTabKey;
      state.tabs = [
        {
          key: currentTabKey,
          route: router.currentRoute.value,
        },
      ];
      lastTabKey = currentTabKey;
    });

    const handleTabChange = (key: string) => {
      const matchedTab: any = state.tabs.find((item) => item.key === key);
      if (matchedTab) {
        router.push({
          ...matchedTab.route,
          state: {
            tabKey: matchedTab.key,
          },
        });
      }
    };
    const handleTabEdit = (key: any, action: 'add' | 'remove') => {
      if (action === 'remove') {
        const matchIndex = state.tabs.findIndex((item) => item.key === key);
        if (matchIndex >= 0) {
          router.back();
          state.tabs.splice(matchIndex, 1);
        }
      }
    };

    const removeBeforeEachRegister = router.beforeEach(() => {
      lastTabKey = window.history.state.tabKey || defaultTabKey;
    });
    const removeAfterEachRegister = router.afterEach((to, from, failure) => {
      if (!isNavigationFailure(failure)) {
        const currentTabKey = window.history.state.tabKey;
        if (currentTabKey) {
          const matchedTab: any = state.tabs.find(
            (item) => item.key === currentTabKey,
          );
          if (!matchedTab) {
            state.tabs.push({
              key: currentTabKey,
              route: to,
            });
          } else {
            matchedTab.route = to;
          }
          state.activeKey = currentTabKey;
        } else {
          const matchedTab: any = state.tabs.find(
            (item) => item.key === lastTabKey,
          );
          if (matchedTab) {
            matchedTab.route = to;
            state.activeKey = lastTabKey;
            window.history.replaceState(
              Object.assign(history.state, {
                tabKey: lastTabKey,
              }),
              document.title,
              route.fullPath,
            );
          }
        }
      }
    });
    onBeforeUnmount(() => {
      removeBeforeEachRegister();
      removeAfterEachRegister();
    });

    return () => {
      return state.tabs.length > 0 ? (
        <Tabs
          v-model={[state.activeKey, 'activeKey']}
          type="editable-card"
          size="small"
          animated={false}
          hideAdd={true}
          tabBarGutter={0}
          onChange={handleTabChange}
          onEdit={handleTabEdit}
        >
          {state.tabs.map((item) => {
            return (
              <Tabs.TabPane key={item.key} tab={item.route.meta.title || ''} />
            );
          })}
        </Tabs>
      ) : null;
    };
  },
});
