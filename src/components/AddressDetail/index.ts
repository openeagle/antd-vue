import { App, Plugin } from 'vue';
import AddressDetail from './AddressDetail';


AddressDetail.install = function(app: App) {
  app.component(AddressDetail.name, AddressDetail);
  return app;
};

export * from './AddressDetail'
export default AddressDetail as typeof AddressDetail & Plugin;
