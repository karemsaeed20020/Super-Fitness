import type { MusclesByGroupPayload, MusclesPayload } from '@/lib/types/muscle';
import { apiRequest } from '@/lib/utils/api/api-request';

//Get all muscle groups
export const getMuscles = () =>
  apiRequest<MusclesPayload>({
    endpoint: '/muscles',
  });

//Get muscles with images by group id
export const getMusclesByGroupId = (groupId: string) =>
  apiRequest<MusclesByGroupPayload>({
    endpoint: '/musclesGroup/:groupId',
    params: { groupId },
  });
