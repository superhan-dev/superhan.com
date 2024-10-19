import { hashPassword, verifyPassword } from '../helpers/encrypt.helper';

describe('Password hashing and verification', () => {
  it('should hash a password and verify it correctly', () => {
    const password = 'MySecretPassword';

    // 비밀번호 해싱
    const { salt, hash } = hashPassword(password);

    // 해싱된 비밀번호와 salt가 생성되었는지 확인
    expect(salt).toBeDefined();
    expect(hash).toBeDefined();

    // 비밀번호 검증
    const isValid = verifyPassword(password, hash, salt);
    expect(isValid).toBe(true);
  });

  it('should not verify an incorrect password', () => {
    const password = 'MySecretPassword';
    const wrongPassword = 'WrongPassword';

    // 비밀번호 해싱
    const { salt, hash } = hashPassword(password);

    // 잘못된 비밀번호 검증
    const isValid = verifyPassword(wrongPassword, hash, salt);
    expect(isValid).toBe(false);
  });

  it('should return different hashes for the same password with different salts', () => {
    const password = 'MySecretPassword';

    // 동일한 비밀번호로 두 번 해시
    const { salt: salt1, hash: hash1 } = hashPassword(password);
    const { salt: salt2, hash: hash2 } = hashPassword(password);

    // 다른 salt로 해싱된 값이 달라야 함
    expect(salt1).not.toBe(salt2);
    expect(hash1).not.toBe(hash2);
  });
});
