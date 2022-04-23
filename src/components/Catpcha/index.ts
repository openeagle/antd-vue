import { App, Plugin } from 'vue';
import Catpcha from './Catpcha';

Catpcha.install = function(app: App) {
  app.component(Catpcha.name, Catpcha);
  return app;
};

export default Catpcha as typeof Catpcha & Plugin;
