import { App } from 'vue';

import { default as AdminLayout } from './components/AdminLayout';
import { default as AdminSearch } from './components/AdminSearch';
import { default as ImageUploader } from './components/ImageUploader';
import { default as Loader } from './components/Loader';
import { default as NumberText } from './components/NumberText';
import { default as RemoteSelect } from './components/RemoteSelect';
import { default as SearchSelect } from './components/SearchSelect';
import { default as Uploader } from './components/Uploader';
import { default as URLImageUploader } from './components/URLImageUploader';
import { default as URLVideoUploader } from './components/URLVideoUploader';
import { default as VideoUploader } from './components/VideoUploader';
import { default as WeekTime } from './components/WeekTime';
import { default as AddressSelect } from './components/AddressSelect';
import { default as CountDown } from './components/CountDown';
import { default as AddressDetail } from './components/AddressDetail';
import { default as Catpcha } from './components/Catpcha';
import { default as BasicForm } from './components/Form';
import { default as AddressTreeSelect } from './components/AddressTreeSelect';
import { default as MixCheck } from './components/MixCheck';
import { default as Tinymce } from './components/Tinymce';

const components = [
  AdminLayout,
  AdminSearch,
  ImageUploader,
  Loader,
  VideoUploader,
  NumberText,
  RemoteSelect,
  SearchSelect,
  Uploader,
  URLImageUploader,
  URLVideoUploader,
  WeekTime,
  AddressSelect,
  CountDown,
  AddressDetail,
  Catpcha,
  BasicForm,
  AddressTreeSelect,
  MixCheck,
  Tinymce,
];

const install = (app: App): App => {
  components.forEach((component) => {
    app.use(component);
  });
  return app;
};

export {
  AdminLayout,
  AdminSearch,
  ImageUploader,
  Loader,
  VideoUploader,
  NumberText,
  RemoteSelect,
  SearchSelect,
  Uploader,
  URLImageUploader,
  URLVideoUploader,
  WeekTime,
  AddressSelect,
  CountDown,
  AddressDetail,
  Catpcha,
  BasicForm,
  AddressTreeSelect,
  MixCheck,
  Tinymce,
};

export { default as config } from './config';
export { default as useModal } from './hooks/useModal';
export { default as useRequest } from './hooks/useRequest';
export { default as useTabRouter } from './hooks/useTabRouter';
export { default as createRequest } from './utils/createRequest';
export { default as createRouter } from './utils/createRouter';

export default {
  install,
};
