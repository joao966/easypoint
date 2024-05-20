import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsNumber, IsObject, IsString } from "class-validator";
import { StatusTrasaction } from 'src/model/comanda.entity';

export class CreateComandaDto {
    @IsString()
    // @IsNotEmpty()
    @ApiProperty()
    idCliente: string;

    @IsString()
    @IsNotEmpty()
    @ApiProperty()
    idUser: string;

    // @IsObject()
    // @IsNotEmpty()
    @ApiProperty()
    items: string;

    @IsNumber()
    @IsNotEmpty()
    @ApiProperty()
    valor_total: number;

    @IsString()
    @ApiProperty()
    descricao: string;

    @IsString()
    @ApiProperty()
    status: StatusTrasaction;
}

export class UpdateComandaDto {
    @IsString()
    @IsNotEmpty()
    @ApiProperty()
    id: string;

    // @IsString()
    // @IsNotEmpty()
    @ApiProperty()
    idCliente: string;

    // @IsString()
    // @IsNotEmpty()
    @ApiProperty()
    idUser: string;

    // @IsObject()
    // @IsNotEmpty()
    @ApiProperty()
    items: string;

    // @IsNumber()
    // @IsNotEmpty()
    @ApiProperty()
    valor: number;

    @IsString()
    @ApiProperty()
    descricao: string;

    @IsString()
    @ApiProperty()
    status: StatusTrasaction;
}
