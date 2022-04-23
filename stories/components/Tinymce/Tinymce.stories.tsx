import { ref } from 'vue';
import { Tinymce } from '@/index';
import '@/components/Tinymce/style/index.less';
import mdx from './Tinymce.mdx';

export default {
  title: '组件/Tinymce',
  component: Tinymce,
  parameters: {
    docs: {
      page: mdx,
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
    const content = ref('');

    const onChange = (content: string) => {
      console.log(content);
    };

    return () => (
      <div>
        <Tinymce
          v-model={[content.value, 'value']}
          onChange={onChange}
          init={{
            height: 300,
            openeagle_image_options: {
              accept: '.jpg,.jpeg',
            },
            openeagle_video_options: {},
          }}
        />
      </div>
    );
  },
});

Basic.storyName = '基础用法';

export const ImageOptions: any = (args: any) => ({
  setup() {
    const content = ref('');

    const onChange = (content: string) => {
      console.log(content);
    };

    return () => (
      <div>
        <Tinymce
          v-model={[content.value, 'value']}
          onChange={onChange}
          init={{
            height: 300,
            openeagle_image_options: {
              accept: '.jpg,.jpeg',
              limit: 1,
              maxSize: 1000,
            },
            openeagle_video_options: {},
          }}
        />
      </div>
    );
  },
});

ImageOptions.storyName = '限制上传图片';

export const VideoOptions: any = (args: any) => ({
  setup() {
    const content = ref('');

    const onChange = (content: string) => {
      console.log(content);
    };

    return () => (
      <div>
        <Tinymce
          v-model={[content.value, 'value']}
          onChange={onChange}
          init={{
            height: 300,
            openeagle_video_options: {
              accept: '.jpg,.jpeg',
              limit: 1,
              maxSize: 1000,
            },
          }}
        />
      </div>
    );
  },
});

VideoOptions.storyName = '限制上传视频';
