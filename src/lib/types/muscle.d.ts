export type MuscleGroup = {
  _id: string;
  name: string;
};

export type Muscle = {
  _id: string;
  name: string;
  image: string;
};

export type MusclesPayload = {
  musclesGroup: MuscleGroup[];
};

export type MusclesByGroupPayload = {
  muscleGroup: MuscleGroup;
  muscles: Muscle[];
};
