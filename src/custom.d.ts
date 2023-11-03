import { User as DomainUser } from './domain/models/user.model';

declare global {
  namespace Express {
    interface Request {
      currentUser: DomainUser | null;
    }
  }
}
