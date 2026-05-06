export type User = {
  _id: string;
  firstName: string;
  lastName: string;
  email: string;
  gender: "male" | "female";
  age: number;
  weight: number;
  height: number;
  activityLevel: "level1" | "level2" | "level3" | "level4" | "level5";
  goal:
    | "Gain weight"
    | "Lose weight"
    | "Get fitter"
    | "Gain more flexible"
    | "Learn the basic";
  photo: string;
  createdAt: string;
  passwordResetCode?: string;
  passwordResetExpires?: string;
  resetCodeVerified?: boolean;
};

export type AuthSession = {
  token: string;
  user: User;
};

export type ProfileResponse = {
  user: User;
};
