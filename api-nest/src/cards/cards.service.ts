import { Injectable, NotFoundException } from '@nestjs/common';
import { Card } from './models/cards.interface';
import { CreateCardDto } from './dto/create-card.dto';
import { UpdateCardDto } from './dto/update-card.dto';
import { PrismaService } from '../prisma.service';

@Injectable()
export class CardsService {
  constructor(private prisma: PrismaService) { }

  async create(createCardDto: CreateCardDto): Promise<Card> {
    return this.prisma.$transaction(async (tx) => {
      return tx.card.create({
        data: createCardDto,
      });
    });
  }

  async findAll(): Promise<Card[]> {
    return this.prisma.card.findMany();
  }

  async findOne(id: number): Promise<Card> {
    const card = await this.prisma.card.findUnique({
      where: { id },
    });

    if (!card) {
      throw new NotFoundException(`Card com o ID #${id} não encontrado`);
    }

    return card;
  }

  async update(id: number, updateCardDto: UpdateCardDto): Promise<Card> {
    return this.prisma.$transaction(async (tx) => {
      const card = await tx.card.findUnique({ where: { id } });

      if (!card) {
        throw new NotFoundException(`Card com o ID #${id} não encontrado`);
      }

      return tx.card.update({
        where: { id },
        data: updateCardDto,
      });
    });
  }

  async remove(id: number): Promise<void> {
    await this.prisma.$transaction(async (tx) => {
      const card = await tx.card.findUnique({ where: { id } });

      if (!card) {
        throw new NotFoundException(`Card com o ID #${id} não encontrado`);
      }

      await tx.card.delete({
        where: { id },
      });
    });
  }
}