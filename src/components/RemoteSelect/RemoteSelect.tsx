import {
  PropType,
  VNode,
  defineComponent,
  reactive,
  onMounted,
  onUnmounted,
  watch,
} from 'vue';
import { Button, Result, Select, Spin } from 'ant-design-vue';
import { SelectProps } from 'ant-design-vue/es/select/index';

/**
 * 字段映射
 */
export interface FieldNames {
  label: string | ((item: any) => VNode); // 选项显示值
  title?: string | ((item: any) => string); // 标题显示值
  value: string; // 选项值
  disabled?: string | ((item: any) => boolean); // 是否禁用
}

/**
 * 选择项数据类型
 */
export interface SelectOption {
  label: string | VNode;
  title?: string;
  value: string | number;
  disabled?: boolean;
  source: any;
}

function transformData(fieldNames: FieldNames, data: any[]): SelectOption[] {
  const { label, title, value, disabled } = fieldNames;
  const labelIsFunction = typeof label === 'function';
  return data.map((item) => {
    let option: SelectOption = {
      source: item,
      label: labelIsFunction
        ? (label as Function)(item)
        : item[label as string],
      value: item[value],
    };
    if (title) {
      if (typeof title === 'function') {
        option.title = title(item);
      } else {
        option.title = item[title];
      }
    }
    if (disabled !== undefined) {
      if (typeof disabled === 'function') {
        option.disabled = disabled(item);
      } else {
        option.disabled = item[disabled as string];
      }
    }
    return option;
  });
}

const caches = new Map<any, Promise<any[]>>();

export default defineComponent({
  name: 'OpeneagleRemoteSelect',
  props: {
    ...SelectProps(),
    /**
     * 是否启用缓存
     */
    cacheable: Boolean as PropType<boolean>,
    /**
     * 远程数据源
     */
    dataSource: {
      type: Function as PropType<() => Promise<any[]>>,
      required: true,
    },
    extras: Array as PropType<any[]>,
    /**
     * 选项字段映射
     */
    fieldNames: {
      type: Object as PropType<FieldNames>,
      default: {
        label: 'label',
        value: 'value',
      },
    },
    optionFilterProp: {
      type: String,
      default: 'label',
    },
    /**
     * 当前选中的值
     */
    value: [String, Number, Array] as PropType<
      string | string[] | number | number[]
    >,
  },
  emits: ['update:value'],
  setup(props, { emit }) {
    const state = reactive<{
      data: SelectOption[];
      error?: Error;
      loading: boolean;
    }>({
      data: [],
      loading: false,
    });

    let mounted = false;

    const loadDataSource = () => {
      const { cacheable } = props;
      const cache = caches.get(props.dataSource);
      let dataPromise: Promise<SelectOption[]>;
      if (cacheable && cache) {
        dataPromise = cache;
      } else {
        dataPromise = props.dataSource().catch((error) => {
          if (cacheable) {
            caches.delete(props.dataSource);
          }
          throw error;
        });
        if (cacheable) {
          caches.set(props.dataSource, dataPromise);
        }
      }
      state.loading = true;
      dataPromise
        .then((data) => {
          return transformData(
            props.fieldNames,
            (props.extras || []).concat(data),
          );
        })
        .then((options) => {
          if (mounted) {
            state.data = options;
            state.error = undefined;
            state.loading = false;
          }
        })
        .catch((error) => {
          if (mounted) {
            state.error = error;
            state.loading = false;
          }
        });
    };

    onMounted(() => {
      mounted = true;
      loadDataSource();
    });
    onUnmounted(() => {
      mounted = false;
    });

    watch(
      () => props.dataSource,
      () => {
        loadDataSource();
      },
    );

    const handleChange = (...args: any) => {
      emit('update:value', args[0]);
      props.onChange?.(...args);
    };

    const handleDropdownVisibleChange = (visible: boolean) => {
      const { onDropdownVisibleChange } = props;
      if (typeof onDropdownVisibleChange === 'function') {
        onDropdownVisibleChange(visible);
      }
      if (visible && state.error) {
        loadDataSource();
      }
    };

    return () => {
      const { data, error, loading } = state;

      let notFoundContent;
      let placeholder = props.placeholder;
      if (loading) {
        notFoundContent = <Spin size="small" />;
        placeholder = '加载中...';
      } else if (error) {
        notFoundContent = (
          <Result
            status="error"
            title="加载失败"
            extra={<Button onClick={loadDataSource}>重新加载</Button>}
          />
        );
        placeholder = '加载失败了~';
      }

      return (
        <Select
          {...props}
          loading={loading}
          notFoundContent={notFoundContent}
          options={data}
          placeholder={placeholder}
          value={(data.length > 0 ? props.value : undefined) as any}
          onChange={handleChange}
          onDropdownVisibleChange={handleDropdownVisibleChange}
        />
      );
    };
  },
});
