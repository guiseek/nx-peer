import { Logger, ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module';

async function server() {
  const port = process.env.PORT || 3000;
  const prefix = process.env.PREFIX || 'api';

  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe());
  app.setGlobalPrefix(prefix);

  const options = new DocumentBuilder()
    .setTitle('nx-peer')
    .setDescription('Real Time Connection')
    .setVersion('0.0.1')
    .setLicense('GNU GPLv3', 'https://www.gnu.org/licenses/gpl-3.0.md')
    .setContact(
      'Guilherme Siquinelli',
      'https://guiseek.dev',
      'email@guiseek.dev'
    )
    .build();
  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup(prefix, app, document);

  await app.listen(port, () => {
    Logger.log(`http://localhost:${port}/${prefix}`, 'Listening');
  });
}

server();
