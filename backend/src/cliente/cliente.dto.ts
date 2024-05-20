import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsDateString, IsNotEmpty, IsString, IsUUID, Length, Validate } from 'class-validator';
import { IsCpf } from '../util/global.validator'

export class CreateClienteDto {
  @IsString()
  @Length(8, 300)
  @IsNotEmpty()
  @ApiProperty()
  nome: string;

  @IsString()
  @Length(11, 11)
  @Validate(IsCpf)
  @IsNotEmpty()
  @ApiProperty()
  cpf: string;

  @IsString()
  @Length(8, 8)
  @IsNotEmpty()
  @ApiProperty()
  password: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  @Length(3, 300)
  phone: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  points: string;
}

export class UpdateClienteDto {
  @IsUUID()
  id: string;
  @IsString()
  @Length(8, 300)
  @IsNotEmpty()
  @ApiProperty()
  nome: string;

  @IsString()
  @Length(11, 11)
  @Validate(IsCpf)
  @IsNotEmpty()
  @ApiProperty()
  cpf: string;

  @IsString()
  @Length(8, 8)
  @IsNotEmpty()
  @ApiProperty()
  password: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  @Length(3, 300)
  phone: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  points: string;
}
