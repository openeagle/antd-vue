import { App, Plugin } from 'vue';
import RemoteSelect from './RemoteSelect';

RemoteSelect.install = function(app: App) {
  app.component(RemoteSelect.name, RemoteSelect);
  return app;
};

export * from './RemoteSelect';

export default RemoteSelect as typeof RemoteSelect & Plugin;
