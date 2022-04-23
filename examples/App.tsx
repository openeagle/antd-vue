import { defineComponent } from 'vue';
import { ConfigProvider } from 'ant-design-vue';
import zhCN from 'ant-design-vue/es/locale/zh_CN';

export default defineComponent({
  render() {
    return (
      <ConfigProvider locale={zhCN}>
        <router-view />
      </ConfigProvider>
    );
  },
});
