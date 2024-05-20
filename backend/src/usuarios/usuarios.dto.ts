import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString, IsUUID, Length, length, Validate } from 'class-validator';
import { IsCpf } from '../util/global.validator';

export class CreateUsuarioDto {
  // @IsString()
  // @IsNotEmpty()
  @ApiProperty()
  nome: string;

  // @IsString()
  // @Validate(IsCpf)
  // @Length(11, 11)
  // @IsNotEmpty()
  @ApiProperty()
  cpf: string;

  // @IsString()
  // @IsNotEmpty()
  @ApiProperty()
  // @Length(10, 11)
  password: string;

  // @IsString()
  // @IsNotEmpty()
  @ApiProperty()
  // @Length(10, 11)
  phone: string;

  // @IsString()
  @ApiProperty()
  status: string;

  @ApiProperty()
  roleId: string;
}

export class UpdateUsuarioDto {
  @IsUUID()
  @IsNotEmpty()
  @ApiProperty()
  id: string;
  
  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  nome: string;

  @IsString()
  @Validate(IsCpf)
  @Length(11, 11)
  @IsNotEmpty()
  @ApiProperty()
  cpf: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  @Length(10, 11)
  password: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  @Length(10, 11)
  phone: string;

  @IsString()
  @ApiProperty()
  status: string;

  @ApiProperty()
  roleId: string;
}

export class ChangePasswordDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  @Length(5, 100)
  password: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  @Length(5, 100)
  reviewPassword: string;
}
