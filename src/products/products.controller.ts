import { Controller, Delete, Get, Post, Put } from '@nestjs/common';

@Controller('products')
export class ProductsController {
  @Get()
  findAllProducts(): string {
    return 'This action returns all product';
  }

  @Post()
  createProduct(): string {
    return "create products"
  }

  @Get('/:id')
  findDetailProduct():string {
    return "this detail for product"
  }

  @Put('/:id')
  updateProduct(): string {
    return "this detail for product"
  }

  @Delete('/:id')
  deleteProduct(): string {
    return "this detail for product"
  }

}