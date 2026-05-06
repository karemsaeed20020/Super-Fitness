import { useQuery } from "@tanstack/react-query";
import type { Muscle, MuscleGroup } from "@/lib/types/muscle";
import { getMusclesByGroupId } from "../apis/muscle.api";

// Fetches all muscles from every group in parallel and flattens into one array.
export const useGetAllMuscles = (groups: MuscleGroup[] | null | undefined) =>
  useQuery<Muscle[]>({
    queryKey: ["muscles-all", groups?.map((g) => g._id)],
    enabled: !!groups && groups.length > 0,
    queryFn: async () => {
      const results = await Promise.all(
        groups!.map((group) =>
          getMusclesByGroupId(group._id).then((res) => res.muscles),
        ),
      );
      // Flatten all groups into a single array
      return results.flat();
    },
  });