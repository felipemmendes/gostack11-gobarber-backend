import { Router } from 'express';

import UserProfileController from '@modules/users/infra/http/controllers/UserProfileController';

import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthenticated';

const userProfileRouter = Router();
const userProfileController = new UserProfileController();

userProfileRouter.use(ensureAuthenticated);

userProfileRouter.get('/', userProfileController.show);
userProfileRouter.put('/', userProfileController.update);

export default userProfileRouter;
