import { defineComponent, ref } from 'vue';
import { URLVideoUploader } from '@/index';

export default defineComponent({
  setup() {
    const files = ref([
      'http://ip.com/1000620210315091356933ytaFQY2c.mp4',
    ]);
    return () => {
      return (
        <div>
          <URLVideoUploader v-model={[files.value, 'value']} maxWidth={1500} />
          <ul>
            {files.value.map((item) => (
              <li>{JSON.stringify(item)}</li>
            ))}
          </ul>
        </div>
      );
    };
  },
});
