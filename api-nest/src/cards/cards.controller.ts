import {
    Controller,
    Get,
    Post,
    Body,
    Param,
    Delete,
    Patch,
    ParseIntPipe,
    HttpCode,
    HttpStatus,
  } from '@nestjs/common';
  import { CardsService } from './cards.service';
  import { CreateCardDto } from './dto/create-card.dto';
  import { UpdateCardDto } from './dto/update-card.dto';
  
  @Controller('cards')
  export class CardsController {
    constructor(private readonly cardsService: CardsService) {}

    @Post()
    create(@Body() createCardDto: CreateCardDto) {
      console.log(createCardDto);
      return this.cardsService.create(createCardDto);
    }

    @Get()
    findAll() {
      return this.cardsService.findAll();
    }
  
    @Get(':id')
    findOne(@Param('id', ParseIntPipe) id: number) {
      return this.cardsService.findOne(id);
    }
  
    @Patch(':id')
    update(
      @Param('id', ParseIntPipe) id: number,
      @Body() updateCardDto: UpdateCardDto,
    ) {
      return this.cardsService.update(id, updateCardDto);
    }
  
    @Delete(':id')
    @HttpCode(HttpStatus.NO_CONTENT)
    remove(@Param('id', ParseIntPipe) id: number) {
      return this.cardsService.remove(id);
    }
  }