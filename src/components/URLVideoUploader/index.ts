import { App, Plugin } from 'vue';
import URLVideoUploader from './URLVideoUploader';

URLVideoUploader.install = function(app: App) {
  app.component(URLVideoUploader.name, URLVideoUploader);
  return app;
};

export * from './URLVideoUploader';

export default URLVideoUploader as typeof URLVideoUploader & Plugin;
