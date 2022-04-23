import { createApp } from 'vue';
import 'ant-design-vue/dist/antd.css';
import '@/style';
import router from './router';
import App from './App';
import './global.less';

createApp(App)
  .use(router)
  .mount('#app');
