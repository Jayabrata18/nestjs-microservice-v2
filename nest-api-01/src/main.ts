import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const port = 3001;
  await app.listen(port);
  console.log(`Api-Server is listening on http://localhost:${port}`);
}
bootstrap();
