import {
  EntitySubscriberInterface,
  EventSubscriber,
  InsertEvent,
  UpdateEvent,
} from 'typeorm';
import { AuthEntity } from '../entities';
import { AuthProvider } from '../providers';

@EventSubscriber()
export class AuthSubscriber implements EntitySubscriberInterface<AuthEntity> {
  listenTo() {
    return AuthEntity;
  }

  async beforeInsert({ entity }: InsertEvent<AuthEntity>): Promise<void> {
    if (entity.password) {
      entity.password = await AuthProvider.hash(entity.password);
    }

    if (entity.email) {
      entity.email = entity.email.toLowerCase();
    }
  }

  async beforeUpdate({
    entity,
    databaseEntity,
  }: UpdateEvent<AuthEntity>): Promise<void> {
    if (entity.password) {
      const password = await AuthProvider.hash(entity.password);

      if (password !== databaseEntity?.password) {
        entity.password = password;
      }
    }
  }
}
