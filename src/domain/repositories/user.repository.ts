import { User, UserBeforePersist } from '../models';

export type IUserRepository = {
  findManyUsers(spaceId: string): Promise<User[]>;
  create(user: UserBeforePersist): Promise<User>;
  findUser(findOptions: { uid: string } | { id: string }): Promise<User | null>;
  update(user: User): Promise<User>;
};
