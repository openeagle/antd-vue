import { ref } from 'vue';
import { VideoUploader } from '@/index';
import mdx from './VideoUploader.mdx';

export default {
  title: '组件/VideoUploader',
  component: VideoUploader,
  parameters: {
    docs: {
      page: mdx,
    },
  },
  // argTypes: {
  // },
};

const uploadFile = (file: File, options: any): Promise<any> => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve({
        fileId: Date.now(),
        fileName: '',
        fileType: 'jped',
        meta: {
          format: 'jpeg',
          size: 0,
        },
        url: URL.createObjectURL(file),
      });
    }, 2000);
  });
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

export const Multiple: any = (args: any) => ({
  setup() {
    const files = ref([]);
    return () => (
      <div>
        <VideoUploader
          multiple={true}
          v-model={[files.value, 'value']}
          limit={10}
          uploadFile={uploadFile}
        />
        <div style={{ marginTop: '20px' }}>{JSON.stringify(files.value)}</div>
      </div>
    );
  },
});
Multiple.storyName = '同时多个上传';
Multiple.argTypes = {
  multiple: {
    control: { type: 'boolean' },
    description: '支持同时上传多个视频',
  },
};
Multiple.args = {
  multiple: true,
};

export const LimitCount: any = (args: any) => ({
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
        thumbUrl: '/img34.png',
        url: '/img34.png',
        duration: 191.488,
        width: 1280,
        bitrate: 1232990,
        height: 720,
      },
    ]);
    return () => (
      <div>
        <VideoUploader
          v-model={[files.value, 'value']}
          limit={2}
          uploadFile={uploadFile}
        />
        <div style={{ marginTop: '20px' }}>{JSON.stringify(files.value)}</div>
      </div>
    );
  },
});
LimitCount.storyName = '限制视频个数';
LimitCount.argTypes = {
  limit: {
    control: { type: 'number' },
    description: '限制上传数量',
  },
};
LimitCount.args = {
  limit: 2,
};

export const SpecsLimit: any = (args: any) => ({
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
        thumbUrl: '/img34.png',
        url: '/img34.png',
        duration: 191.488,
        width: 1280,
        bitrate: 1232990,
        height: 720,
      },
    ]);
    return () => (
      <div>
        <VideoUploader
          resolutions={[
            { width: 100, height: 100 },
            { width: 120, height: 120 },
          ]}
          v-model={[files.value, 'value']}
          uploadFile={uploadFile}
        />
        <div style={{ marginTop: '20px' }}>{JSON.stringify(files.value)}</div>
      </div>
    );
  },
});
SpecsLimit.storyName = '限制分辨率';
SpecsLimit.argTypes = {
  resolutions: {
    control: { type: 'array' },
    description: '限制视频分辨率(单位:px) ',
  },
};
SpecsLimit.args = {
  resolutions: [
    { width: 120, height: 120 },
    { width: 120, height: 120 },
  ],
};
