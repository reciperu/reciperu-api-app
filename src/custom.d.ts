import { User as DomainUser } from './domain/user';

declare global {
  namespace Express {
    interface Request {
      currentUser: DomainUser | null;
    }
  }
}
