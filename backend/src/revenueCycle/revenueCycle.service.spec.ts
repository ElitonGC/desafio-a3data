import { Test, TestingModule } from '@nestjs/testing';
import { RevenueCycleService } from './revenueCycle.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { RevenueCycle } from './revenueCycle.entity';
import { NotFoundException } from '@nestjs/common';
import { CreateRevenueCycleDto } from './dto/create-revenueCycle.dto';
import { UpdateRevenueCycleDto } from './dto/update-revenueCycle.dto';

describe('RevenueCycleService', () => {
  let service: RevenueCycleService;
  let repo: any;

  beforeEach(async () => {
    repo = {
      create: jest.fn(),
      save: jest.fn(),
      find: jest.fn(),
      findOneBy: jest.fn(),
      update: jest.fn(),
      delete: jest.fn(),
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        RevenueCycleService,
        { provide: getRepositoryToken(RevenueCycle), useValue: repo },
      ],
    }).compile();

    service = module.get<RevenueCycleService>(RevenueCycleService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('create', () => {
    it('should create and save entity', async () => {
      const dto: CreateRevenueCycleDto = {
        patientId: 1,
        payer: 'A',
        procedureCode: 'X',
        amount: 100,
        stage: 'PRE_AUTH',
        claimStatus: 'OPEN',
        dueDate: new Date('2025-09-05T00:00:00Z'),
  paidDate: undefined,
  notes: undefined,
      };
      const entity = { ...dto };
      repo.create.mockReturnValue(entity);
      repo.save.mockResolvedValue({ id: 1, ...entity });
      const result = await service.create(dto);
      expect(repo.create).toHaveBeenCalledWith(dto);
      expect(repo.save).toHaveBeenCalledWith(entity);
      expect(result).toEqual({ id: 1, ...entity });
    });
  });

  describe('findAll', () => {
    it('should return all entities', async () => {
      const arr = [{ id: 1 }];
      repo.find.mockResolvedValue(arr);
      const result = await service.findAll();
      expect(repo.find).toHaveBeenCalled();
      expect(result).toEqual(arr);
    });
  });

  describe('findOne', () => {
    it('should return entity if found', async () => {
      const entity = { id: 1 };
      repo.findOneBy.mockResolvedValue(entity);
      const result = await service.findOne(1);
      expect(repo.findOneBy).toHaveBeenCalledWith({ id: 1 });
      expect(result).toEqual(entity);
    });
    it('should throw NotFoundException if not found', async () => {
      repo.findOneBy.mockResolvedValue(undefined);
      await expect(service.findOne(1)).rejects.toThrow(NotFoundException);
    });
  });

  describe('update', () => {
    it('should update and return updated entity', async () => {
      const dto: UpdateRevenueCycleDto = { payer: 'B' };
      repo.update.mockResolvedValue(undefined);
      const updated = { id: 1, payer: 'B' };
      jest.spyOn(service, 'findOne').mockResolvedValue(updated as any);
      const result = await service.update(1, dto);
      expect(repo.update).toHaveBeenCalledWith(1, dto);
      expect(result).toEqual(updated);
    });
  });

  describe('remove', () => {
    it('should call repo.delete', async () => {
      repo.delete.mockResolvedValue(undefined);
      await service.remove(1);
      expect(repo.delete).toHaveBeenCalledWith(1);
    });
  });
});
