import { App, Plugin } from 'vue';
import NumberText from './NumberText';

NumberText.install = function(app: App) {
  app.component(NumberText.name, NumberText);
  return app;
};

export * from './NumberText';

export default NumberText as typeof NumberText & Plugin;
