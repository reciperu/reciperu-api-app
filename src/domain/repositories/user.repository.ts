import { User, UserBeforePersist } from '../models';

export abstract class IUserRepository {
  abstract findAll(spaceId: string): Promise<User[]>;
  abstract create(user: UserBeforePersist): Promise<User>;
}
