import dayjs from 'dayjs';

import { AdminSearch } from '@/index';
import '@/components/AdminSearch/style/index.less';
import withVueApp from '@stories/internals/withVueApp';
import mdx from './SearchForm.mdx';
import { Card, Checkbox, Col, Input, Row, Switch } from 'ant-design-vue';
import { computed, defineComponent, reactive, ref, watch } from 'vue';

export default {
  title: '组件/AdminSearch/SearchForm',
  component: AdminSearch.SearchForm,
  parameters: {
    docs: {
      page: mdx,
    },
  },
};

/**
 * 如何使用
 * @param args
 * @returns
 */
 export const HowToUseForm: any = (args: any, { argTypes }: any) => ({
  setup(props: any, { emit }: any) {
    return () => {
      return <div></div>;
    };
  },
});

HowToUseForm.parameters = {
  controls: {
    disabled: true,
  },
};
HowToUseForm.storyName = '如何使用';

/**
 * 初始化值
 * @param args
 * @returns
 */
export const InitialValue: any = (args: any) =>
  withVueApp({
    setup() {
      const form = AdminSearch.useForm([
        {
          type: 'text',
          name: 'text',
          label: 'text',
          rules: [{ required: true, message: '请输入值' }],
        },
        {
          type: 'number',
          name: 'number',
          label: 'number',
          initialValue: 1,
        },
        {
          type: 'year',
          name: 'year',
          label: 'year',
          initialValue: () => dayjs(),
        },
        {
          type: 'month',
          name: 'month',
          label: 'month',
          initialValue: () => dayjs(),
        },
        {
          type: 'week',
          name: 'week',
          label: 'week',
          initialValue: () => dayjs(),
        },
        {
          type: 'date',
          name: 'date',
          label: 'date',
          initialValue: () => dayjs(),
          controlProps: {
            style: {
              width: '100%',
            },
          },
        },
        {
          type: 'dateRange',
          name: 'dateRange',
          label: 'dateRange',
          initialValue: () => [dayjs(), dayjs()],
          controlProps: {
            style: {
              width: '100%',
            },
          },
        },
        {
          type: 'dateTime',
          name: 'dateTime',
          label: 'dateTime',
          initialValue: () => dayjs(),
        },
        {
          type: 'dateTimeRange',
          name: 'dateTimeRange',
          label: 'dateTimeRange',
          initialValue: () => [dayjs(), dayjs()],
          controlProps: {
            style: {
              width: '100%',
            },
          },
        },
        {
          type: 'time',
          name: 'time',
          label: 'time',
          initialValue: () => dayjs(),
        },
        {
          type: 'select',
          name: 'select',
          label: 'select',
          initialValue: 'beijing',
          controlProps: {
            placeholder: 'please select your zone',
            options: [
              {
                label: 'Zone one',
                value: 'shanghai',
              },
              {
                label: 'Zone two',
                value: 'beijing',
              },
            ],
          },
        },
      ]);
      form.onSubmit(() => {
        alert('提交成功')
      })
      return () => {
        return (
          <AdminSearch>
            <Card>{JSON.stringify(form.state)}</Card>
            <AdminSearch.SearchForm
              layout="inline"
              form={form}
            />
          </AdminSearch>
        );
      };
    },
  });
InitialValue.storyName = '初始化值';

/**
 * 固定 Label 宽度
 * @param args
 * @returns
 */
export const FixedLabelWidth: any = (args: any) =>
  withVueApp({
    setup() {
      const form = AdminSearch.useForm([
        {
          type: 'text',
          name: 'text',
          label: 'text',
          initialValue: 'text',
        },
        {
          type: 'number',
          name: 'number',
          label: 'number',
          initialValue: 1,
        },
        {
          type: 'year',
          name: 'year',
          label: 'year',
          initialValue: () => dayjs(),
        },
      ]);
      return () => {
        return (
          <AdminSearch>
            <Card>{JSON.stringify(form.state)}</Card>
            <AdminSearch.SearchForm
              form={form}
              layout="grid"
              labelWidth={150}
            />
          </AdminSearch>
        );
      };
    },
  });
FixedLabelWidth.storyName = '固定 Label 宽度';

/**
 * 布局
 * @param args
 * @returns
 */
