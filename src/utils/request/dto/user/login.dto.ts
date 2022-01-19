/**
 * 用户登录
 */
 import {
  IsDefined,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  ValidateNested,
} from 'class-validator';
import { Expose, Type } from 'class-transformer';
import { RequestMethod } from '@/src/utils/request';
import { BaseApiDto } from '../base-api.dto';
import { BaseResponseDto } from '../base-response.dto';

export class LogInReqDataDto {
  @Expose()
  @IsOptional()
  @IsString()
  declare hw_openid?: string;

  @IsOptional()
  @IsString()
  declare code?: string;


  @IsOptional()
  @IsString()
  declare iv?: string;

  @IsOptional()
  @IsString()
  declare encryptedData?: string;
}

export class LoginResDataDto {
  /**
   * 是否上传问卷标记
   */
  @IsDefined()
  @IsString()
  @IsNotEmpty()
  declare question_flag: string;

  /**
   * 0 普通用户 1管理员/顾问 2代理
   */
  @IsDefined()
  @IsNumber()
  declare role: number;
}

export class LoginResDto extends BaseResponseDto {
  @ValidateNested()
  @Type(() => LoginResDataDto)
  declare data: LoginResDataDto;
}

export class UserLoginApiDto extends BaseApiDto {
  url = '/open_api/third/xcx_third_login';

  method = RequestMethod.POST;

  reqDataDto = LogInReqDataDto;

  resDataDto = LoginResDto;
}

export default {};
