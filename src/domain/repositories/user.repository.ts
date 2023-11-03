import { User, UserBeforePersist } from '../models';

export type IUserRepository = {
  findMany(spaceId: string): Promise<User[]>;
  create(user: UserBeforePersist): Promise<User>;
  findUnique(uid: string): Promise<User | null>;
};
