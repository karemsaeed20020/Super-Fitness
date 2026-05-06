import type { Muscle } from "@/lib/types/muscle";
import { useQuery } from "@tanstack/react-query";
import { getMusclesByGroupId } from "../apis/muscle.api";

export const useGetMusclesByGroup = (groupId: string | null) =>
  useQuery<Muscle[]>({
    queryKey: ["muscles-by-group", groupId],
    enabled: !!groupId,
    queryFn: async () => {
      const data = await getMusclesByGroupId(groupId!);
      return data.muscles;
    },
  });
