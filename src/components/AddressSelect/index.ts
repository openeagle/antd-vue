import { App, Plugin } from 'vue';
import AddressSelect from './AddressSelect';

AddressSelect.install = function(app: App) {
  app.component(AddressSelect.name, AddressSelect);
  return app;
};

export default AddressSelect as typeof AddressSelect & Plugin;
