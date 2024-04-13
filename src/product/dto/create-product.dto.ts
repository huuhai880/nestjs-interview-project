import { IsNotEmpty, IsNumberString } from "class-validator";

export class CreateProductDto {
    @IsNotEmpty()
    product_name: string;

    @IsNumberString()
    category_id: number;

    @IsNumberString()
    type_of_product: number;

    @IsNotEmpty()
    @IsNumberString()
    price: number;


}