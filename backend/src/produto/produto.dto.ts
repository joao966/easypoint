import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsString, Length } from 'class-validator';

export class CreateProdutoDto {
  @IsString()
  @IsNotEmpty()
  @Length(3, 300)
  @ApiProperty()
  name: string;

  @IsNumber()
  // @Length(14, 14)
  @IsNotEmpty()
  @ApiProperty()
  quantity: number;

  @IsNumber()
  @IsNotEmpty()
  @ApiProperty()
  price: number;

  @IsString()
  // @Length(10, 11)
  @ApiProperty()
  category: string;

  @IsString()
  // @Length(10, 11)
  @ApiProperty()
  imageUrl: string;
}
