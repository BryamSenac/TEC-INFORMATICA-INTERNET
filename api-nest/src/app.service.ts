import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(nome: string, idade: number): string {
    return 'Hello!' + nome + 'idade: ' + idade;
  }
}