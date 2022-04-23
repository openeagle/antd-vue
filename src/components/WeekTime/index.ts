import { App, Plugin } from 'vue';
import WeekTime from './WeekTime';

WeekTime.install = function(app: App) {
  app.component(WeekTime.name, WeekTime);
  return app;
};

export default WeekTime as typeof WeekTime & Plugin;
