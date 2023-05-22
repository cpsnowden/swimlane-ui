import { renderHook, waitFor } from "@testing-library/react";
import nock from "nock";
import { vi } from "vitest";

import { queryClientWrapper } from "src/lib/react-query";

import { useVenues } from ".";

vi.mock("src/constants", () => ({
  API_BASE_URL: "https://my-mock-api.com/api",
}));

describe("useVenues", () => {
  it("should return venues", async () => {
    nock("https://my-mock-api.com/api")
      .get("/venues")
      .reply(200, [
        { name: "venue1", slug: "venue-1", operator: "operator1" },
        { name: "venue2", slug: "venue-2", operator: "operator2" },
      ]);

    const { result } = renderHook(() => useVenues(), {
      wrapper: queryClientWrapper,
    });

    await waitFor(() => expect(result.current.isVenuesLoading).toBe(false));

    const venues = result.current.venues;

    expect(venues).toEqual([
      { name: "venue1", slug: "venue-1", operator: "operator1" },
      { name: "venue2", slug: "venue-2", operator: "operator2" },
    ]);
  });

  // TODO Add Error Handling
});
