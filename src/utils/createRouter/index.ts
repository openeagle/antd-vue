import {
  AsyncComponentLoader,
  AsyncComponentOptions,
  defineAsyncComponent,
  h,
} from 'vue';
import { createRouter as vueCreateRouter, RouterOptions } from 'vue-router';
import { RouteRecordMenu } from '../../components/AdminLayout';
import PageLoading from '../../components/AdminLayout/components/PageLoading';
import PageResult from '../../components/AdminLayout/components/PageResult';

/**
 *
 * @param routerOptions vue createRouter 的参数
 * @param asyncComponentOptions 异步组件配置参数
 * @returns
 */

export default function createRouter(
  routerOptions: RouterOptions,
  {
    loadingComponent = PageLoading,
    errorComponent = PageResult,
    delay = 200,
    timeout = 10000,
    suspensible = false,
    onError,
  }: Omit<AsyncComponentOptions, 'loader'> = {},
) {
  const treedRoutes = (childrenRoutes: RouteRecordMenu[]) => {
    return childrenRoutes.map((childrenRoute: RouteRecordMenu) => {
      if (childrenRoute.children) {
        childrenRoute.children = treedRoutes(childrenRoute.children);
      } else if (typeof childrenRoute.component === 'function') {
        const failure = {};
        childrenRoute.component = defineAsyncComponent({
          loader: childrenRoute.component as AsyncComponentLoader,
          loadingComponent,
          errorComponent: () => h(errorComponent as any, { failure }),
          delay,
          timeout,
          suspensible,
          onError: (error, retry, fail, attempts) => {
            Object.assign(failure, {
              error,
              retry,
              fail,
              attempts,
            });
            if (onError) {
              onError(error, retry, fail, attempts);
            }
          },
        });
      }
      return childrenRoute;
    });
  };
  treedRoutes(routerOptions.routes);
  return vueCreateRouter(routerOptions);
}
