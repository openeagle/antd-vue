import { App, Plugin } from 'vue';
import AddressTreeSelect from './AddressTreeSelect';

AddressTreeSelect.install = function(app: App) {
  app.component(AddressTreeSelect.name, AddressTreeSelect);
  return app;
};

export default AddressTreeSelect as typeof AddressTreeSelect & Plugin;
