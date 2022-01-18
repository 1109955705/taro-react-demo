import { request, showLoading, hideLoading } from '@tarojs/taro';
import { v4 as uuidv4 } from 'uuid';


/**
 * 
 */
const requestInterceptor = async ({}) => {

}

const requestExecutor = async () => {
  const requestId = uuidv4();
  logger.realtimeLogger.log('[request]', `[requestId: ${requestId}]`, ...args);
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  const result = await request(...args);
  logger.realtimeLogger.log('[response]', `[requestId: ${requestId}]`, result);
}
/**
 * 
 */
const responseInterceptor = async ({}) => {

}

/**
 * 
 * @param Dto 
 * @param data 
 * @param config 
 */
const sendHttpRequest = async (
  dto: any,
  data: any,
  config: {
    showLoading?: boolean;
    loadingText?: string;
    throwError?: boolean;
    onError?(err: any, throwError: () => any): any;
  } = {}
) => {

  if (config.showLoading) {
    if (config.loadingText) {
      showLoading({
        title: config.loadingText,
      });
    } else {
      showLoading();
    }
  }

  try {
    const requestParams = await requestInterceptor({dto, data});

    const response = await requestExecutor(requestParams);
  
    const result = await responseInterceptor({
      ...request,
      response,
    });
  } catch (error){
    throw error;
  }

}