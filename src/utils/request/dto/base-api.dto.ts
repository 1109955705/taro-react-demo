import { validate, isURL} from 'class-validator';
import { plainToClass, plainToInstance } from 'class-transformer';
import { isEmpty } from 'lodash';
import  { RequestMethod } from '../index';

export class ApiDto {
  baseUrl = '';
  url = '';
  header = {}
  method: RequestMethod = RequestMethod.GET;
  dataType: 'json' | string = 'json';
  responseType: 'text' | 'arraybuffer' | string;
  version = '';
  extendHeader = {};
  reqExtendData = {};
  reqDataDto =  class {};
  resDataDto = class {};
  reqDataClassTransformOptions = { excludeExtraneousValues: true };
  resDataClassTransformOptions = { excludeExtraneousValues: true };
  async buildRequestParams(
    data: any,
    config: any
  ): Promise<any> {
    console.log('buildRequestParams:data', data)
    let { url } = this;
    let $data = data || {};

    if (!isURL(this.url)) {
      url = this.baseUrl + this.url;
    }
    
    if (Object.keys(this.reqDataDto)) {
      console.log('1111111', $data)
      $data = plainToInstance(this.reqDataDto, $data, this.reqDataClassTransformOptions);
      console.log('2222222', $data)
      const errors = await validate($data);
      console.log('validate:error', errors)
      if (errors.length > 0) {
        throw new Error('Validate request-data DTO failed.',);
      }
    }
    $data = { ...this.reqExtendData, ...$data };


    const header = { ...this.extendHeader, ...(this.header || {}) };

    return {
      url,
      method: this.method,
      data: $data,
      header,
      dataType: this.dataType,
      responseType: this.responseType,
      timeout: config.timeout,
    };
  }

  async buildResponseData(
    response: any,
    config: any
  ): Promise<any> {
    let $data = response.data;

    if (typeof $data === 'object' && this.resDataDto) {
      $data = plainToInstance(this.resDataDto, $data || {}, this.resDataClassTransformOptions);
      const errors = await validate($data as any);
      if (errors.length > 0) {
        throw new Error('Validate request-data DTO failed.',);
      }
    }

    return $data;
  }
}


export class BaseApiDto extends ApiDto {
  baseUrl = 'http://sit.third-api.yolanda.hk';

  header: Record<string, string> = {
    Authorization: 'Bear xxxxx',
  };

  reqExtendData: Record<string, unknown> = {
    h5_version: '1.0.0',
  };
}
