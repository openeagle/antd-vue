import 'core-js/modules/web.url-search-params.js';
import eaxios, { EaxiosRequestConfig, EaxiosInstance } from '@openeagle/eaxios';
import { message } from 'ant-design-vue';
import config from '../config';

export interface ResponseCodeConfig {
  ignore?: string[]; // 忽略
  confirm?: string[]; // 确认
  logout?: string[]; // 登录失效
  success?: string; // 请求成功
}

export const defaultResponseCode = {
  logout: [],
  success: '10000',
};

const createRequest = (
  options: EaxiosRequestConfig & {
    responseCode?: ResponseCodeConfig;
  },
): EaxiosInstance => {
  const { responseCode = defaultResponseCode, ...requestConfig } =
    options || {};
  const request = eaxios.create({
    timeout: 30000,
    transformResponse: [
      function(data, response) {
        if (typeof data === 'object') {
          const code = String(data.returncode || data.code);
          if (code === (responseCode?.success || defaultResponseCode.success)) {
            return data.body;
          } else {
            throw eaxios.createError(data.message, code, response);
          }
        } else {
          throw eaxios.createError(
            data,
            response?.config?.responseError?.SERVER_ERROR || 'SERVER_ERROR',
            response,
          );
        }
      },
    ],
    ...requestConfig,
  });

  request.interceptors.response.use(
    function(response) {
      return response;
    },
    function(error) {
      if (error && error.code) {
        if (error.code === 'UNKNOWN') {
          message.error('未知错误');
        } else if (error.code === 'REQUEST_OFFLINE') {
          message.error('网络异常，请求失败了');
        } else if (error.code === 'REQUEST_TIMEOUT') {
          message.error('网络有点慢，请求超时了');
        } else if (error.code === 'SERVER_ERROR') {
          message.error('系统故障，请稍后再试');
        } else if (error.code === 'RESPONSE_INVALID') {
          message.error('系统出错，请求失败了');
        } else if (
          (responseCode?.logout || defaultResponseCode.logout).indexOf(
            error.code,
          ) >= 0
        ) {
          window.dispatchEvent(new Event(config.EVENT_LOGOUT));
        } else if (error?.config && error.config?.shouldMessageShow !== false) {
          message.error(error.message || '未知错误');
        }
      }
      throw error;
    },
  );
  return request;
};

export default createRequest;
