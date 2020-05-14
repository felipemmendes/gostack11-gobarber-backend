import AppError from '@shared/errors/AppError';

import FakeUsersRepository from '@modules/users/repositories/fakes/FakeUsersRepository';
import FakeHashProvider from '@modules/users/providers/HashProvider/fakes/FakeHashProvider';
import CreateUserService from '@modules/users/services/CreateUserService';
import AuthenticateUserService from '@modules/users/services/AuthenticateUserService';
import FakeCacheProvider from '@shared/container/providers/CacheProvider/fakes/FakeCacheProvider';

let fakeUsersRepository: FakeUsersRepository;
let fakeHashProvider: FakeHashProvider;
let createUser: CreateUserService;
let authenticateUser: AuthenticateUserService;
let fakeCacheProvider: FakeCacheProvider;

describe('Authenticate', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository();
    fakeHashProvider = new FakeHashProvider();
    fakeCacheProvider = new FakeCacheProvider();

    createUser = new CreateUserService(
      fakeUsersRepository,
      fakeHashProvider,
      fakeCacheProvider,
    );

    authenticateUser = new AuthenticateUserService(
      fakeUsersRepository,
      fakeHashProvider,
    );
  });

  it('should be able to authenticate', async () => {
    const user = await createUser.execute({
      name: 'John Doe',
      email: 'john@email.com',
      password: '123456',
    });

    const response = await authenticateUser.execute({
      email: 'john@email.com',
      password: '123456',
    });

    expect(response).toHaveProperty('token');
    expect(response.user).toEqual(user);
  });

  it('should not be able to authenticate with an email that is not registered', async () => {
    await expect(
      authenticateUser.execute({
        email: 'john@email.com',
        password: '123456',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to authenticate with an incorrect password', async () => {
    await createUser.execute({
      name: 'John Doe',
      email: 'john@email.com',
      password: '123456',
    });

    await expect(
      authenticateUser.execute({
        email: 'john@email.com',
        password: '654321',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
