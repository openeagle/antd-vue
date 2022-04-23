import { PropType, computed, defineComponent, reactive, ref, watch } from 'vue';
import { Input } from 'ant-design-vue';
import AddressSelect, {
  AddressSelectPros,
} from '../AddressSelect/AddressSelect';
import { useDebounceFn } from '../../hooks';
export interface AddressDetailType {
  addressCode: string[];
  addressLabel: string[];
  area: string;
}
export default defineComponent({
  name: 'OpeneagleAddressSelect',
  props: {
    ...AddressSelectPros,
    detailPlaceHolder: {
      type: String,
      default: 'Please select',
    },
    value: Object as PropType<AddressDetailType>,
    maxlength: {
      type: Number,
    },
    onChange: Function as PropType<(value: any) => void>,
  },
  emits: ['update:value', 'change'],
  setup(props, { emit }) {
    const selectValue = reactive(props.value);
    const onSelectChange = () => {
      emit('update:value', selectValue);
      if (props.onChange) {
        props.onChange(selectValue);
      }
    };
    const onInput = useDebounceFn(() => {
      emit('update:value', selectValue);
      if (props.onChange) {
        props.onChange(selectValue);
      }
    }, 250);
    watch(
      () => props.value,
      (newValue) => {
        Object.assign(selectValue, newValue);
      },
    );
    return () => {
      return (
        <div>
          <AddressSelect
            {...props}
            v-models={[
              [selectValue.addressCode, 'value'],
              [selectValue.addressLabel, 'label'],
            ]}
            style={{ width: '100%', marginBottom: '10px' }}
            onChange={onSelectChange}
          />
          <Input
            v-model={[selectValue.area, 'value']}
            placeholder={props.detailPlaceHolder}
            onInput={onInput}
            disabled={props.disabled}
            maxlength={props.maxlength}
          />
        </div>
      );
    };
  },
});
