# Document

Api gateway 는 서버별로 분리하여 요청을 하기 위해 사용하므로 api 서버별로 최상위
폴더를 구분한다. 최상위 폴더를 구분하고 그 하위에 presentation 영역과
application 영역을 구분할 수 있다.

모듈러 모놀리스와 레이어드 아키텍쳐를 함께 사용하는 방식으로 구현되었다.

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
