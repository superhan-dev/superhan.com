## Document

elypecs solution 계정 관리 서버 프로젝트 별 계정을 생성하고 관리 할 수 있으며
로그인 시 API를 호출하여 인가된 계정인지 확인할 수 있다.

자세한 기능은 swagger를 통해 확인할 수 있도록 설계한다.

## Project setup

```bash
$ pnpm --filter @configs/winston-logger build
$ pnpm install
```

## Compile and run the project

```bash
# development
$ pnpm --filter es-account-be start:dev

# production mode
$ pnpm --filter es-account-be start:prod
```

## Run tests

```bash
# unit tests
$ pnpm run test

# e2e tests
$ pnpm run test:e2e

# test coverage
$ pnpm run test:cov
```

## flow

### 로그인

1. 로그인 정보 요청
2. 사용자 정보 인증 ->
3. access token, refresh token 발급 ->
4. 발급된 refresh token 저장 ->
5. 저장 후 http only cookie를 사용하여 access token 과 refresh token을
   사용자에게 전달

### 사용자 요청

1. access token 유효성 검사 1.1. 토큰 유효시 -> 요청 사항 처리 후 응답 1.2. 토큰
   만료시 -> 1.2.1. refresh token 유효성 검사 1.2.1.1. refresh token 유효시 ->
   access token을 재발급 하여 요청 사항 처리 후 반환 1.2.1.2. refresh token
   유효하지 않을 시 -> DB에 저장된 refresh token을 파기 하고 로그아웃 처리
   되도록 하여 재 로그인 유도

## Login

1. 로그인시 사용되는 사용자 정보

- LoginRequestDto

  - username
  - password
  - projectName
  - roleName

- Refresh Token secret과 access token secret은 환경변수로 설정한다.
- REFRESH_JWT_SECRET 을 사용하여

- 1.1. 사용자 정보를 받아 사용자를 검증한다.
- 1.1.1. APP_GUARD 를 설정하여 모든 API에서 JWT 인증을 실행하도록 한다.
- 1.1.2.

- 1.2. 사용자 검증에 성공하면 accountId 와 accessToken, refreshToken을 반환한다.
- 1.1.2.

2.  AuthController AuthGuard를 상황별로 다른 Guard를 사용한다.

- 2.1. LocalAuthGuard
  - 초기 로그인과 refresh token만료시 사용한다.
- 2.2. RefreshJwtAuthGuard
  - accessToken이 만료되면 사용하여 accessToken을 재발급시 사용한다.
- 2.3. JwtAuthGuard
  - accessToken을 사용하여 유효하다면 요청을 처리할 수 있는 곳에 사용된다.
    - 로그아웃 기능
      - 로그아웃을 할 수 있는 유효한 토큰을 가지고있는 사용자만 로그아웃을 할 수
        있다.

3.
