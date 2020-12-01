import { injectable, inject } from 'tsyringe';
import { classToClass } from 'class-transformer';

import UsersRepository from '@modules/users/repositories/UsersRepository';
import User from '@modules/users/infra/typeorm/entities/User';
import CacheProvider from '@shared/container/providers/CacheProvider/models/CacheProvider';

interface Request {
  user_id: string;
}

@injectable()
class ListProvidersService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: UsersRepository,

    @inject('CacheProvider')
    private cacheProvider: CacheProvider,
  ) {}

  public async execute({ user_id }: Request): Promise<User[]> {
    let providers = await this.cacheProvider.recover<User[]>(
      `providers-list:${user_id}`,
    );

    if (!providers) {
      providers = await this.usersRepository.findAllProviders({
        except_user_id: user_id,
      });

      await this.cacheProvider.save(
        `providers-list:${user_id}`,
        classToClass(providers),
      );
    }

    return providers;
  }
}

export default ListProvidersService;
