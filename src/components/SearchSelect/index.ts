import { App, Plugin } from 'vue';
import SearchSelect from './SearchSelect';

SearchSelect.install = function(app: App) {
  app.component(SearchSelect.name, SearchSelect);
  return app;
};

export * from './SearchSelect';

export default SearchSelect as typeof SearchSelect & Plugin;
