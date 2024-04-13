import { Injectable } from "@nestjs/common";

@Injectable()
export class ProductsService{

   
  findAllProducts(): string {
    return 'This action returns all product';
  }

 
  createProduct(): string {
    return "create products"
  }

  
  findDetailProduct():string {
    return "this detail for product"
  }

  
  updateProduct(): string {
    return "this update detail for product"
  }

  
  deleteProduct(): string {
    
    return `this delete product with id:`
  }
}