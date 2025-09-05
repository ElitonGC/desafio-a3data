import { Test, TestingModule } from '@nestjs/testing';
import { RevenueCycleController } from './revenueCycle.controller';
import { RevenueCycleService } from './revenueCycle.service';
import { CreateRevenueCycleDto } from './dto/create-revenueCycle.dto';
import { UpdateRevenueCycleDto } from './dto/update-revenueCycle.dto';

describe('RevenueCycleController', () => {
	let controller: RevenueCycleController;
	let service: any;

	beforeEach(async () => {
		service = {
			create: jest.fn(),
			findAll: jest.fn(),
			findOne: jest.fn(),
			update: jest.fn(),
			remove: jest.fn(),
		};

		const module: TestingModule = await Test.createTestingModule({
			controllers: [RevenueCycleController],
			providers: [
				{ provide: RevenueCycleService, useValue: service },
			],
		}).compile();

		controller = module.get<RevenueCycleController>(RevenueCycleController);
	});

	it('should be defined', () => {
		expect(controller).toBeDefined();
	});

	describe('create', () => {
		it('should call service.create and return result', async () => {
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
					const created = { id: 1, ...dto };
					service.create.mockResolvedValue(created);
					const result = await controller.create(dto);
					expect(service.create).toHaveBeenCalledWith(dto);
					expect(result).toEqual(created);
		});
	});

	describe('findAll', () => {
		it('should return array from service', async () => {
			const arr = [{ id: 1 }];
			service.findAll.mockResolvedValue(arr);
			const result = await controller.findAll();
			expect(service.findAll).toHaveBeenCalled();
			expect(result).toEqual(arr);
		});
	});

	describe('findOne', () => {
		it('should return entity from service', async () => {
			const entity = { id: 1 };
			service.findOne.mockResolvedValue(entity);
			const result = await controller.findOne('1');
			expect(service.findOne).toHaveBeenCalledWith(1);
			expect(result).toEqual(entity);
		});
	});

	describe('update', () => {
		it('should call service.update and return result', async () => {
			const dto: UpdateRevenueCycleDto = { payer: 'B' };
			const updated = { id: 1, payer: 'B' };
			service.update.mockResolvedValue(updated);
			const result = await controller.update('1', dto);
			expect(service.update).toHaveBeenCalledWith(1, dto);
			expect(result).toEqual(updated);
		});
	});

	describe('remove', () => {
		it('should call service.remove', async () => {
			service.remove.mockResolvedValue(undefined);
			const result = await controller.remove('1');
			expect(service.remove).toHaveBeenCalledWith(1);
			expect(result).toBeUndefined();
		});
	});
});
