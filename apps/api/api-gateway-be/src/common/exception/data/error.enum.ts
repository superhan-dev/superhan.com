export enum ErrorEnum {
  BAD_REQUEST = 'BAD_REQUEST',
  LOG_CREATE_FAILED = 'LOG_CREATE_FAILED',

  USER_ALREADY_EXIST = 'USER_ALREADY_EXIST',
  USER_NOT_FOUND = 'USER_NOT_FOUND',

  PROJECT_CREATE_FAILED = 'PROJECT_CREATE_FAILED',
  PROJECT_UPDATE_FAILED = 'PROJECT_UPDATE_FAILED',
  PROJECT_DELETE_FAILED = 'PROJECT_DELETE_FAILED',
  USER_CREATE_FAILED = 'USER_CREATE_FAILED',
  ROLE_CREATE_FAILED = 'ROLE_CREATE_FAILED',
  ROLE_UPDATE_FAILED = 'ROLE_UPDATE_FAILED',
  ROLE_DELETE_FAILED = 'ROLE_DELETE_FAILED',
  ROLE_NOT_FOUND = 'ROLE_NOT_FOUND',

  HASH_PASSWORD_CREATE_FAILED = 'HASH_PASSWORD_CREATE_FAILED',
  HASH_PASSWORD_NOT_FOUND = 'HASH_PASSWORD_NOT_FOUND',
  PASSWORD_NOT_VALIDATED = 'PASSWORD_NOT_VALIDATED',

  INSERT_DATA_FAILED = 'INSERT_DATA_FAILED',
  SELECT_DATA_FAILED = 'SELECT_DATA_FAILED',
  TRANSACTION_FAILED = 'TRANSACTION_FAILED',

  PROJECT_NOT_FOUND = 'PROJECT_NOT_FOUND',

  USER_PROJECT_ROLE_NOT_FOUND='USER_PROJECT_ROLE_NOT_FOUND',

  INVALIDATED_ACCOUNT = 'INVALIDATED_ACCOUNT',
}
