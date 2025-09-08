import { heroApi } from "../api/hero.api"
import type { SumaryInfromationResponse } from "../types/sumary-infromation.response"

export const getSummaryAction = async () => {

  const { data } = await heroApi.get<SumaryInfromationResponse>('/summary');

  return data;
}