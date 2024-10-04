import { HttpException } from '@nestjs/common';
import { ErrorCode } from '../constants/error.constant';
import { CUSTOM_RESPONSE } from './data/error.response';

export class CustomException extends HttpException {
  constructor(errorCode: ErrorCode) {
    const { message, statusCode } = CUSTOM_RESPONSE[errorCode];
    super(message, statusCode);
  }
}
