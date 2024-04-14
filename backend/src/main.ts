declare const module: any;
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { WinstonModule } from 'nest-winston';
import { CustomLoggerService } from './config/logger/winston-logger'

async function bootstrap() {

  const customLoggerService = new CustomLoggerService();
  const app = await NestFactory.create(AppModule, {
    logger: WinstonModule.createLogger(customLoggerService.createLoggerConfig)
  });
  app.enableCors({
    origin: 'http://localhost:5173', // Allow only requests from this origin
    methods: ['GET', 'POST','PUT', 'DELETE'], // Allow only GET and POST requests
  });
  await app.listen(3000);
  if (module.hot) {
    module.hot.accept();
    module.hot.dispose(() => app.close());
  }
}
bootstrap();
