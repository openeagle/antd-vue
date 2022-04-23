import { ref } from 'vue';
import { Button } from 'ant-design-vue';
import { UploadOutlined } from '@ant-design/icons-vue';
import { Uploader } from '@/index';
import mdx from './Uploader.mdx';

export default {
  title: '组件/Uploader',
  component: Uploader,
  parameters: {
    docs: {
      page: mdx,
    },
  },
  argTypes: {
    listType: {
      description: '上传列表的内建样式 ',
      control: { type: 'select' },
      defaultValue: 'picture',
      options: ['text', 'picture', 'picture-card'],
      table: {
        defaultValue: { summary: 'picture' }, // https://github.com/storybookjs/storybook/issues/11983
      },
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

export const Basic: any = (args: any) => ({
  setup() {
    const files = ref([]);
    return () => {
      return (
        <div>
          <Uploader v-model={[files.value, 'file-list']}>
            <Button>
              <UploadOutlined />
              点击上传
            </Button>
          </Uploader>
        </div>
      );
    };
  },
});
Basic.storyName = '点击上传';

export const PicStyle: any = (props: any, { argTypes }: any) => ({
  props: Object.keys(argTypes),
  setup() {
    const files = ref([]);
    return () => {
      return (
        <div>
          <Uploader
            v-model={[files.value, 'file-list']}
            list-type={props.listType}
          >
            <Button>
              <UploadOutlined />
              点击上传
            </Button>
          </Uploader>
        </div>
      );
    };
  },
});
PicStyle.storyName = '图片列表样式';

// PicStyle.argTypes = {
//   listType: {
//     description: '上传列表的内建样式 ',
//     control: { type: 'select' },
//     defaultValue: 'picture',
//     options: ['text', 'picture', 'picture-card'],
//     table: {
//       defaultValue: { summary: 'picture' }, // https://github.com/storybookjs/storybook/issues/11983
//     },
//   },
// };

PicStyle.args = {
  listType: 'picture',
};

// key={JSON.stringify(props)}
