import { AddressSelect } from '@/index';
import { ref } from 'vue';
import mdx from './AddressSelect.mdx';

export default {
  title: '组件/AddressSelect',
  component: AddressSelect,
  parameters: {
    viewport: {
      defaultViewport: 'tablet',
    },
    docs: {
      page: mdx,
    },
    actions: {
      disabled: true,
    },
  },

  argTypes: {
    value: {
      description: '指定选中项 ',
      control: { type: 'object' },
    },
    accuracy: {
      description: '精度，根据精度的不同显示不同级别的选择器 ',
      control: { type: 'select' },
      defaultValue: 'area',
      options: ['area', 'city', 'province'],
      table: {
        defaultValue: { summary: 'area' }, // https://github.com/storybookjs/storybook/issues/11983
      },
    },
  },
};

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

export const Basic: any = (args: any, { argTypes }: any) => ({
  setup() {
    const selectAll = ref<string[]>([]);
    const selectAllLabel = ref<string[]>([]);
    return () => {
      console.log(args);
      return (
        <div>
          <AddressSelect
            v-models={[
              [selectAll.value, 'value'],
              [selectAllLabel.value, 'label'],
            ]}
            accuracy={args.accuracy}
          />
          <br />
          <br />
          <p> 选择结果：{JSON.stringify(selectAll.value)}</p>
          <p> 选择结果：{JSON.stringify(selectAllLabel.value)}</p>
        </div>
      );
    };
  },
});
Basic.args = {
  value: {},
  accuracy: 'area',
};
Basic.storyName = '基础用法';

export const GetData: any = (args: any) => ({
  setup() {
    const optonsData = [
      {
        value: 'zhejiang',
        label: 'Zhejiang',
        children: [
          {
            value: 'hangzhou',
            label: 'Hangzhou',
            children: [
              {
                value: 'xihu',
                label: 'West Lake',
              },
            ],
          },
        ],
      },
      {
        value: 'jiangsu',
        label: 'Jiangsu',
        children: [
          {
            value: 'nanjing',
            label: 'Nanjing',
            children: [
              {
                value: 'zhonghuamen',
                label: 'Zhong Hua Men',
              },
            ],
          },
        ],
      },
    ];
    const selectFetch = ref<string[]>([]);
    const fetchData = () => {
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          resolve(optonsData);
        }, 500);
      });
    };
    const fieldNames = { value: 'label', label: 'value' };
    return () => (
      <div>
        <AddressSelect
          v-model={[selectFetch.value, 'value']}
          dataSource={fetchData}
          field-names={fieldNames}
          accuracy={args.accuracy}
        />
        <br />
        <p> 选择结果：{JSON.stringify(selectFetch.value)}</p>
      </div>
    );
  },
});

GetData.storyName = '提供获取数据方法';
