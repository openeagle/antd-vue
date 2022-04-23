import { App, Plugin } from 'vue';
import VideoUploader from './VideoUploader';

VideoUploader.install = function(app: App) {
  app.component(VideoUploader.name, VideoUploader);
  return app;
};

export * from './VideoUploader';

export default VideoUploader as typeof VideoUploader & Plugin;
