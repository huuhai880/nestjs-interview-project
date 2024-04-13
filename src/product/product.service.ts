import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { Products } from "./entities/product.entity";
import { CreateProductDto } from "./dto/create-product.dto";
import { InjectRepository } from "@nestjs/typeorm";
import { DeleteResult, Like, Repository, UpdateResult } from "typeorm";
import { FilterProductDto } from "./dto/filter-product.dto";
import { PageConfig } from "src/common";
import { UpdateProductDto } from "./dto/update-product.dto";

@Injectable()
export class ProductsService {

  constructor(@InjectRepository(Products) private productRepository: Repository<Products>) { }

  async findAllProducts(query: FilterProductDto): Promise<any> {

    const items_per_page = Number(query.items_per_page) || PageConfig.ITEMS_PER_PAGE;
    const page = Number(query.page) || PageConfig.DEFAULT_PAGE;
    const product_name = query.product_name || "";

    const skip = (page - 1) * items_per_page;
    const [res, total] = await this.productRepository.findAndCount({
      where: [
        {
          product_name: Like('%' + product_name + '%')

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
        category_id: true

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
  }


  async createProduct(createProductDto: CreateProductDto): Promise<Products> {

    try {
      const res = await this.productRepository.save(createProductDto)

      return await this.productRepository.findOneBy({ id: res?.id });
    } catch (error) {

      throw new HttpException(error, HttpStatus.BAD_REQUEST);
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
    return await this.productRepository.update(id, updateProductDto)
  }


  async delete(id: number): Promise<DeleteResult> {
    return await this.productRepository.delete(id);
  }
}