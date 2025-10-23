// src/products/products.controller.ts

import { Body, Controller, Get, Param, ParseIntPipe, Post, Put } from '@nestjs/common';
import { CardsServices } from './cards.service';
import { CreateProductDto } from './dto/create_product_dto';

@Controller('cards')
export class CardsController {
  constructor(private readonly productsService: CardsServices) { }

  @Get()
  findAll() {
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

  @Post()
  createCard(@Body() bodyData: CreateProductDto) {
    return this.productsService.createCard(bodyData);
  }

  @Put(':valor/desconto')
  addDesconto(
    @Param('valor', ParseIntPipe) valor: number,
  ) {
    return 'desconto dado';
  }

  @Put(':id/caracteristicas')
  updateCard(
    @Param('id', ParseIntPipe) id: number,
    @Body() bodydata: any
  ) {
    return 'sucesso';
  }
}