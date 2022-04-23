import { defineComponent, ref } from 'vue';
import { URLImageUploader } from '@/index';

export default defineComponent({
  setup() {
    const files = ref([
      '/img34.png',
    ]);
    return () => {
      return (
        <div>
          <URLImageUploader v-model={[files.value, 'value']} />
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
