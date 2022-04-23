import { AddressDetail } from '@/index';
import { reactive, ref } from 'vue';
import mdx from './AddressDetail.mdx';

export default {
  title: '组件/AddressDetail',
  component: AddressDetail,
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
    // previewTabs: {
    //   'storybook/canvas/panel': {
    //     hidden: true,
    //   },
    // },
  },
  // https://storybook.js.org/docs/vue/essentials/controls
  argTypes: {
    value: {
      description: ' 指定选中项  ',
      control: { type: 'object' },
      table: {
        defaultValue: '',
      },
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
    maxlength: {
      description: '详细地址的最大长度',
      control: { type: 'number', min: 1 },
      defaultValue: 30,
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
    const selectValue = reactive({});
    return () => {
      return (
        <div>
          <AddressDetail
            v-model={[selectValue, 'value']}
            accuracy={args.accuracy}
            maxlength={args.maxlength}
          />
          <br/>
          <p> 选中的值：{JSON.stringify(selectValue)}</p>
        </div>
      );
    };
  },
});

Basic.args = {
  value: {},
  maxlength: 30,
};

Basic.storyName = '基础用法';

export const GetData: any = (args: any, { argTypes }: any) => ({
  setup() {
    const fieldNames = { value: 'value', label: 'label' };
    const selectFetch = ref(args.value);
    const fetchData = () => {
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          resolve(args.dataSource);
        }, 3000);
      });
    };
    return () => {
      console.log(args)
      return  <div>
        <AddressDetail
          placeholder="请选择"
          v-model={[selectFetch.value, 'value']}
          dataSource={fetchData}
          field-names={fieldNames}
          accuracy={args.accuracy}
          maxlength={args.maxlength}
        />
        填写的值：{JSON.stringify(selectFetch.value)}
      </div>
    }
  },
});

GetData.args = {
  value: {},
  dataSource: [
    {
      value: 'zhejiang',
      label: '浙江',
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
  ],
};
GetData.storyName = '提供获取数据方法';

export const BindData: any = (args: any, { argTypes }: any) => ({
  setup() {
    const selectFetch = ref(args.value);
    const fetchData2 = () => {
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          resolve(args.dataSource);
        }, 500);
      });
    };
    return () => (
      <div>
        <AddressDetail
          placeholder="请选择"
          v-model={[selectFetch.value, 'value']}
          dataSource={fetchData2}
          field-names={{ value: 'id', label: 'name' }}
          accuracy={args.accuracy}
          maxlength={args.maxlength}
        />
        <br/>
        填写的值：{JSON.stringify(selectFetch.value)}
      </div>
    );
  },
});

BindData.args = {
  value: {
    addressCode: ['2', '6913'],
    addressLabel: ['北京', '北京市'],
    area: '天上人间',
  },
  dataSource: [
    {
      id: '2',
      name: '北京',
      zipcode: '110000',
      type: 'folder',
      children: [
        {
          id: '6913',
          name: '北京市',
          zipcode: '110100',
          type: 'item',
        },
      ],
    },
    {
      id: '19',
      name: '天津',
      zipcode: '120000',
      type: 'folder',
      children: [
        {
          id: '6916',
          name: '天津市',
          zipcode: '120100',
          type: 'item',
        },
      ],
    },
    {
      id: '351',
      name: '内蒙古自治区',
      zipcode: '150000',
      type: 'folder',
      children: [
        {
          id: '352',
          name: '呼和浩特市',
          zipcode: '150100',
          type: 'item',
        },
        {
          id: '362',
          name: '包头市',
          zipcode: '150200',
          type: 'item',
        },
        {
          id: '372',
          name: '乌海市',
          zipcode: '150300',
          type: 'item',
        },
        {
          id: '376',
          name: '赤峰市',
          zipcode: '150400',
          type: 'item',
        },
        {
          id: '389',
          name: '通辽市',
          zipcode: '150500',
          type: 'item',
        },
        {
          id: '398',
          name: '鄂尔多斯市',
          zipcode: '150600',
          type: 'item',
        },
        {
          id: '407',
          name: '呼伦贝尔市',
          zipcode: '150700',
          type: 'item',
        },
        {
          id: '421',
          name: '巴彦淖尔市',
          zipcode: '150800',
          type: 'item',
        },
        {
          id: '429',
          name: '乌兰察布市',
          zipcode: '150900',
          type: 'item',
        },
        {
          id: '441',
          name: '兴安盟',
          zipcode: '152200',
          type: 'item',
        },
        {
          id: '448',
          name: '锡林郭勒盟',
          zipcode: '152500',
          type: 'item',
        },
        {
          id: '461',
          name: '阿拉善盟',
          zipcode: '152900',
          type: 'item',
        },
      ],
    },

    {
      id: '3225',
      name: '台湾省',
      zipcode: '710000',
      type: 'folder',
      children: [
        {
          id: '6915',
          name: '台湾',
          zipcode: '710000',
          type: 'item',
        },
      ],
    },
    {
      id: '3268',
      name: '澳門特別行政區',
      zipcode: '820000',
      type: 'folder',
      children: [
        {
          id: '3269',
          name: '花地瑪堂區',
          zipcode: '820001',
          type: 'item',
        },
        {
          id: '3271',
          name: '大堂区',
          zipcode: '820004',
          type: 'item',
        },
        {
          id: '3272',
          name: '望德堂区',
          zipcode: '820003',
          type: 'item',
        },
        {
          id: '3273',
          name: '风顺堂区',
          zipcode: '820005',
          type: 'item',
        },
        {
          id: '6914',
          name: '花王堂區',
          zipcode: '820002',
          type: 'item',
        },
      ],
    },
  ],
};

BindData.storyName = '绑定数据';
