import type { RegisterFields } from '../schemes/auth/register.schema';
import type { User } from './auth';

export type RegisterGender = 'male' | 'female';

export type RegisterGoal =
  | 'Gain weight'
  | 'Lose weight'
  | 'Get fitter'
  | 'Gain more flexible'
  | 'Learn the basic';

export type RegisterActivityLevel =
  | 'level1'
  | 'level2'
  | 'level3'
  | 'level4'
  | 'level5';

export type RegisterBody = RegisterFields & {
  gender: RegisterGender;
  age: number;
  height: number;
  weight: number;
  goal: RegisterGoal;
  activityLevel: RegisterActivityLevel;
};

export type RegisterResponseData = {
  user: User;
  token: string;
};

export type RegisterResponse = SuccessfullResponse<RegisterResponseData>;
