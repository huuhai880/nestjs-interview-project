import { Module } from "@nestjs/common";
import { ProductsController } from "./product.controller";
import { ProductsService } from "./product.service";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Products } from "./entities/product.entity";

@Module({
    imports:[TypeOrmModule.forFeature([Products])],
    controllers:[ProductsController],
    providers:[ProductsService]
})

export class ProductModule{};