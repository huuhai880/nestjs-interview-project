import { HttpException, HttpStatus, Injectable, Logger } from "@nestjs/common";
import { Products } from "./entities/product.entity";
import { CreateProductDto } from "./dto/create-product.dto";
import { InjectRepository } from "@nestjs/typeorm";
import { DeleteResult, IsNull, Like, Repository, UpdateResult } from "typeorm";
import { FilterProductDto } from "./dto/filter-product.dto";
import { PageConfig } from "src/common";
import { UpdateProductDto } from "./dto/update-product.dto";
import { ProductsInterface } from "./product.interface";

@Injectable()
export class ProductsService {

  private readonly logger = new Logger(ProductsService.name);

  constructor(@InjectRepository(Products) private readonly productRepository: Repository<Products>

  ) { }

  async findAllProducts(query: FilterProductDto): Promise<ProductsInterface> {

    try {

      const items_per_page = Number(query.items_per_page) || PageConfig.ITEMS_PER_PAGE;
      const page = Number(query.page) || PageConfig.DEFAULT_PAGE;
      const product_name = query.product_name || "";

      const skip = (page - 1) * items_per_page;
      const [res, total] = await this.productRepository.findAndCount({
        where: [
          {
            product_name: Like('%' + product_name + '%'),
            deleted_at: IsNull()

          }
        ],
        order: { created_at: 'DESC' },
        take: items_per_page,
        skip: skip,
        select: {
          id: true,
          product_name: true,
          price: true,
          type_of_product: true,
          category_id: true,
          user_created: true,
          deleted_at: true

        }
      })

      const lastPage = Math.ceil(total / items_per_page);
      const nextPage = page + 1 > lastPage ? null : page + 1;
      const prevPage = page - 1 < 1 ? null : page - 1;

      return {
        productLists: res,
        total,
        currentPage: page,
        nextPage,
        prevPage,
        lastPage
      }


    } catch (error) {

      this.logger.log({ level: "error", message: "This is Error level", err: error, errCustomCode: "20" });
      throw new HttpException(error?.message, HttpStatus.BAD_REQUEST);

    }


  }


  async createProduct(createProductDto: CreateProductDto): Promise<Products> {

    try {
      const res = await this.productRepository.save(createProductDto)

      return await this.productRepository.findOneBy({ id: res?.id });
    } catch (error) {

      this.logger.log({ level: "error", message: "This is Error level", err: error, errCustomCode: "20" });
      throw new HttpException(error?.message, HttpStatus.BAD_REQUEST);
    }
  }


  async findDetail(id: number): Promise<Products> {
    return await this.productRepository.findOne({
      where: { id },
      select: {
        id: true,
        product_name: true,
        price: true,
        type_of_product: true,
        category_id: true
      }
    })
  }

  async update(id: number, updateProductDto: UpdateProductDto): Promise<UpdateResult> {
    try {
      return await this.productRepository.update(id, { ...updateProductDto, user_updated: "admin" })
    } catch (error) {
      this.logger.log({ level: "error", message: "This is Error level", err: error, errCustomCode: "20" });
      throw new HttpException(error?.message, HttpStatus.BAD_REQUEST);
    }
  }


  async delete(id: number): Promise<DeleteResult> {
    try {
      return await this.productRepository.update(id, { deleted_at: new Date().toString(), user_deleted: 'admin' });
    } catch (error) {
      this.logger.log({ level: "error", message: "This is Error level", err: error, errCustomCode: "20" });
      throw new HttpException(error?.message, HttpStatus.BAD_REQUEST);
    }

  }
}