import { useQuery } from "@tanstack/react-query";

import { api } from "src/api";
import { Venue } from "src/types";

interface VenueDTO {
  name: string;
  slug: string;
  operator: string;
}

const getVenues = async (): Promise<Array<Venue>> => {
  const response = await api.get<Array<VenueDTO>>("venues");
  return response.data;
};

interface UseGetVenuesReturn {
  venues: Venue[];
  isVenuesLoading: boolean;
}

export const useGetVenues = (): UseGetVenuesReturn => {
  const { data: venues, isLoading: isVenuesLoading } = useQuery({
    queryKey: ["venues"],
    queryFn: getVenues,
  });
  return { venues: venues ?? [], isVenuesLoading };
};
