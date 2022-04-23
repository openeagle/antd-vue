import { defineComponent, ref } from 'vue';
import { VideoUploader } from '@/index';

export default defineComponent({
  setup() {
    const files = ref([
      {
        id: '1000620210315091356933ytaFQY2c',
        uid: 'vc-upload-1615770822133-2',
        name: '601a436fc7559.m4v',
        size: 29512860,
        type: 'video/mp4',
        percent: 100,
        status: 'done',
        thumbUrl:
          '/img34.png',
        url: '/img34.png',
        duration: 191.488,
        width: 1280,
        bitrate: 1232990,
        height: 720,
      },
    ]);
    return () => {
      return (
        <div>
          <VideoUploader v-model={[files.value, 'value']} maxWidth={1500} />
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
