import { debounce } from 'lodash-es';
import { reactive, onBeforeUnmount, onMounted, watch, ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import {
  SearchTableOption,
  SearchTableInstance,
  SearchTableQuery,
} from '../typings';

export default function useTable<T = any>(
  options: SearchTableOption<T>,
): SearchTableInstance<T> {
  const {
    name = 'table',
    form = false,
    params,
    syncSearch = false,
    restoration = true,
    pagination = true,
    request,
    columns,
    selection,
  } = options;

  const route = useRoute();
  const router = useRouter();

  /**
   * 表单标识
   */
  const TABLE_ID = btoa(name);

  /**
   * 获取默认状态
   * @returns
   */
  const getDefaultState = (): SearchTableInstance<T>['state'] => ({
    data: [],
    loading: false,
    selected:
      (selection && (typeof selection === 'boolean' ? [] : selection)) ||
      undefined,
    sorter: columns.reduce(
      (
        rcc: undefined | { key: string; order: 'ascend' | 'descend' | false },
        column,
      ) => {
        if (!rcc && column.sorter && column.defaultSortOrder) {
          return {
            key: column.key,
            order: column.defaultSortOrder,
          };
        }
        return rcc;
      },
      undefined,
    ),
    current:
      (pagination &&
        (typeof pagination === 'object' ? pagination.current : 1)) ||
      1,
    pageSize:
      (pagination &&
        (typeof pagination === 'object' ? pagination.pageSize : 10)) ||
      0,
    total: 0,
  });

  /**
   * 结合路由获取最新状态
   * @returns
   */
  const getLatestState = (): SearchTableInstance<T>['state'] => {
    let tableQuery: undefined | SearchTableQuery;
    if (route.query[name]) {
      try {
        tableQuery = JSON.parse(route.query[name] as string);
      } catch {
        // ignore
      }
    }
    const defaultState = getDefaultState();
    return {
      ...defaultState,
      sorter: tableQuery ? tableQuery.sorter : defaultState.sorter,
      current:
        (tableQuery && tableQuery.current && Number(tableQuery.current)) ??
        defaultState.current,
      pageSize:
        (tableQuery && tableQuery.pageSize && Number(tableQuery.pageSize)) ??
        defaultState.pageSize,
    };
  };

  const defaultTableId = Date.now().toString();
  const tableId = ref<string>(String(route.query[TABLE_ID]) ?? defaultTableId);
  const state: SearchTableInstance<T>['state'] = reactive<any>(
    getLatestState(),
  );

  /**
   * 获取表单参数
   * @returns
   */
  const getFormParams = () => {
    let formPararms;
    if (form) {
      if (Array.isArray(form)) {
        formPararms = form.reduce((rcc: any, item) => {
          if (syncSearch) {
            // 表格搜索条件跟着表格条件实时变化
            rcc[item.name] = item.state;
          } else {
            // 表格搜索条件跟搜索状态
            rcc[item.name] = item.searchState;
          }
          return rcc;
        }, {});
      } else {
        if (syncSearch) {
          // 表格搜索条件跟着表格条件实时变化
          formPararms = form.state;
        } else {
          // 表格搜索条件跟搜索状态
          formPararms = form.searchState;
        }
      }
    }
    return formPararms;
  };

  /**
   * 加载数据
   */
  const load = debounce(() => {
    state.loading = true;
    request({
      params,
      form: getFormParams(),
      pagination:
        pagination !== false
          ? {
              current: state.current,
              pageSize: state.pageSize,
            }
          : undefined,
      sorter: state.sorter?.order ? state.sorter : undefined,
    })
      .then(({ data, total }) => {
        if (state.selected) {
          state.selected = [];
        }
        state.data = data;
        state.total = total;
      })
      .finally(() => {
        state.loading = false;
      });
  }, 100); // 设置 100 ms 的防抖，防止因为外部事件触发多次调用 load 问题（表单路由参数、表格参数和表格路由参数变化触发）

  /**
   * 同步表格路由参数
   */
  const syncRoute = () => {
    if (!restoration) return;
    // 只有路由查询参数不同步时才需要更新
    if (route.query[TABLE_ID] !== tableId.value) {
      const query = {
        ...route.query,
        [name]: JSON.stringify({
          current: state.current,
          pageSize: state.pageSize,
          sorter: state.sorter ? state.sorter : undefined,
        }),
        [TABLE_ID]: tableId.value,
      } as any;
      router.replace({
        path: route.path,
        query: Object.keys(query).reduce((rcc: any, key) => {
          if (query[key] !== undefined) {
            rcc[key] = query[key];
          }
          return rcc;
        }, {}),
      });
    }
  };

  /**
   * 同步状态
   */
  const syncState = () => {
    const latestState = getLatestState();
    Object.assign(state, {
      current: latestState.current,
      pageSize: latestState.pageSize,
      sorter: latestState.sorter,
    });
    tableId.value = String(route.query[TABLE_ID] || defaultTableId);
    load();
  };

  /**
   * 修改表格参数
   * @param params
   */
  const change = (params: SearchTableQuery) => {
    Object.assign(state, params);
    load();
    setTimeout(() => {
      tableId.value = String(Date.now());
      syncRoute();
    }, 0); // 延迟下，等请求发送出去后再同步路由
  };

  /**
   * 表单初始化
   */
  const handleInitiate = () => {
    // 只需要触发重新加载数据就好了，表格路由参数的同步交给 syncState 处理
    load();
  };

  /**
   * 表单提交时重置分页
   */
  const handleFormSubmit = () => {
    change({ current: 1 });
  };

  /**
   *
   * 表单重置时重置分页
   */
  const handleFormReset = () => {
    if (options.manualRequest) {
      Object.assign(state, { data: [], loading: false, current: 1, total: 0 });
      tableId.value = String(Date.now());
      syncRoute();
    } else {
      change({ current: 1 });
    }
  };

  /**
   * 表格参数变化时，重新请求数据
   */
  watch(
    () => options.params,
    () => {
      load();
    },
    { deep: true },
  );

  /**
   * 路由参数变化，且路由参数和状态不一致时才需要更新状态
   * - 表单更新路由参数触发
   * - 表格更新路由参数触发
   * - 页面跳转触发
   */
  const removeAfterEachRegister = router.afterEach((to) => {
    if (to.query[TABLE_ID] !== tableId.value) {
      // 只有 ID 参数变化时才触发
      syncState();
    }
  });

  onMounted(() => {
    if (!options.manualRequest) {
      setTimeout(load, 0);
    }
    if (form) {
      if (Array.isArray(form)) {
        form.forEach((item) => {
          item.onInitiate(handleInitiate);
          item.onSubmit(handleFormSubmit);
          item.onReset(handleFormReset);
        });
      } else {
        form.onInitiate(handleInitiate);
        form.onSubmit(handleFormSubmit);
        form.onReset(handleFormReset);
      }
    }
  });

  onBeforeUnmount(() => {
    removeAfterEachRegister();
  });

  return {
    columns,
    state,
    load,
    change,
  };
}
