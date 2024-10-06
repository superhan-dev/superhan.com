import * as crypto from 'crypto';

// 비밀번호를 해시화 하는 함수
export const hashPassword = (
  password: string
): { salt: string; hash: string } => {
  // salt 생성
  const salt = crypto.randomBytes(16).toString('hex');

  // 해시 함수 생성
  const hash = crypto
    .pbkdf2Sync(password, salt, 1000, 64, 'sha512')
    .toString('hex');

  return { salt, hash };
};

export const verifyPassword = (
  password: string,
  hash: string, // 저장된 해시값 (이미 hex로 인코딩된 문자열)
  salt: string // 저장된 salt 값 (base64 또는 hex로 인코딩된 문자열)
): boolean => {
  // 입력된 비밀번호와 salt로 다시 해시값을 계산 (hex로 변환)
  const hashVerify = crypto
    .pbkdf2Sync(password, salt, 1000, 64, 'sha512') // Buffer 반환
    .toString('hex'); // hex 문자열로 변환

  // 저장된 해시와 다시 계산한 해시를 비교
  return hash === hashVerify; // 둘 다 hex 문자열이므로 비교 가능
};
