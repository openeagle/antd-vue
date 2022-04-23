import { UnwrapRef, onBeforeUnmount, reactive, watch } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { SearchParam } from '../typings';

const SERIALIZATION = {
  number: {
    parse(str?: string) {
      const value = Number(str);
      return Number.isNaN(value) ? undefined : value;
    },
    stringify(value?: number) {
      const numberValue = Number(value);
      if (Number.isNaN(numberValue)) {
        return undefined;
      }
      return String(numberValue);
    },
  },
  string: {
    parse(str?: string) {
      return str;
    },
    stringify(value?: string) {
      return value;
    },
  },
  boolean: {
    parse(str?: string) {
      return str ? str === 'true' : undefined;
    },
    stringify(value?: boolean) {
      return typeof value === 'boolean' ? String(value) : undefined;
    },
  },
  object: {
    parse(str?: string) {
      if (!str) {
        return undefined;
      }
      try {
        const value = JSON.parse(decodeURIComponent(str));
        return value;
      } catch (error) {
        return undefined;
      }
    },
    stringify(value?: boolean) {
      return value ? encodeURIComponent(JSON.stringify(value)) : undefined;
    },
  },
  array: {
    parse(str?: string) {
      if (!str) {
        return undefined;
      }
      try {
        const value = JSON.parse(decodeURIComponent(str));
        return value;
      } catch (error) {
        return undefined;
      }
    },
    stringify(value?: boolean) {
      return value ? encodeURIComponent(JSON.stringify(value)) : undefined;
    },
  },
  date: {
    parse(str?: string) {
      const timestamp = Number(str);
      return Number.isNaN(timestamp) ? undefined : new Date(timestamp);
    },
    stringify(value?: Date) {
      return value ? value.getTime() : undefined;
    },
  },
};

/**
 * 实现参数和路由的双向绑定
 */
export default function useParams<T extends object = any>(
  params: SearchParam[],
): UnwrapRef<T> {
  const router = useRouter();
  const route = useRoute();

  const getLatestState = (initiation = true) => {
    return params.reduce((rcc: any, param) => {
      const { name, type = 'string' } = param;
      const serialization = param.serialization || SERIALIZATION[type];
      const query: string | null = route.query[name] as any;
      const queryValue = serialization.parse(
        query === null ? undefined : query,
      );
      if (queryValue !== undefined) {
        rcc[name] = queryValue;
      } else if (initiation) {
        rcc[name] =
          typeof param.initialValue === 'function'
            ? param.initialValue()
            : param.initialValue;
      }
      return rcc;
    }, {});
  };

  const state: UnwrapRef<T> = reactive(getLatestState());

  const getParamsQuery = () => {
    return params.reduce((rcc: any, param) => {
      const { name, type = 'string' } = param;
      const serialization = param.serialization || SERIALIZATION[type];
      rcc[name] = serialization.stringify((state as any)[name]);
      return rcc;
    }, {});
  };

  /**
   * 路由参数变化，且路由参数和状态不一致时才需要更新状态
   */
  const removeAfterEachRegister = router.afterEach((to) => {
    const nextQuery = params
      .map(({ name }) => {
        const value = to.query[name];
        if (value !== undefined && value !== null) {
          return `${name}=${value}`;
        }
        return '';
      })
      .filter((item) => item !== '')
      .join('&');

    const paramsQuery = getParamsQuery();
    const stateKey = params
      .map(({ name }) => {
        const value = paramsQuery[name];
        if (value !== undefined && value !== null) {
          return `${name}=${paramsQuery[name]}`;
        }
        return '';
      })
      .filter((item) => item !== '')
      .join('&');

    if (stateKey !== nextQuery) {
      Object.assign(state, getLatestState(!nextQuery));
    }
  });

  /**
   * 监听状态变化，并同步更新路由参数
   */
  watch(
    state,
    () => {
      const query = {
        ...route.query,
        ...getParamsQuery(),
      };
      router.replace({
        path: route.path,
        query: Object.keys(query).reduce((rcc: any, key) => {
          if (query[key] !== undefined) {
            rcc[key] = query[key];
          }
          return rcc;
        }, {}),
      });
    },
    { deep: true },
  );

  onBeforeUnmount(() => {
    removeAfterEachRegister();
  });

  return state;
}
