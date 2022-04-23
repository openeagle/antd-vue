import {
  PropType,
  VNode,
  defineComponent,
  reactive,
  onMounted,
  onUnmounted,
  computed,
} from 'vue';
import { Button, Result, Select, Spin } from 'ant-design-vue';
import { SelectProps } from 'ant-design-vue/es/select/index';
import debounce from 'lodash/debounce';

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
  key: string;
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
      key: item.value,
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

export default defineComponent({
  name: 'OpeneagleSearchSelect',
  props: {
    ...SelectProps(),
    /**
     * 是否允许空值查询
     */
    allowEmptySearch: Boolean,
    /**
     * 远程数据源
     */
    dataSource: {
      type: Function as PropType<(keyword: string) => Promise<any[]>>,
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
    /**
     * 当前选中的值
     */
    value: [Object, Array] as PropType<any | any[]>,
  },
  emits: ['update:value'],
  setup(props, { emit }) {
    const state = reactive<{
      data: SelectOption[];
      error?: Error;
      loading: boolean;
      dropdownVisible: boolean;
    }>({
      data: [],
      loading: false,
      dropdownVisible: false,
    });

    let mounted = false;
    let lastKeyword = '';

    onMounted(() => {
      mounted = true;
    });
    onUnmounted(() => {
      mounted = false;
    });

    let fetchId: number;
    const search = debounce((keyword: string) => {
      const currentId = Date.now();
      fetchId = currentId;
      state.loading = true;
      props
        .dataSource(keyword)
        .then((data) => {
          return transformData(
            props.fieldNames,
            (props.extras || []).concat(data),
          );
        })
        .then((options) => {
          if (mounted && state.dropdownVisible && fetchId === currentId) {
            state.data = options;
            state.error = undefined;
            state.loading = false;
          }
        })
        .catch((error) => {
          if (mounted && state.dropdownVisible && fetchId === currentId) {
            state.data = [];
            state.error = error;
            state.loading = false;
          }
        });
    }, 300);

    const handleChange = (value: any, option: any) => {
      let newValue;
      if (option) {
        if (Array.isArray(option)) {
          newValue = option.map((item: any) => item.source);
        } else {
          newValue = option.source;
        }
      }
      emit('update:value', newValue);
      props.onChange?.(newValue, option);
    };

    const handleDropdownVisibleChange = (visible: boolean) => {
      state.dropdownVisible = visible;
      if (!visible) {
        fetchId = Date.now();
        setTimeout(() => {
          if (props.value) {
            state.data = transformData(
              props.fieldNames,
              Array.isArray(props.value) ? props.value : [props.value],
            );
          } else {
            state.data = [];
          }
          state.error = undefined;
          state.loading = false;
        }, 300); // 延迟等待 value 更新
      }
      const { onDropdownVisibleChange } = props;
      if (typeof onDropdownVisibleChange === 'function') {
        onDropdownVisibleChange(visible);
      }
    };

    const handleSearch = (keyword: string) => {
      lastKeyword = keyword;
      if (state.dropdownVisible) {
        search(keyword);
      }
    };

    const value = computed(() => {
      if (props.value) {
        if (Array.isArray(props.value)) {
          return transformData(props.fieldNames, props.value);
        } else {
          return transformData(props.fieldNames, [props.value])[0];
        }
      }
      return undefined;
    });

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
            extra={
              <Button onClick={() => handleSearch(lastKeyword)}>
                重新加载
              </Button>
            }
          />
        );
        placeholder = '加载失败了~';
      }

      let options = data;
      if (loading) {
        options = [];
      }

      return (
        <Select
          {...props}
          filterOption={false}
          labelInValue
          loading={loading}
          notFoundContent={notFoundContent}
          options={options}
          showSearch
          placeholder={placeholder}
          value={value.value as any}
          onChange={handleChange}
          onDropdownVisibleChange={handleDropdownVisibleChange}
          onSearch={handleSearch}
        />
      );
    };
  },
});