export const Layout: any = (args: any) =>
  withVueApp({
    setup() {
      const form = AdminSearch.SearchForm.useForm([
        {
          type: 'text',
          name: 'text',
          label: 'text',
        },
        {
          type: 'number',
          name: 'number',
          label: 'number',
        },
        {
          type: 'year',
          name: 'year',
          label: 'year',
        },
        {
          type: 'month',
          name: 'month',
          label: 'month',
        },
        {
          type: 'week',
          name: 'week',
          label: 'week',
        },
        {
          type: 'date',
          name: 'date',
          label: 'date',
          controlProps: {
            style: {
              width: '100%',
            },
          },
        },
        {
          type: 'dateRange',
          name: 'dateRange',
          label: 'dateRange',
          controlProps: {
            style: {
              width: '100%',
            },
          },
        },
      ]);
      return () => {
        return (
          <div>
            <Card bordered={false} title="inline">
              <AdminSearch pure>
                <AdminSearch.SearchForm layout="inline" form={form} />
              </AdminSearch>
            </Card>
            <Card bordered={false} title="grid">
              <AdminSearch pure>
                <AdminSearch.SearchForm layout="grid" form={form} />
              </AdminSearch>
            </Card>
          </div>
        );
      };
    },
  });

Layout.storyName = '布局';

/**
 * ActionSplit
 * @param args
 * @returns
 */
export const ActionSplit: any = (args: any) =>
  withVueApp({
    setup() {
      const form = AdminSearch.SearchForm.useForm([
        {
          type: 'text',
          name: 'text',
          label: 'text',
        },
        {
          type: 'number',
          name: 'number',
          label: 'number',
        },
        {
          type: 'year',
          name: 'year',
          label: 'year',
        },
        {
          type: 'month',
          name: 'month',
          label: 'month',
        },
        {
          type: 'week',
          name: 'week',
          label: 'week',
        },
        {
          type: 'date',
          name: 'date',
          label: 'date',
          controlProps: {
            style: {
              width: '100%',
            },
          },
        },
        {
          type: 'dateRange',
          name: 'dateRange',
          label: 'dateRange',
          controlProps: {
            style: {
              width: '100%',
            },
          },
        },
      ]);
      return () => {
        return (
          <div>
            <Card bordered={false} title="inline">
              <AdminSearch pure>
                <AdminSearch.SearchForm
                  layout="inline"
                  form={form}
                  actionSplit
                />
              </AdminSearch>
            </Card>
            <Card bordered={false} title="grid">
              <AdminSearch pure>
                <AdminSearch.SearchForm layout="grid" form={form} actionSplit />
              </AdminSearch>
            </Card>
          </div>
        );
      };
    },
  });

ActionSplit.storyName = 'ActionSplit';

/**
 * 表单按钮相关的配置
 * @param args
 * @returns
 */
export const FormBtnConfig: any = (args: any) =>
  withVueApp({
    setup() {
      const openSearchBtn = ref<boolean>(true);
      const openResethBtn = ref<boolean>(true);
      const form = AdminSearch.useForm([
        {
          type: 'text',
          name: 'text',
          label: 'text',
          initialValue: 'text',
        },
        {
          type: 'number',
          name: 'number',
          label: 'number',
          initialValue: 1,
        },
        {
          type: 'year',
          name: 'year',
          label: 'year',
          initialValue: () => dayjs(),
        },
      ]);
      return () => {
        return (
          <AdminSearch>
            <AdminSearch.SearchForm
              searchText={
                openSearchBtn.value ? '自定义搜索文本' : openSearchBtn.value
              }
              resetText={
                openResethBtn.value
                  ? '自定自定义重置文本义搜索文本'
                  : openResethBtn.value
              }
              mainActions={[
                {
                  text: '添加',
                  onClick: () => {
                    console.log('');
                  },
                },
              ]}
              extraActions={[
                {
                  text: '下载',
                  onClick: () => {
                    console.log('');
                  },
                },
              ]}
              form={form}
              layout="grid"
              labelWidth={150}
            />
            <Switch
              checked={openSearchBtn.value}
              onChange={() => {
                openSearchBtn.value = !openSearchBtn.value;
              }}
            />
            <span style={{ margin: '0 10px' }}>
              {openSearchBtn.value ? '隐藏搜索按钮' : '显示搜索按钮'}
            </span>
            <Switch
              checked={openResethBtn.value}
              onChange={() => {
                openResethBtn.value = !openResethBtn.value;
              }}
            />
            <span style={{ marginLeft: '10px' }}>
              {openResethBtn.value ? '隐藏重置按钮' : '显示重置按钮'}
            </span>
          </AdminSearch>
        );
      };
    },
  });
FormBtnConfig.storyName = '表单按钮相关的配置';

/**
 * @param args
 * @returns
 */
export const CustomControl: any = (args: any) => {
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
  return withVueApp({
    setup() {
      const form = AdminSearch.SearchForm.useForm([
        {
          type: Phone,
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
};
CustomControl.storyName = '定制组件';

/**
 * API
 * @param args
 * @returns
 */
export const API: any = (args: any, { argTypes }: any) => ({
  setup(props: any, { emit }: any) {
    return () => {
      return <div></div>;
    };
  },
});

API.parameters = {
  controls: {
    disabled: true,
  },
};
