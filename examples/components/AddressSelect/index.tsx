import { defineComponent, ref } from 'vue';
import { AddressSelect } from '@/index';
import { Card } from 'ant-design-vue';
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
const fieldNames = { value: 'label', label: 'value' };
export default defineComponent({
  setup() {
    const selectAll = ref<string[]>([]);
    const selectAllLabel = ref<string[]>([]);
    const selectCity = ref<string[]>([]);
    const selectProvince = ref<string[]>([]);
    const selectFetch = ref<string[]>([]);

    const fetchData = () => {
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          resolve(optonsData);
        }, 3000);
      });
    };
    const onChange = () => {
      console.log('onChange');
    };
    return () => {
      return (
        <div>
          <Card title="选择省市区">
            <AddressSelect
              v-models={[
                [selectAll.value, 'value'],
                [selectAllLabel.value, 'label'],
              ]}
              onChange={onChange}
            />
            <br />
            <br />
            <p> 选择结果：{JSON.stringify(selectAll.value)}</p>
            <p> 选择结果：{JSON.stringify(selectAllLabel.value)}</p>
          </Card>

          <br></br>
          <Card title="选择省市">
            <AddressSelect
              v-model={[selectCity.value, 'value']}
              accuracy="city"
            />
            <br />
            <br />
            <p>选择结果：{JSON.stringify(selectCity.value)}</p>
          </Card>

          <br />

          <Card title="选择省">
            <AddressSelect
              v-model={[selectProvince.value, 'value']}
              accuracy="province"
            />
            <br />
            <br />
            <p> 选择结果：{JSON.stringify(selectProvince.value)}</p>
          </Card>

          <br />

          <Card title="提供获取数据方法">
            <AddressSelect
              v-model={[selectFetch.value, 'value']}
              dataSource={fetchData}
              field-names={fieldNames}
            />
            <br />
            <br />
            <p> 选择结果：{JSON.stringify(selectFetch.value)}</p>
          </Card>
        </div>
      );
    };
  },
});
