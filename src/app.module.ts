import { Module } from '@nestjs/common';
import {ConfigService } from '@nestjs/config';
import { TypeOrmModule, TypeOrmModuleOptions } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ProductModule } from './products/product.module';
import { dataSourceOptions } from './config/database/data-source';

@Module({
  imports: [
    TypeOrmModule.forRoot(dataSourceOptions),
    ProductModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {};

