import { container } from 'tsyringe';

import IHashProvider from '@modules/users/providers/HashProvider/models/HashProvider';
import BCryptHashProvider from '@modules/users/providers/HashProvider/implementations/BCryptHashProvider';

container.registerSingleton<IHashProvider>('HashProvider', BCryptHashProvider);
