import { App, Plugin } from 'vue';
import MixCheck from './MixCheck';

MixCheck.install = function(app: App) {
  app.component(MixCheck.name, MixCheck);
  app.component(MixCheck.RadioItem.name, MixCheck.RadioItem);
  app.component(MixCheck.CheckItem.name, MixCheck.CheckItem);
  return app;
};

export default MixCheck as typeof MixCheck & Plugin;
