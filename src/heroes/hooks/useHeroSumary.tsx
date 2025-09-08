import { useQuery } from "@tanstack/react-query";
import { getSummaryAction } from "../actions/get-sumary.action";

export const useHeroSummary = () => {
  return useQuery({
    queryKey: ['sumary-infromation'],
    queryFn: getSummaryAction,
    staleTime: 1000 * 60 * 5 // 5 min
  });
}