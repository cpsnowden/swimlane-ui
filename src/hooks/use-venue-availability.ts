import { useQuery } from "@tanstack/react-query";
import dayjs from "dayjs";

import { api } from "src/api";
import { Session } from "src/types";

interface LaneTimeDTO {
  startAtUTC: string;
  endAtUTC: string;
  laneName: string;
  spaces: number;
}

const getVenueTimes = async (
  operator: string,
  venueId: string,
  date: string
): Promise<Array<Session>> => {
  const response = await api.get<Array<LaneTimeDTO>>(
    `/operators/${operator}/venues/${venueId}/times/${date}`
  );
  return response.data.map((session) => {
    return {
      startAt: dayjs(session.startAtUTC),
      endAt: dayjs(session.endAtUTC),
      laneName: session.laneName,
      spaces: session.spaces,
    };
  });
};

interface UseGetVenueAvailabilityReturn {
  sessions: Session[];
  isSessionsLoading: boolean;
}

export const useGetVenueAvailability = (
  operator: string,
  venueId: string,
  date: string
): UseGetVenueAvailabilityReturn => {
  const { data: sessions, isLoading: isSessionsLoading } = useQuery({
    queryKey: ["venue-availability", operator, venueId, date],
    queryFn: () => getVenueTimes(operator, venueId, date),
  });
  return { sessions: sessions ?? [], isSessionsLoading };
};
