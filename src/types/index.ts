import { Dayjs } from "dayjs";

export interface Session {
  startAt: Dayjs;
  endAt: Dayjs;
  laneName: string;
  spaces: number;
}

export interface Venue {
  name: string;
  slug: string;
  operator: string;
}

export interface Preferences {
  venueIds: string[];
}
