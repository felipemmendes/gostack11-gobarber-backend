import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';

import UsersRepository from '@modules/users/repositories/UsersRepository';
import User from '@modules/users/infra/typeorm/entities/User';

interface Request {
  user_id: string;
}

@injectable()
class ShowUserProfileService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: UsersRepository,
  ) {}

  public async execute({ user_id }: Request): Promise<User> {
    const user = await this.usersRepository.findById(user_id);

    if (!user) {
      throw new AppError('User not found.');
    }

    return user;
  }
}

export default ShowUserProfileService;
