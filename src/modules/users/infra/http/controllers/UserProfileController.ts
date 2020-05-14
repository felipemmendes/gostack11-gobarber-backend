import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { classToClass } from 'class-transformer';

import ShowUserProfile from '@modules/users/services/ShowUserProfileService';
import UpdateUserProfile from '@modules/users/services/UpdateUserProfileService';

export default class UsersController {
  public async show(request: Request, response: Response): Promise<Response> {
    const user_id = request.user.id;

    const showUserProfile = container.resolve(ShowUserProfile);

    const user = await showUserProfile.execute({ user_id });

    return response.json(classToClass(user));
  }

  public async update(request: Request, response: Response): Promise<Response> {
    const user_id = request.user.id;
    const { name, email, old_password, password } = request.body;

    const updateUserProfile = container.resolve(UpdateUserProfile);

    const user = await updateUserProfile.execute({
      user_id,
      name,
      email,
      old_password,
      password,
    });

    return response.json(classToClass(user));
  }
}
