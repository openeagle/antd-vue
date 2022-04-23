import { NumberText } from '@/index';
import mdx from './NumberText.mdx';

export default {
  title: '组件/NumberText',
  component: NumberText,
  parameters: {
    docs: {
      page: mdx,
    },
  },
  argTypes: {
    value: {},
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




export const Integer: any = (args: any) => ({
  setup() {
    return () => {
      return <NumberText value={123456789.987654321} type="integer" />;
    };
  },
});
Integer.storyName = '整数';

export const Decimal: any = (args: any) => ({
  setup() {
    return () => {
      return <NumberText value={123456789.987654321} type="decimal" />;
    };
  },
});
Decimal.storyName = '小数';

export const Money: any = (args: any) => ({
  setup() {
    return () => {
      return <NumberText value={123456789.987654321} type="money" />;
    };
  },
});
Money.storyName = '金额';

export const Percent: any = (args: any) => ({
  setup() {
    return () => {
      return <NumberText value={123456789.987654321} type="percent" />;
    };
  },
});
Percent.storyName = '进度';
