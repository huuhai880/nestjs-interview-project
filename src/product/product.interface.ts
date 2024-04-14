import { Products } from "./entities/product.entity";

export interface ProductsInterface {
    productLists: Products[],
    total: number,
    currentPage: number,
    nextPage: number,
    prevPage: number,
    lastPage: number
}