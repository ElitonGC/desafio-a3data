import { Controller, Get, Post, Body, Param, Put, Delete, UseGuards } from '@nestjs/common';
import { RevenueCycleService } from './revenueCycle.service';
import { CreateRevenueCycleDto } from './dto/create-revenueCycle.dto';
import { UpdateRevenueCycleDto } from './dto/update-revenueCycle.dto';
import { ApiTags, ApiBearerAuth } from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@ApiTags('revenue-cycle')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('revenue-cycle')
export class RevenueCycleController {
  constructor(private readonly service: RevenueCycleService) { }

  @Post()
  create(@Body() dto: CreateRevenueCycleDto) {
    return this.service.create(dto);
  }

  @Get()
  findAll() {
    return this.service.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.service.findOne(+id);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() dto: UpdateRevenueCycleDto) {
    return this.service.update(+id, dto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.service.remove(+id);
  }
}
