import { Controller, Delete, Get, HttpStatus, Post, Put } from '@nestjs/common';
import { ProductsService } from './products.service';
import { ResponseDataClass } from 'src/common/constants/response.constant';
import { HttpMessage } from 'src/common/constants/enum.constant';

@Controller('products')
export class ProductsController {

  constructor(private readonly productsService: ProductsService) { }

  @Get()
  async findAllProducts(): Promise<ResponseDataClass<string>> {
    try {
      return new ResponseDataClass<string>(this.productsService.findAllProducts(), HttpStatus.OK, HttpMessage.OK);
    } catch (error) {

      console.log(error)

      return new ResponseDataClass<string>(null, HttpStatus.NOT_FOUND, HttpMessage.NOT_FOUND, error);
    }
  }

  @Post()
  async createProduct(): Promise<ResponseDataClass<string>> {

    try {
      return new ResponseDataClass<string>(this.productsService.createProduct(), HttpStatus.OK, HttpMessage.OK);
    } catch (error) {
      return new ResponseDataClass<string>(null, HttpStatus.NOT_FOUND, HttpMessage.NOT_FOUND, error);
    }
  }

  @Get('/:id')
  async findDetailProduct(): Promise<ResponseDataClass<string>> {

    try {
      return new ResponseDataClass<string>(this.productsService.findDetailProduct(), HttpStatus.OK, HttpMessage.OK);
    } catch (error) {
      return new ResponseDataClass<string>(null, HttpStatus.NOT_FOUND, HttpMessage.NOT_FOUND, error);
    }
  }

  @Put('/:id')
  async updateProduct(): Promise<ResponseDataClass<string>> {

    try {
      return new ResponseDataClass<string>(this.productsService.updateProduct(), HttpStatus.OK, HttpMessage.OK);
    } catch (error) {
      return new ResponseDataClass<string>(null, HttpStatus.NOT_FOUND, HttpMessage.NOT_FOUND, error);
    }
  }

  @Delete('/:id')
  async deleteProduct(): Promise<ResponseDataClass<string>> {

    try {
      return new ResponseDataClass<string>(this.productsService.deleteProduct(), HttpStatus.OK, HttpMessage.OK);
    } catch (error) {
      return new ResponseDataClass<string>(null, HttpStatus.NOT_FOUND, HttpMessage.NOT_FOUND, error);
    }
  }

}