import { App, Plugin } from 'vue';
import ImageUploader from './ImageUploader';

ImageUploader.install = function(app: App) {
  app.component(ImageUploader.name, ImageUploader);
  return app;
};

export * from './ImageUploader';

export default ImageUploader as typeof ImageUploader & Plugin;
