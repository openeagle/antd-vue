import { App, Plugin } from 'vue';
import Uploader from './Uploader';

Uploader.install = function(app: App) {
  app.component(Uploader.name, Uploader);
  return app;
};

export * from './Uploader';

export default Uploader as typeof Uploader & Plugin;
