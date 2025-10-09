import { Module } from '@nestjs/common';
import { CardsServices } from './cards.service';
import { CardsController } from './cards.controller';

@Module({
  imports: [], 
  controllers: [CardsController], 
  providers: [CardsServices],
})
export class CardsModule {}