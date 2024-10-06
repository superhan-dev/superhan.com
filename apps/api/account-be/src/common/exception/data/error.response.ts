import { HttpStatus } from '@nestjs/common';
import { ErrorEnum } from './error.enum';

interface ErrorResponse {
  message: string;
  statusCode: HttpStatus;
}

export const CUSTOM_RESPONSE: Record<ErrorEnum, ErrorResponse> = {
  [ErrorEnum.BAD_REQUEST]: {
    message: '유효하지 않은 파라미터를 사용한 요청',
    statusCode: HttpStatus.BAD_REQUEST,
  },
  [ErrorEnum.LOG_CREATE_FAILED]: {
    message: '데이터베이스에 로그 생성 실패',
    statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
  },
  [ErrorEnum.PROJECT_CREATE_FAILED]: {
    message: '프로젝트 생성 실패',
    statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
  },
  [ErrorEnum.PROJECT_NOT_FOUND]: {
    message: '프로젝트 조회 실패',
    statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
  },
  [ErrorEnum.USER_CREATE_FAILED]: {
    message: '사용자 생성 실패',
    statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
  },
  [ErrorEnum.USER_NOT_FOUND]: {
    message: '사용자 조회 실패',
    statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
  },
  [ErrorEnum.USER_ALREADY_EXIST]: {
    message: '이미 존재하는 사용자',
    statusCode: HttpStatus.NOT_ACCEPTABLE,
  },
  [ErrorEnum.HASH_PASSWORD_CREATE_FAILED]: {
    message: '패스워드 등록 실패',
    statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
  },
  [ErrorEnum.HASH_PASSWORD_NOT_FOUND]: {
    message: '패스워드 조회 실패',
    statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
  },
  [ErrorEnum.PASSWORD_NOT_VALIDATED]: {
    message: '유효하지 않은 패스워드',
    statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
  },

  [ErrorEnum.ROLE_CREATE_FAILED]: {
    message: '사용자 Role 등록 실패',
    statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
  },
  [ErrorEnum.ROLE_NOT_FOUND]: {
    message: '등록되지 않은 사용자 Role',
    statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
  },

  [ErrorEnum.INSERT_DATA_FAILED]: {
    message: 'DATA Insert 실패',
    statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
  },
  [ErrorEnum.SELECT_DATA_FAILED]: {
    message: 'DATA Select 실패',
    statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
  },
  [ErrorEnum.TRANSACTION_FAILED]: {
    message: '트랜젝션 실행 실패',
    statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
  },
  [ErrorEnum.INVALIDATED_ACCOUNT]: {
    message: '유효하지 않은 계정',
    statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
  },
};
