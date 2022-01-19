/**
 * 服务器返回的数据结构
 */
 import { IsOptional, IsString } from 'class-validator';

 export class BaseResponseDto {
   @IsString()
   declare code: string;
 
   @IsOptional()
   declare errcode?: string;
 
   @IsOptional()
   @IsString()
   declare msg: string;
 
   declare data: any;
 }

 