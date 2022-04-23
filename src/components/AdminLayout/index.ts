import { App, Plugin } from 'vue';
import AdminLayout from './components/AdminLayout';

AdminLayout.install = function(app: App) {
  app.component(AdminLayout.name, AdminLayout);
  app.component(AdminLayout.FooterToolbar.name, AdminLayout.FooterToolbar);
  app.component(AdminLayout.PageContainer.name, AdminLayout.PageContainer);
  app.component(AdminLayout.PageLoading.name, AdminLayout.PageLoading);
  app.component(AdminLayout.RightContent.name, AdminLayout.RightContent);
  return app;
};

export * from './typings';

export default AdminLayout as typeof AdminLayout & Plugin;
