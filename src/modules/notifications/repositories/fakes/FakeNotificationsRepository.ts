import { ObjectID } from 'mongodb';

import NotificationsRepositoryType from '@modules/notifications/repositories/NotificationsRepository';
import CreateNotificationDTO from '@modules/notifications/dtos/CreateNotificationDTO';

import Notification from '@modules/notifications/infra/typeorm/schemas/Notification';

class NotificationsRepository implements NotificationsRepositoryType {
  private notifications: Notification[] = [];

  public async create({
    recipient_id,
    content,
  }: CreateNotificationDTO): Promise<Notification> {
    const notification = new Notification();

    Object.assign(notification, { id: new ObjectID(), content, recipient_id });

    this.notifications.push(notification);

    return notification;
  }
}

export default NotificationsRepository;
