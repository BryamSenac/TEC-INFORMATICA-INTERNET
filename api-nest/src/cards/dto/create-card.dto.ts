import { IsEnum, IsNotEmpty, IsString } from 'class-validator';

export class CreateCardDto {
  @IsString({ message: 'O título deve ser uma string.' })
  @IsNotEmpty({ message: 'O título não pode estar vazio.' })
  title: string;

  @IsString({ message: 'A descrição deve ser uma string.' })
  @IsNotEmpty({ message: 'A descrição não pode estar vazia.' })
  description: string;

  @IsEnum(['To Do', 'In Progress', 'Done'], { message: 'O status deve ser um dos seguintes valores: "To Do", "In Progress" ou "Done".' })
  @IsNotEmpty({ message: 'O status não pode estar vazio.' })
  status: 'To Do' | 'In Progress' | 'Done';
}
