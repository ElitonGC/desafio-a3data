import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { RevenueCycle } from './revenueCycle.entity';
import { CreateRevenueCycleDto } from './dto/create-revenueCycle.dto';
import { UpdateRevenueCycleDto } from './dto/update-revenueCycle.dto';

@Injectable()
export class RevenueCycleService {
  constructor(
    @InjectRepository(RevenueCycle)
    private readonly repo: Repository<RevenueCycle>,
  ) {}

  async create(dto: CreateRevenueCycleDto): Promise<RevenueCycle> {
    const entity = this.repo.create(dto);
    return this.repo.save(entity);
  }

  findAll(): Promise<RevenueCycle[]> {
    return this.repo.find();
  }

  async findOne(id: number): Promise<RevenueCycle> {
    const entity = await this.repo.findOneBy({ id });
    if (!entity) throw new NotFoundException('RevenueCycle not found');
    return entity;
  }

  async update(id: number, dto: UpdateRevenueCycleDto): Promise<RevenueCycle> {
    await this.repo.update(id, dto);
    return this.findOne(id);
  }

  async remove(id: number): Promise<void> {
    await this.repo.delete(id);
  }
}
