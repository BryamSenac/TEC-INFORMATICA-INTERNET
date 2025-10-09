// src/products/products.controller.ts

import { Controller, Get, Param, ParseIntPipe} from '@nestjs/common';
import { CardsServices } from './cards.service';

@Controller('products')
export class CardsController {
  constructor(private readonly productsService: CardsServices) {}

  @Get()
  findAll(){
    return this.productsService.findAll();
  }

  @Get('in-stock')
  findInStock() {
    return this.productsService.findInStock();
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.productsService.findOne(id);
  }
}