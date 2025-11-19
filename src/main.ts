import 'dotenv/config';

import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module'; // <--- Impor yang benar

async function bootstrap() {
  // opsional: cek apakah env terbaca
  console.log('DEBUG DATABASE_URL:', process.env.DATABASE_URL);

  const app = await NestFactory.create(AppModule);
  await app.listen(3000);
}
bootstrap();
