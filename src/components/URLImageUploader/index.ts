import { App, Plugin } from 'vue';
import URLImageUploader from './URLImageUploader';

URLImageUploader.install = function(app: App) {
  app.component(URLImageUploader.name, URLImageUploader);
  return app;
};

export * from './URLImageUploader';

export default URLImageUploader as typeof URLImageUploader & Plugin;
