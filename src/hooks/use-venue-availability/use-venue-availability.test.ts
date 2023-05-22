import { renderHook, waitFor } from "@testing-library/react";
import dayjs from "dayjs";
import nock from "nock";
import { vi } from "vitest";

import { queryClientWrapper } from "src/lib/react-query";

import { useVenueAvailability } from ".";

vi.mock("src/constants", () => ({
  API_BASE_URL: "https://my-mock-api.com/api",
}));

describe("useVenueAvailability", () => {
  it("should return venue sessions", async () => {
    nock("https://my-mock-api.com/api")
      .get("/operators/operator-1/venues/venue-1/times/2023-05-22")
      .reply(200, [
        {
          date: "2023-05-22",
          startAtUTC: "2023-05-22T12:20:00",
          endAtUTC: "2023-05-22T13:10:00",
          operator: "better-health",
          venue: "venue-1",
          laneName: "Main Pool Lane 1",
          spaces: 1,
        },
        {
          date: "2023-05-22",
          startAtUTC: "2023-05-22T12:30:00",
          endAtUTC: "2023-05-22T13:20:00",
          operator: "better-health",
          venue: "venue-1",
          laneName: "Main Pool Lane 1",
          spaces: 1,
        },
      ]);

    const { result } = renderHook(
      () => useVenueAvailability("operator-1", "venue-1", "2023-05-22"),
      {
        wrapper: queryClientWrapper,
      }
    );

    await waitFor(() => expect(result.current.isSessionsLoading).toBe(false));

    const sessions = result.current.sessions;

    expect(sessions).toHaveLength(2);

    const firstSession = sessions[0];

    expect(firstSession.startAt.isSame(dayjs("2023-05-22T12:20:00"))).toBe(
      true
    );
    expect(firstSession.endAt.isSame(dayjs("2023-05-22T13:10:00"))).toBe(true);
    expect(firstSession.laneName).toBe("Main Pool Lane 1");
    expect(firstSession.spaces).toBe(1);
  });
});
