import { App, Plugin } from 'vue';
import BasicHelp from './BasicHelp';

BasicHelp.install = function(app: App) {
  app.component(BasicHelp.name, BasicHelp);
  return app;
};

export default BasicHelp as typeof BasicHelp & Plugin;
