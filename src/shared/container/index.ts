import { container } from 'tsyringe';

import '@modules/users/providers';
import '@shared/container/providers';

import AppointmentsRepositoryType from '@modules/appointments/repositories/AppointmentsRepository';
import AppointmentsRepository from '@modules/appointments/infra/typeorm/repositories/AppointmentsRepository';

import UsersRepositoryType from '@modules/users/repositories/UsersRepository';
import UsersRepository from '@modules/users/infra/typeorm/repositories/UsersRepository';

import UserTokensRepositoryType from '@modules/users/repositories/UserTokensRepository';
import UserTokensRepository from '@modules/users/infra/typeorm/repositories/UserTokensRepository';

import NotificationsRepositoryType from '@modules/notifications/repositories/NotificationsRepository';
import NotificationsRepository from '@modules/notifications/infra/typeorm/repositories/NotificationsRepository';

container.registerSingleton<AppointmentsRepositoryType>(
  'AppointmentsRepository',
  AppointmentsRepository,
);

container.registerSingleton<UsersRepositoryType>(
  'UsersRepository',
  UsersRepository,
);

container.registerSingleton<UserTokensRepositoryType>(
  'UserTokensRepository',
  UserTokensRepository,
);

container.registerSingleton<NotificationsRepositoryType>(
  'NotificationsRepository',
  NotificationsRepository,
);
