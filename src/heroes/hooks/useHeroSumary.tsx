import { useQuery } from "@tanstack/react-query";
import { getSumaryAction } from "../actions/get-sumary.action";

export const useHeroSummary = () => {
  return useQuery({
    queryKey: ['sumary-infromation'],
    queryFn: getSumaryAction,
    staleTime: 1000 * 60 * 5 // 5 min
  });
}