let BASE_API = '';

switch (process.env.VUE_APP_ENV) {
  case 'mock':
    BASE_API = 'https://ip.cn';
    break;
  case 'dev':
    BASE_API = 'https://ip.cn';
    break;
  case 'alpha':
    BASE_API = 'https://ip.cn';
    break;
  case 'rc':
    BASE_API = 'https://ip.cn';
    break;
  case 'prod':
  default:
    BASE_API = 'https://ip.cn';
    break;
}

export { BASE_API };

export default { BASE_API };
