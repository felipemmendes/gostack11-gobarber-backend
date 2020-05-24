import { Router } from 'express';
import { celebrate, Segments, Joi } from 'celebrate';

import UserProfileController from '@modules/users/infra/http/controllers/UserProfileController';

import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthenticated';

const userProfileRouter = Router();
const userProfileController = new UserProfileController();

userProfileRouter.use(ensureAuthenticated);

userProfileRouter.get('/', userProfileController.show);
userProfileRouter.put(
  '/',
  celebrate({
    [Segments.BODY]: {
      name: Joi.string().required(),
      email: Joi.string().email().required(),
      old_password: Joi.when(Joi.ref('password'), {
        is: true,
        then: Joi.string().required(),
        otherwise: Joi.string().allow(''),
      }),
      password: Joi.string().allow(''),
      password_confirmation: Joi.string().when(Joi.ref('password'), {
        is: true,
        then: Joi.string().required().valid(Joi.ref('password')),
        otherwise: Joi.string().allow(''),
      }),
    },
  }),
  userProfileController.update,
);

export default userProfileRouter;
