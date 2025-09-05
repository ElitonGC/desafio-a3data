import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from './auth.service';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../users/users.service';

const mockUser = {
  id: 1,
  email: 'test@test.com',
  password: 'hashed-password',
};

describe('AuthService', () => {
  let service: AuthService;
  let usersService: any;
  let jwtService: any;

  beforeEach(async () => {
    usersService = {
      findByEmail: jest.fn(),
      create: jest.fn(),
    };
    jwtService = {
      sign: jest.fn().mockReturnValue('token-jwt'),
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthService,
        { provide: UsersService, useValue: usersService },
        { provide: JwtService, useValue: jwtService },
      ],
    }).compile();

    service = module.get<AuthService>(AuthService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('validateUser', () => {
    it('should return null if user not found', async () => {
      usersService.findByEmail.mockResolvedValue(null);
      const result = await service.validateUser('notfound', 'senha');
      expect(result).toBeNull();
    });

    it('should return null if password is invalid', async () => {
      usersService.findByEmail.mockResolvedValue(mockUser);
      const result = await service.validateUser('test@test.com', 'errada');
      expect(result).toBeNull();
    });
  });

  describe('login', () => {
    it('should return an access token', async () => {
      const result = await service.login({ email: 'test@test.com', id: 1 });
      expect(result).toEqual({ access_token: 'token-jwt' });
      expect(jwtService.sign).toHaveBeenCalledWith({ email: 'test@test.com', sub: 1 });
    });
  });

  describe('signup', () => {
    it('should create user and return token', async () => {
      usersService.create.mockResolvedValue(mockUser);
      jest.spyOn(service, 'login').mockResolvedValue({ access_token: 'token-jwt' });
      const result = await service.signup({ email: 'test@test.com', password: 'senha' });
      expect(usersService.create).toHaveBeenCalled();
      expect(service.login).toHaveBeenCalledWith(mockUser);
      expect(result).toEqual({ access_token: 'token-jwt' });
    });
  });
});