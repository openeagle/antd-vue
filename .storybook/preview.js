import '@storybook/addon-console';
import { themes } from '@storybook/theming';
import { INITIAL_VIEWPORTS } from '@storybook/addon-viewport';
import { addParameters } from '@storybook/vue3';
import 'ant-design-vue/dist/antd.css';
import '../src/style';
import './global.css';

export const parameters = {
  actions: { argTypesRegex: '^on[A-Z].*' },
  controls: { expanded: true }, // 显示 control 的描述信息
  html: {
    prettier: {
      tabWidth: 4,
      useTabs: false,
      htmlWhitespaceSensitivity: 'strict',
    },
  },
};

addParameters({
  viewport: {
    viewports: INITIAL_VIEWPORTS,
  },
  viewMode: 'docs', // 默认显示 Doc 页面

  options: {
    storySort: {
      order: [
        '入门',
        '基础使用',
        ['开始使用', '文件结构', 'tsx 懒加载', '路由懒加载', 'vue3 Tsx 的使用'],
        '页面开发',
        ['新增页面', '布局', 'CSS Modules'],
        'API',
        '组件',
      ],
    },
  },
});
