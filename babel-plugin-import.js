const libraryName = '@openeagle/antd-vue';
const libraryDirectory = 'es';
const moduleExports = {
  hooks: ['useRequest', 'useTabRouter'],
  components: [
    'AddressDetail',
    'AddressSelect',
    'AddressTreeSelect',
    'AdminLayout',
    'AdminSearch',
    'Code',
    'CountDown',
    'ImageUploader',
    'Loader',
    'MixCheck',
    'NumberText',
    'RemoteSelect',
    'SearchSelect',
    'Tinymce',
    'URLImageUploader',
    'URLVideoUploader',
    'Uploader',
    'VideoUploader',
    'WeekTime',
  ],
  utils: ['createRequest', 'createRouter'],
};
const moduleMaps = Object.keys(moduleExports).reduce((rcc, key) => {
  moduleExports[key].forEach((item) => {
    rcc[item] = key;
  });
  return rcc;
}, {});
const styles = [
  'AddressTreeSelect',
  'AdminLayout',
  'AdminSearch',
  'Catpcha',
  'CountDown',
  'ImageUploader',
  'MixCheck',
  'Tinymce',
  'WeekTime',
  'createRouter',
]
  .map(
    (name) => `${libraryName}/${libraryDirectory}/${moduleMaps[name]}/${name}`,
  )
  .reduce((rcc, name) => {
    rcc[name] = true;
    return rcc;
  }, {});

module.exports = {
  libraryName,
  camel2DashComponentName: false,
  customName: (name) => {
    if (moduleMaps[name]) {
      return `${libraryName}/${libraryDirectory}/${moduleMaps[name]}/${name}`;
    }
    return `${libraryName}/${libraryDirectory}/${name}`;
  },
  style: (name) => {
    if (styles[name]) {
      return `${name}/style`;
    }
    return false;
  },
};
