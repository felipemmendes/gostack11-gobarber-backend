import AppError from '@shared/errors/AppError';

import FakeUsersRepository from '@modules/users/repositories/fakes/FakeUsersRepository';
import FakeHashProvider from '@modules/users/providers/HashProvider/fakes/FakeHashProvider';
import UpdateUserProfileService from '@modules/users/services/UpdateUserProfileService';

let fakeUsersRepository: FakeUsersRepository;
let fakeHashProvider: FakeHashProvider;
let updateUserProfile: UpdateUserProfileService;

describe('UpdateUserProfile', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository();
    fakeHashProvider = new FakeHashProvider();

    updateUserProfile = new UpdateUserProfileService(
      fakeUsersRepository,
      fakeHashProvider,
    );
  });

  it('should be able to update user profile', async () => {
    const user = await fakeUsersRepository.create({
      name: 'John Doe',
      email: 'john@email.com',
      password: '123456',
    });

    const updatedUser = await updateUserProfile.execute({
      user_id: user.id,
      name: 'John Smith',
      email: 'smith@email.com',
    });

    expect(updatedUser?.name).toBe('John Smith');
    expect(updatedUser?.email).toBe('smith@email.com');
  });

  it('should not be able to update the profile of an non-existing user', async () => {
    await expect(
      updateUserProfile.execute({
        user_id: '123',
        name: 'John Doe',
        email: '123456',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to change email to an email alterady in use', async () => {
    const user = await fakeUsersRepository.create({
      name: 'John Doe',
      email: 'john@email.com',
      password: '123456',
    });

    await fakeUsersRepository.create({
      name: 'Jane Doe',
      email: 'doe@email.com',
      password: '123456',
    });

    await expect(
      updateUserProfile.execute({
        user_id: user.id,
        name: 'John Doe',
        email: 'doe@email.com',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should be able to update user password', async () => {
    const user = await fakeUsersRepository.create({
      name: 'John Doe',
      email: 'john@email.com',
      password: '123456',
    });

    const updatedUser = await updateUserProfile.execute({
      user_id: user.id,
      name: 'John Smith',
      email: 'smith@email.com',
      old_password: '123456',
      password: '654321',
    });

    expect(updatedUser?.password).toBe('654321');
  });

  it('should not be able to update user password without providing old password', async () => {
    const user = await fakeUsersRepository.create({
      name: 'John Doe',
      email: 'john@email.com',
      password: '123456',
    });

    await expect(
      updateUserProfile.execute({
        user_id: user.id,
        name: 'John Smith',
        email: 'smith@email.com',
        password: '654321',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to update user password with wrong old password', async () => {
    const user = await fakeUsersRepository.create({
      name: 'John Doe',
      email: 'john@email.com',
      password: '123456',
    });

    await expect(
      updateUserProfile.execute({
        user_id: user.id,
        name: 'John Smith',
        email: 'smith@email.com',
        old_password: '654321',
        password: '654321',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
