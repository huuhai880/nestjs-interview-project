import { IsNotEmpty, IsNumber, IsNumberString } from "class-validator";

export class CreateProductDto {
    @IsNotEmpty({ message: "Product name is require" })
    product_name: string;

    @IsNumberString()
    category_id: number;

    @IsNumberString()
    type_of_product: number;

    @IsNotEmpty({message:"Price is require"})
    @IsNumberString()
    price: number;

}