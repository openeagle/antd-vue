import { App, Plugin } from 'vue';
import BasicForm from './BasicForm';

BasicForm.install = function(app: App) {
  app.component(BasicForm.name, BasicForm);
  return app;
};

export * from './BasicForm';
export * from './types/form';
export * from './hooks/useAdvanced';
export * from './hooks/useAutoFocus';
export * from './hooks/useFormContext';
export * from './hooks/useFormEvents';
export * from './hooks/useFormValues';
export * from './hooks/useLabelWidth';
export * from './hooks/useForm';
export default BasicForm as typeof BasicForm & Plugin;
