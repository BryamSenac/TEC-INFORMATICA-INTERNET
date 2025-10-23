import { IsArray, IsEmail, IsEnum, IsNotEmpty, IsString, MinLength } from 'class-validator';

export enum categoria{
    eletronico = 'eletronico',
    mesa_e_banho = 'mesa_e_banho',
    vestuario = 'vestuario',
}

export class CreateProductDto {
    @IsString()
    @IsNotEmpty()
    @MinLength(3)
    name: string;

    @IsEmail()
    email: string;
    
    @IsArray()
    @IsEnum(categoria)
    categorias: categoria[];
}