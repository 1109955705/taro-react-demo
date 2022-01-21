import { request, showLoading, hideLoading } from '@tarojs/taro';
import { plainToClass } from 'class-transformer';
import { validate } from 'class-validator';
import logger from '../logger';

function uuid() {
  const template = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx';
  const xAndYOnly = /[xy]/g;

  return template.replace(xAndYOnly, (character) => {
      const randomNo =  Math.floor(Math.random() * 16);
      const newValue = character === 'x' ? randomNo : (randomNo & 0x3) | 0x8;

      return newValue.toString(16);
  });
}

export enum RequestMethod {
  GET = 'GET',
  POST = 'POST',
  PUT = 'PUT',
  PATCH = 'PATCH',
  DELETE = 'DELETE',
  OPTIONS = 'OPTIONS',
  TRACE = 'TRACE',
  CONNECT = 'CONNECT',
}

/**
 * 
 */
const requestInterceptor = async (params) => {
  const { api, data, config } = params;

  const requestParams = await api.buildRequestParams(data, config);
  console.log("requestInterceptor", requestParams)
  return requestParams;

  
  // 校验参数

  // 拼装参数

}

const requestExecutor = async (args: any) => {
  const requestId = uuid();
  logger.realtimeLogger.log('[request]', `[requestId: ${requestId}]`);
  return
  const result = await request({...args});

  logger.realtimeLogger.log('[response]', `[requestId: ${requestId}]`, result);
  return result
}
/**
 * 
 */
const responseInterceptor = async (params) => {
  // 校验
  console.log('requestInterceptor', params)
  return params
}

/**
 * 
 * @param Dto 
 * @param data 
 * @param config 
 */
export const sendHttpRequest = async (
  Dto: any,
  data: any,
  config: {
    showLoading?: boolean;
    loadingText?: string;
    throwError?: boolean;
    onError?(err: any, throwError: () => any): any;
  } = {}
) => {
  console.log('sendHttpRequest', data)
  if (config.showLoading) {
    if (config.loadingText) {
      showLoading({
        title: config.loadingText,
      });
    } else {
      showLoading();
    }
  }

  const api = new Dto();
  console.log('sendHttpRequest:api', api)
  try {
    const requestParams = await requestInterceptor({api, data, config});

    const response = await requestExecutor(requestParams);
  
    const result = await responseInterceptor({
      ...request,
      response,
    });

    return result
  } catch (error){
    throw error;
  }

}
