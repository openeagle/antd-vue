import { ref } from 'vue';
import { Catpcha } from '@/index';
import '@/components/Catpcha/style/index.less';
import mdx from './Catpcha.mdx';

export default {
  title: '组件/Catpcha',
  component: Catpcha,
  parameters: {
    viewport: {
      defaultViewport: 'tablet',
    },
    docs: {
      page: mdx,
    },
  },
};

export const Basic: any = (args: any) => ({
  setup() {
    const code = ref();

    const requestCode = () => {
      setTimeout(() => {
        code.value = '5000';
      }, 5000);
    };
    return () => (
      <div>
        <Catpcha v-model={[code.value, 'value']} request={requestCode} />
        输入的值：{code.value}
      </div>
    );
  },
});

Basic.storyName = '基础用法';
