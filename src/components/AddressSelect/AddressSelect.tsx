import { PropType, defineComponent, ref, onMounted } from 'vue';
import { Cascader } from 'ant-design-vue';
import AddressData from './data/cities.json';
interface OptionItem {
  label: string;
  value: string;
  children?: OptionItem[];
}
interface OptionData {
  [key: string]: any;
}

export const AddressSelectPros = {
  ...Cascader.props,
  label: Array,
  // 精度，根据精度的不同显示不同级别的选择器
  accuracy: {
    type: String as PropType<'province' | 'city' | 'area'>,
    default: 'area',
  },
  // 可供定制的省市区接口，
  dataSource: [Function] as PropType<() => Promise<OptionItem[]>>,
} as const;

export default defineComponent({
  name: 'OpeneagleAddressSelect',
  props: AddressSelectPros,
  emits: ['update:value', 'update:label'],
  setup(props, { emit }) {
    let cascaderOptions = ref<OptionItem[]>([]);
    let placeholderRef = ref(props.placeholder);
    const fieldNames = props.fieldNames ? props.fieldNames : { value: 'code' };
    const generateData = () => {
      if (props.accuracy === 'province') {
        return AddressData.map((item) => {
          return {
            code: item.code,
            value: item.value,
            label: item.label,
          };
        });
      } else if (props.accuracy === 'city') {
        return AddressData.map((item) => {
          return {
            code: item.code,
            value: item.value,
            label: item.label,
            children: item.children.map((item: OptionItem) => {
              const { children, ...reset } = item;
              return reset;
            }),
          };
        });
      }
      return AddressData;
    };
    if (props.dataSource) {
      placeholderRef.value = '数据加载中...';
      props
        .dataSource()
        .then((data: OptionItem[]) => {
          cascaderOptions.value = data;
          placeholderRef.value = props.placeholder;
        })
        .catch((msg: any) => {
          cascaderOptions.value = [];
          placeholderRef.value = props.placeholder;
        });
    } else {
      cascaderOptions.value = generateData();
    }
    const onChange = (value: any, selectedOptions: any) => {
      console.log(selectedOptions);
      console.log(fieldNames);
      emit(
        'update:label',
        selectedOptions.map((item: any) => {
          return item.label;
        }),
      );
      if (props.onChange) {
        props.onChange();
      }
    };
    return () => {
      return (
        <Cascader
          {...props}
          options={cascaderOptions.value}
          placeholder={placeholderRef.value}
          field-names={fieldNames}
          onChange={onChange}
        />
      );
    };
  },
});
