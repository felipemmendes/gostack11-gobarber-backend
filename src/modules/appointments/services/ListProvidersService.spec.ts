import FakeUsersRepository from '@modules/users/repositories/fakes/FakeUsersRepository';
import ListProvidersService from '@modules/appointments/services/ListProvidersService';
import FakeCacheProvider from '@shared/container/providers/CacheProvider/fakes/FakeCacheProvider';

let fakeUsersRepository: FakeUsersRepository;
let listProviders: ListProvidersService;
let fakeCacheProvider: FakeCacheProvider;

describe('ListProviders', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository();
    fakeCacheProvider = new FakeCacheProvider();

    listProviders = new ListProvidersService(
      fakeUsersRepository,
      fakeCacheProvider,
    );
  });

  it('should be able to list providers', async () => {
    const loggedUser = await fakeUsersRepository.create({
      name: 'John Doe',
      email: 'john@email.com',
      password: '123456',
    });

    const provider1 = await fakeUsersRepository.create({
      name: 'Jane Doe',
      email: 'jane@email.com',
      password: '123456',
    });

    const provider2 = await fakeUsersRepository.create({
      name: 'John Smith',
      email: 'smith@email.com',
      password: '123456',
    });

    const providers = await listProviders.execute({
      user_id: loggedUser.id,
    });

    expect(providers).toEqual([provider1, provider2]);
  });
});
