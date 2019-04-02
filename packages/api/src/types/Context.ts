import { Request } from 'express';
import { User } from '../entities/User';

export interface Context {
  req: Request;
  user?: User;
}
