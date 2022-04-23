import { ref } from 'vue';
import { MixCheck } from '@/index';
import '@/components/MixCheck/style/index.less';
import mdx from './MixCheck.mdx';

export default {
  title: '组件/MixCheck',
  component: MixCheck,
  parameters: {
    docs: {
      page: mdx,
    },
  },
  argTypes: {
    options: {
      control: { type: 'object' },
      description: "数据源，目前只支持{id: '', name: ''} 格式",
    },
  },
};

export const API: any = (args: any, { argTypes }: any) => ({
  setup() {
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
  setup(props: any) {
    const options = ref([
      { id: '1', name: '爸爸' },
      { id: '2', name: '妈妈' },
      { id: '3', name: '奶奶' },
      { id: '4', name: '爷爷' },
      { id: '5', name: '外婆' },
    ]);
    const data = ref([]);
    console.log(props);
    return () => (
      <div>
        <MixCheck {...args} v-model={[data.value, 'value']}></MixCheck>
        <br /><br />
        <p>选择中的值： {JSON.stringify(data.value)}</p>
      </div>
    );
  },
});

Basic.args = {
  options: [
    { id: '1', name: '爸爸' },
    { id: '2', name: '妈妈' },
    { id: '3', name: '奶奶' },
    { id: '4', name: '爷爷' },
    { id: '5', name: '外婆' },
  ],
};

Basic.storyName = '基础用法';
