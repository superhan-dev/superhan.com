# monorepo

# layered architecture

## presentation layer

- controller
- dto
  - domain
    - request
    - response

## application layer

비즈니스 로직을 다루는 레이어로 다소 자유롭게 도메인으로 폴더를 생성해도 되고,
비즈니스로직 이름을 사용해도 될것으로 보여진다. 단, facade 패턴과 factory 패턴을
통해 결합도는 낮추되 의존성은 높이도록 하고 관심사를 최대한 한곳에 모아 중복되는
성격의 로직을 군집화 하려는 목적으로 만들었다.

도메인 서비스들을 적절하게 조합하여 사용하는 레이어이다.

- domain or any name of business logic
  - facade
  - factory
  - interface

## domain layer

## infrastructure layer

# references

- https://msolo021015.medium.com/layered-architecture-deep-dive-c0a5f5a9aa37
- https://junhyunny.github.io/architecture/pattern/layered-architecture/#google_vignette
