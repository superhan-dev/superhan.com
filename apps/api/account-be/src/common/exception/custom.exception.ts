import { HttpException } from '@nestjs/common';
import { ErrorEnum } from './data/error.enum';
import { CUSTOM_RESPONSE } from './data/error.response';

export class CustomException extends HttpException {
  constructor(errorCode: ErrorEnum) {
    const { message, statusCode } = CUSTOM_RESPONSE[errorCode];
    super(message, statusCode);
  }
}
