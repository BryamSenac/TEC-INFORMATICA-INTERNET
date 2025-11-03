import { IsEnum, IsNotEmpty, IsString } from 'class-validator';

export class CreateCardDto {
  @IsString()
  @IsNotEmpty()
  title: string;

  @IsString()
  @IsNotEmpty()
  description: string;

  @IsEnum(['To Do', 'In Progress', 'Done'])
  @IsNotEmpty()
  status: 'To Do' | 'In Progress' | 'Done';
}