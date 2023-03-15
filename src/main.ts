import { Logger,ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const projectName = process.env.PROJECT_NAME || "Project"
  const config = new DocumentBuilder()
    .setTitle(`${projectName} API`)
    .setDescription(`${projectName} API Documentation`)
    .setVersion('1.0')
    .addBearerAuth()
    .addServer('http://')
    .addServer('https://')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('', app, document, {
    swaggerOptions: {
      persistAuthorization: true,
      displayRequestDuration: true,
      filter: true,
      syntaxHighlight: true,
      'syntaxHighlight.activate': true,
      'syntaxHighlight.theme': 'darkula',
    },
  });

  app.useGlobalPipes(new ValidationPipe());
  Logger.log(`${process.env.PORT}`)
  await app.listen(9005);
}
bootstrap();
