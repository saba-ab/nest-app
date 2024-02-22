import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { UserLoggerMiddleware } from './user-logger/user-logger.middleware';
import { UserGuard } from './guards/user.guard';
async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  // app.use(new UserLoggerMiddleware().use);
  // app.useGlobalGuards(new UserGuard());

  await app.listen(3000);
}
bootstrap();
