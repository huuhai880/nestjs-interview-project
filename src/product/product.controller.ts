import { Body, Controller, Delete, Get, HttpStatus, Param, Post, Put, Query } from '@nestjs/common';
import { ProductsService } from './product.service';
import { ResponseDataClass } from 'src/common/constants/response.constant';
import { HttpMessage } from 'src/common';
import { Products } from './entities/product.entity';
import { CreateProductDto } from './dto/create-product.dto';
import { FilterProductDto } from './dto/filter-product.dto';
import { DeleteResult, UpdateResult } from 'typeorm';
import { UpdateProductDto } from './dto/update-product.dto';

@Controller('products')
export class ProductsController {

  constructor(private readonly productsService: ProductsService) { }

  @Get()
  async findAllProducts(@Query() filterProductDto: FilterProductDto): Promise<ResponseDataClass<any>> {
    try {
      return new ResponseDataClass<any>(await this.productsService.findAllProducts(filterProductDto), HttpStatus.OK, HttpMessage.OK);
    } catch (error) {
      return new ResponseDataClass<any>(null, HttpStatus.NOT_FOUND, HttpMessage.NOT_FOUND, error);
    }
  }

  @Post()
  async createProduct(@Body() createProductDto: CreateProductDto): Promise<ResponseDataClass<Products>> {

    try {
      return new ResponseDataClass<Products>(await this.productsService.createProduct(createProductDto), HttpStatus.OK, HttpMessage.OK);
    } catch (error) {
      return new ResponseDataClass<Products>(null, HttpStatus.NOT_FOUND, HttpMessage.NOT_FOUND, error);
    }
  }

  @Get('/:id')
  async findDetailProduct(@Param('id') id:number): Promise<ResponseDataClass<Products>> {

    try {
      return new ResponseDataClass<Products>(await this.productsService.findDetail(id), HttpStatus.OK, HttpMessage.OK);
    } catch (error) {
      return new ResponseDataClass<Products>(null, HttpStatus.NOT_FOUND, HttpMessage.NOT_FOUND, error);
    }
  }

  @Put('/:id')
  async updateProduct(@Param('id') id:number, @Body() updateProductDto: UpdateProductDto): Promise<ResponseDataClass<UpdateResult>> {

    try {
      return new ResponseDataClass<UpdateResult>(await this.productsService.update(id, updateProductDto), HttpStatus.OK, HttpMessage.OK);
    } catch (error) {
      return new ResponseDataClass<UpdateResult>(null, HttpStatus.NOT_FOUND, HttpMessage.NOT_FOUND, error);
    }
  }

  @Delete('/:id')
  async deleteProduct(@Param('id') id:number): Promise<ResponseDataClass<DeleteResult>> {

    try {
      return new ResponseDataClass<DeleteResult>(await this.productsService.delete(id), HttpStatus.OK, HttpMessage.OK);
    } catch (error) {
      return new ResponseDataClass<DeleteResult>(null, HttpStatus.NOT_FOUND, HttpMessage.NOT_FOUND, error);
    }
  }

}