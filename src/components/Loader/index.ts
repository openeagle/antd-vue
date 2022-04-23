import { App, Plugin } from 'vue';
import Loader from './Loader';

Loader.install = function(app: App) {
  app.component(Loader.name, Loader);
  return app;
};

export * from './Loader';

export default Loader as typeof Loader & Plugin;
