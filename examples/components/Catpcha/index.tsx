import { defineComponent, ref } from 'vue';
import { Catpcha } from '@/index';
import { Card } from 'ant-design-vue';
export default defineComponent({
  setup() {
    const code = ref();

    const requestCode = () => {
      setTimeout(() => {
        code.value = '5000';
      }, 5000);
    };
    return () => {
      return (
        <div>
          <Card title="基础事例">
            <Catpcha v-model={[code.value, 'value']} request={requestCode} />
          </Card>
        </div>
      );
    };
  },
});
