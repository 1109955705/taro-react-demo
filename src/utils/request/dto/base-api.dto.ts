import { validate, isURL} from 'class-validator';
import { plainToClass, plainToInstance } from 'class-transformer';
import _ from 'lodash';
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
  reqDataClassTransformOptions = { excludeExtraneousValues: true }
  async buildRequestParams(
    data: any,
    config: any
  ): Promise<any> {
    let { url } = this;
    let $data = data;

    $data = $data || {};

    if (!isURL(this.url)) {
      url = this.baseUrl + this.url;
    }

    if (!_.isEmpty(this.reqDataDto)) {
      $data = plainToInstance(this.reqDataDto, $data, this.reqDataClassTransformOptions);
      const errors = await validate($data);
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
    response: Response<InstanceType<this['resDataDto']>>,
    config: RequestConfig
  ): Promise<ResponseDataType<InstanceType<this['resDataDto']>>> {
    let $data = response.data;

    if (this.resDataTransformer) {
      $data = this.resDataTransformer({
        api: this,
        config,
        response,
      });
    }

    if (typeof $data === 'object' && this.resDataDto) {
      $data = plainToClass(this.resDataDto, $data || {}, this.resDataClassTransformOptions);
      const errors = await validate($data as any);
      if (errors.length > 0) {
        throw new ValidationException(
          'Validate response-data DTO failed.',
          errors,
          'response_data'
        );
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
