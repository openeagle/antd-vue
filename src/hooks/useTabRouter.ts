import { NavigationFailure, RouteLocationRaw, useRouter } from 'vue-router';

function guid() {
  return Number(
    Math.random()
      .toString()
      .substr(3, 3) + Date.now(),
  ).toString(36);
}

export default function useTabRouter() {
  const router = useRouter();
  return {
    /**
     *
     * 打开新标签页
     *
     * @param to - Route location to navigate to
     * @returns
     */
    open(to: RouteLocationRaw): Promise<NavigationFailure | void | undefined> {
      return router.push({
        ...(typeof to === 'string' ? { path: to } : to),
        state: {
          ...(typeof to === 'object' && to && to.state),
          tabKey: guid(),
        },
      });
    },
  };
}
