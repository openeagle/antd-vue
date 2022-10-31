import { ref } from 'vue';
import { DatePicker } from 'ant-design-vue';
import { ImageUploader } from '@/index';
import mdx from './ImageUploader.mdx';
export default {
  title: '组件/ImageUploader',
  component: ImageUploader,
  parameters: {
    docs: {
      page: mdx,
    },
  },
  // argTypes: {
  //   accept: {
  //     control: { type: 'text' },
  //   },
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
        <ImageUploader
          multiple={args.multiple}
          v-model={[files.value, 'value']}
          limit={100}
          uploadFile={uploadFile}
        ></ImageUploader>
        <div style={{ marginTop: '20px' }}>{JSON.stringify(files.value)}</div>
      </div>
    );
  },
});
Multiple.storyName = '同时多张上传';
Multiple.argTypes = {
  multiple: {
    control: { type: 'boolean' },
    description: '支持同时上传多张图片',
  },
};
Multiple.args = {
  multiple: true,
};

export const LimitCount: any = (args: any) => ({
  setup() {
    const files = ref([]);
    return () => (
      <div>
        <ImageUploader
          limit={args.limit}
          v-model={[files.value, 'value']}
          uploadFile={uploadFile}
        ></ImageUploader>
        <div style={{ marginTop: '20px' }}>{JSON.stringify(files.value)}</div>
      </div>
    );
  },
});
LimitCount.storyName = '限制图片个数';
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
        id: '1000620210315101241274iRwlYdzJ',
        uid: '1000620210315101241274iRwlYdzJ',
        name: '自建站.jpg',
        size: 24149,
        type: 'image/jpeg',
        percent: 100,
        status: 'done',
        url: '/img34.png',
        width: 681,
        height: 251,
      },
    ]);
    return () => (
      <div>
        <ImageUploader
          limit={3}
          resolutions={args.resolutions}
          v-model={[files.value, 'value']}
          uploadFile={uploadFile}
        ></ImageUploader>
        <div style={{ marginTop: '20px' }}>{JSON.stringify(files.value)}</div>
      </div>
    );
  },
});
SpecsLimit.storyName = '限制分辨率';
SpecsLimit.argTypes = {
  resolutions: {
    control: { type: 'array' },
    description: '限制图片分辨率(单位:px) ',
  },
};
SpecsLimit.args = {
  resolutions: [
    { width: 120, height: 120 },
    { width: 120, height: 120 },
  ],
};

export const ViewSize: any = (args: any) => ({
  setup() {
    const files = ref([
      {
        id: '1000620210315101241274iRwlYdzJ',
        uid: '1000620210315101241274iRwlYdzJ',
        name: '自建站.jpg',
        size: 24149,
        type: 'image/jpeg',
        percent: 100,
        status: 'done',
        url: '/img34.png',
        width: 681,
        height: 251,
      },
    ]);
    console.log(args);
    return () => (
      <div>
        <ImageUploader
          limit={3}
          view={args.view}
          v-model={[files.value, 'value']}
          uploadFile={uploadFile}
        />
      </div>
    );
  },
});
ViewSize.storyName = '设置预览大小';
ViewSize.argTypes = {
  view: {
    control: { type: 'array' },
    description: '预览图大小(单位:px) ',
  },
};
ViewSize.args = {
  view: [
    {
      width: 200,
      height: 100,
    },
  ],
};

export const CustomRender: any = (args: any) => ({
  setup() {
    const files = ref([
      {
        id: '1000620210315101241274iRwlYdzJ',
        uid: '1000620210315101241274iRwlYdzJ',
        name: '自建站.jpg',
        size: 24149,
        type: 'image/jpeg',
        percent: 100,
        status: 'done',
        url: '/img34.png',
        width: 681,
        height: 251,
      },
    ]);
    const time = ref();
    return () => (
      <div>
        <ImageUploader
          limit={4}
          v-model={[files.value, 'value']}
          renderItem={(ImageView, file, index) => {
            return (
              <div
                style={{
                  display: 'inline-flex',
                  flexDirection: 'column',
                  alignItems: 'flex-start',
                  marginRight: '20px',
                }}
              >
                <ImageView />
                <DatePicker v-model={[time.value, 'value']} />
              </div>
            );
          }}
          uploadFile={uploadFile}
        >
          <div class={'image-box-upload'}>自定义上传</div>
        </ImageUploader>
      </div>
    );
  },
});
CustomRender.storyName = '自定义渲染';
