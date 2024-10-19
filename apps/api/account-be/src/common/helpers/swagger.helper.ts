import { INestApplication } from '@nestjs/common';
import {
  DocumentBuilder,
  // SwaggerCustomOptions,
  SwaggerModule,
} from '@nestjs/swagger';

//웹 페이지를 새로고침을 해도 Token 값 유지
// const swaggerCustomOptions: SwaggerCustomOptions = {
//   swaggerOptions: {
//     persistAuthorization: true,
//   },
// };

/**
 * @author Ryan
 * @description Swagger 세팅
 */
export function setupSwagger(app: INestApplication): void {
  const config = new DocumentBuilder()
    .setTitle('Account API Documentation')
    .setDescription('The API description')
    .setVersion('1.0.0')
    .addTag('api')
    .addBearerAuth(
      {
        type: 'http',
        scheme: 'bearer',
        bearerFormat: 'JWT',
        name: 'JWT',
        description: 'Enter JWT Token',
        in: 'header',
      },
      'accessToken'
    )
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('doc', app, document);
}
