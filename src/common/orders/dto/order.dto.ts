import { IsInt, IsNotEmpty, IsString, IsArray, ArrayMinSize, IsDate, IsDateString, IsNumber } from 'class-validator';

export class OrderDto {
  @IsArray()
  @IsString({ each: true })
  @ArrayMinSize(1)
  selectedProfessionals: string[];

  @IsInt()
  @IsNotEmpty()
  price: number;

  @IsDateString()
  @IsNotEmpty()
  orderDate: Date;

}

export class ValidateOrderDto {
  @IsNumber()
  @IsNotEmpty()
  id: number;

  
}
