import { App, Plugin } from 'vue';
import CountDown from './CountDown';

CountDown.install = function(app: App) {
  app.component(CountDown.name, CountDown);
  return app;
};

export default CountDown as typeof CountDown & Plugin;
