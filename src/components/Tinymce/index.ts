import { App, Plugin } from 'vue';
import Tinymce from './Tinymce';

Tinymce.install = function(app: App) {
  app.component(Tinymce.name, Tinymce);
  return app;
};

export * from './Tinymce';

export default Tinymce as typeof Tinymce & Plugin;
