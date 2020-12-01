import { getMongoRepository, MongoRepository } from 'typeorm';

import NotificationsRepositoryType from '@modules/notifications/repositories/NotificationsRepository';
import CreateNotificationDTO from '@modules/notifications/dtos/CreateNotificationDTO';

import Notification from '@modules/notifications/infra/typeorm/schemas/Notification';

class NotificationsRepository implements NotificationsRepositoryType {
  private ormRepository: MongoRepository<Notification>;

  constructor() {
    this.ormRepository = getMongoRepository(Notification, 'mongo');
  }

  public async create({
    recipient_id,
    content,
  }: CreateNotificationDTO): Promise<Notification> {
    const notification = this.ormRepository.create({
      recipient_id,
      content,
    });

    await this.ormRepository.save(notification);

    return notification;
  }
}

export default NotificationsRepository;
