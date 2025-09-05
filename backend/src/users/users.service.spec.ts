import { Test, TestingModule } from '@nestjs/testing';
import { UsersService } from './users.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { User } from './user.entity';
import { Repository } from 'typeorm';
import { BadRequestException } from '@nestjs/common';

const mockUser = {
  id: 1,
  name: 'Test User',
  email: 'test@email.com',
  password: 'hashed-password',
  createdAt: new Date(),
  updatedAt: new Date(),
};

describe('UsersService', () => {
  let service: UsersService;
  let repo: Repository<User>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UsersService,
        {
          provide: getRepositoryToken(User),
          useClass: Repository,
        },
      ],
    }).compile();

    service = module.get<UsersService>(UsersService);
    repo = module.get<Repository<User>>(getRepositoryToken(User));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should create a user', async () => {
    jest.spyOn(repo, 'findOneBy').mockResolvedValue(null);
    jest.spyOn(repo, 'create').mockReturnValue(mockUser as User);
    jest.spyOn(repo, 'save').mockResolvedValue(mockUser as User);
    const result = await service.create({ ...mockUser, password: 'senha' } as any);
    expect(result).toEqual(mockUser);
  });

  it('should throw BadRequestException for existing email on create', async () => {
    jest.spyOn(repo, 'findOneBy').mockResolvedValue(mockUser as User);
    await expect(service.create({ ...mockUser, password: 'senha' } as any)).rejects.toThrow(BadRequestException);
  });

  it('should find all users', async () => {
    jest.spyOn(repo, 'find').mockResolvedValue([mockUser as User]);
    const result = await service.findAll();
    expect(result).toEqual([mockUser]);
  });

  it('should return user by id', async () => {
    jest.spyOn(repo, 'findOneBy').mockResolvedValue(mockUser as User);
    const user = await service.findOne(1);
    expect(user).toEqual(mockUser);
  });

  it('should throw error if user not found by id', async () => {
    jest.spyOn(repo, 'findOneBy').mockResolvedValue(null);
    await expect(service.findOne(2)).rejects.toThrow();
  });

  it('should find user by email', async () => {
    jest.spyOn(repo, 'findOneBy').mockResolvedValue(mockUser as User);
    const user = await service.findByEmail('test@test.com');
    expect(user).toEqual(mockUser);
  });

  it('should throw error if user not found by email', async () => {
    jest.spyOn(repo, 'findOneBy').mockResolvedValue(null);
    await expect(service.findByEmail('notfound')).rejects.toThrow();
  });

  it('should update user and return updated user', async () => {
    jest.spyOn(repo, 'update').mockResolvedValue({} as any);
    jest.spyOn(service, 'findOne').mockResolvedValue(mockUser as User);
    const result = await service.update(1, { email: 'test@test.com' });
    expect(result).toEqual(mockUser);
  });

  it('should remove user', async () => {
    const deleteSpy = jest.spyOn(repo, 'delete').mockResolvedValue({} as any);
    await service.remove(1);
    expect(deleteSpy).toHaveBeenCalledWith(1);
  });
});