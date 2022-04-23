import { defineComponent, ref } from 'vue';
import { Uploader } from '@/index';

export default defineComponent({
  setup() {
    const files = ref([
      {
        uid: 'vc-upload-1615769989484-2',
        lastModified: 1615444993073,
        lastModifiedDate: '2021-03-11T06:43:13.073Z',
        name: '自建站.jpg',
        size: 24149,
        type: 'image/jpeg',
        percent: 100,
        originFileObj: { uid: 'vc-upload-1615769989484-2' },
        status: 'done',
        url:
          '/img34.png',
        response: {
          fileId: '1000620210315085951592v1z27GcA',
          fileName: '自建站.jpg',
          fileType: 'jpeg',
          url:
            '/img34.png',
          fullUrl:
            '/img34.png',
          token: '',
          meta: { size: 24149, format: 'jpeg', width: 681, height: 251 },
        },
      },
      {
        uid: 'vc-upload-1615770822133-2',
        lastModified: 1615477213592,
        lastModifiedDate: '2021-03-11T15:40:13.592Z',
        name: '601a436fc7559.m4v',
        size: 29512860,
        type: 'video/mp4',
        percent: 100,
        originFileObj: { uid: 'vc-upload-1615770822133-2' },
        status: 'done',
        thumbUrl: '',
        url: 'http://ip.com/1000620210315091356933ytaFQY2c.mp4',
        response: {
          fileId: '1000620210315091356933ytaFQY2c',
          fileName: '601a436fc7559.m4v',
          fileType: 'mp4',
          url:
            'http://ip.com/1000620210315091356933ytaFQY2c.mp4',
          fullUrl:
            'https:ip.com/1000620210315091356933ytaFQY2c.mp4',
          token: '',
          meta: {
            duration: 191.488,
            size: 29512860,
            width: 1280,
            bitrate: 1232990,
            startTime: 0,
            height: 720,
          },
        },
      },
    ]);
    return () => {
      return (
        <div>
          <Uploader
            v-model={[files.value, 'file-list']}
            listType="picture-card"
          >
            <div>
              <plus-outlined />
              <div class="ant-upload-text">Upload</div>
            </div>
          </Uploader>
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
