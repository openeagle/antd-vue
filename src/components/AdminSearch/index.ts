import { App, Plugin } from 'vue';
import AdminSearch from './AdminSearch';

AdminSearch.install = function(app: App) {
  app.component(AdminSearch.name, AdminSearch);
  app.component(AdminSearch.SearchForm.name, AdminSearch.SearchForm);
  app.component(AdminSearch.SearchTable.name, AdminSearch.SearchTable);
  return app;
};

export * from './typings';

export default AdminSearch as typeof AdminSearch & Plugin;
