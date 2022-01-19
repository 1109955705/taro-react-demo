import { request, showLoading, hideLoading } from '@tarojs/taro';
import { plainToClass } from 'class-transformer';
import { validate } from 'class-validator';
import { v4 as uuidv4 } from 'uuid';
import logger from '../logger';

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

  console.log('requestInterceptor', params)
  // 校验参数

  // 拼装参数
  return params

}

const requestExecutor = async (args: any) => {
  const requestId = uuidv4();
  logger.realtimeLogger.log('[request]', `[requestId: ${requestId}]`, ...args);

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
  console.log('sendHttpRequest', Dto, data, config)
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
  const errors = await validate(api);
  if (errors.length > 0) {
    throw new Error('Validate API DTO failed');
  }

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
