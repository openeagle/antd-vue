import { defineComponent, reactive, ref } from 'vue';
import { MixCheck } from '@/index';
import { Card, Spin } from 'ant-design-vue';

const options = [
  { id: '1', name: '爸爸' },
  { id: '2', name: '妈妈' },
  { id: '3', name: '奶奶' },
  { id: '4', name: '爷爷' },
  { id: '5', name: '外婆' },
  { id: '6', name: '外公' },
  { id: '7', name: '伯父' },
  { id: '8', name: '伯母' },
];
export default defineComponent({
  setup() {
    const data = ref([1, 2]);
    const loadValue = ref<any[]>([]);

    const loadData = ref<any[]>([]);
    const loading = ref(false);

    loading.value = true;
    setTimeout(() => {
      loadData.value = options;
    }, 3000);
    setTimeout(() => {
      loadValue.value = ['1', '2', '4'];
      loading.value = false;
    }, 4000);
    return () => {
      return (
        <div>
          <Card title="基础示例">
            <MixCheck
              v-model={[data.value, 'value']}
              options={options}
            ></MixCheck>
            <br />
            <br />
            <p>选择中的值： {JSON.stringify(data.value)}</p>
          </Card>
          <br />
          <Card title="远程请求">
            <Spin spinning={loading.value}>
              <MixCheck
                v-model={[loadValue.value, 'value']}
                options={loadData.value}
              ></MixCheck>
              <br />
              <br />
              <p>选择中的值： {JSON.stringify(loadValue.value)}</p>
            </Spin>
          </Card>
        </div>
      );
    };
  },
});
