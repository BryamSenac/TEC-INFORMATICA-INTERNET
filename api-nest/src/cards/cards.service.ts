import { Injectable, NotFoundException } from '@nestjs/common';
import { Card } from './models/cards.interface';
import { cards } from './models/cards.bd';
import { CreateCardDto } from './dto/create-card.dto';
import { UpdateCardDto } from './dto/update-card.dto';

@Injectable()
export class CardsService {
  private idCounter = 3;

  create(createCardDto: CreateCardDto): Card {
    const newCard: Card = {
      id: this.idCounter++,
      ...createCardDto,
    };

    cards.push(newCard);
    return newCard;
  }

  findAll(): Card[] {
    return cards;
  }

  findOne(id: number): Card {
    const card = cards.find((c) => c.id === id);

    if (!card) {
      throw new NotFoundException(`Card com o ID #${id} não encontrado`);
    }

    return card;
  }

  update(id: number, updateCardDto: UpdateCardDto): Card {
    const card = this.findOne(id);
    const cardIndex = cards.findIndex((c) => c.id === id);

    const updatedCard = {
      ...card,
      ...updateCardDto
    };

    cards[cardIndex] = updatedCard;

    return updatedCard;
  }

  remove(id: number): void {
    this.findOne(id); 
    const cardIndex = cards.findIndex((c) => c.id === id);
    cards.splice(cardIndex, 1);
  }
}