import { Injectable, NotFoundException } from '@nestjs/common';
import { Card } from './models/cards.interface';
import { CardsBD } from './models/cards.bd';

@Injectable()
export class CardsServices {

  findAll(): Card[] {
    return CardsBD;
  }

  findOne(id: number): Card {
    const product = CardsBD.find((p) => p.id === id);
    if (!product) {
      throw new NotFoundException(`Produto com ID ${id} não encontrado.`);
    }
    return product;
  }
  
  findInStock(): Card[] {
    return CardsBD.filter((p) => p.inStock === true);
  }
}