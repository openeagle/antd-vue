import {
  computed,
  DefineComponent,
  defineComponent,
  reactive,
  watch,
  watchEffect,
} from 'vue';
import { Card, Checkbox, Col, Input, Row } from 'ant-design-vue';
import { AdminSearch } from '@/index';

const { SearchForm } = AdminSearch;

const Phone = defineComponent({
  emits: ['update:value'],
  setup(props, { emit }) {
    const state = reactive({
      value1: '',
      value2: '',
    });
    const value = computed(() => {
      const { value1, value2 } = state;
      if (value1 && value) {
        return `${value1}-${value2}`;
      }
      if (value1) {
        return value1;
      }
      if (value2) {
        return value2;
      }
      return '';
    });
    watch(value, () => {
      emit('update:value', value.value);
    });
    return () => {
      return (
        <Input.Group>
          <Row gutter={8}>
            <Col span={8}>
              <Input v-model={[state.value1, 'value']} />
            </Col>
            <Col span={16}>
              <Input v-model={[state.value2, 'value']} />
            </Col>
          </Row>
        </Input.Group>
      );
    };
  },
});
const aa: DefineComponent<
  any,
  any,
  any,
  any,
  any,
  any,
  any,
  any,
  any,
  any,
  any
> = Phone;
export default defineComponent({
  setup() {
    const form = SearchForm.useForm([
      {
        type: aa,
        name: 'phone',
        label: 'phone',
      },
      {
        type: Checkbox,
        name: 'checkbox',
        label: 'checkbox',
        valuePropName: 'checked',
      },
    ]);
    return () => {
      return (
        <AdminSearch>
          <Card title="state">{JSON.stringify(form.state)}</Card>
          <AdminSearch.SearchForm layout="inline" form={form} />
        </AdminSearch>
      );
    };
  },
});
