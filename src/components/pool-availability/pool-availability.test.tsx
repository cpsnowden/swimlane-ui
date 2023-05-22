import { render, screen, waitFor, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import dayjs from "dayjs";
import { vi } from "vitest";

import { useGetVenueAvailability } from "src/hooks/use-venue-availability";

import { PoolAvailability } from ".";

const mockUseGetVenueAvailability =
  useGetVenueAvailability as jest.MockedFunction<
    typeof useGetVenueAvailability
  >;

vi.mock("src/hooks/use-venue-availability", () => {
  return {
    useGetVenueAvailability: vi.fn(),
  };
});

describe("PoolAvailability", () => {
  it("should render loading indicator whilst loading", () => {
    mockUseGetVenueAvailability.mockReturnValue({
      sessions: [],
      isSessionsLoading: true,
    });

    const date = dayjs("2023-05-21");

    render(
      <PoolAvailability
        operator={"operator-id"}
        venueId={"venue-id"}
        venueName={"venue-name"}
        date={date}
        onRemoveClick={vi.fn()}
      />
    );

    expect(screen.getByText("Loading Availability")).toBeTruthy();
    expect(mockUseGetVenueAvailability).toHaveBeenCalledWith(
      "operator-id",
      "venue-id",
      "2023-05-21"
    );
  });

  it("should render list of sessions", () => {
    mockUseGetVenueAvailability.mockReturnValue({
      sessions: [
        {
          startAt: dayjs("2023-05-21T08:00:00"),
          endAt: dayjs("2023-05-21T08:59:00"),
          laneName: "Lane 1",
          spaces: 1,
        },
        {
          startAt: dayjs("2023-05-21T09:00:00"),
          endAt: dayjs("2023-05-21T09:59:00"),
          laneName: "Lane 2",
          spaces: 2,
        },
      ],
      isSessionsLoading: false,
    });

    const date = dayjs("2023-05-21");

    render(
      <PoolAvailability
        operator={"operator-id"}
        venueId={"venue-id"}
        venueName={"venue-name"}
        date={date}
        onRemoveClick={vi.fn()}
      />
    );

    const sessionList = screen.getByRole("list", { name: /sessions/i });
    const sessions = within(sessionList).getAllByRole("listitem");

    // Header + 2
    expect(sessions).toHaveLength(3);
    expect(sessions[1]).toMatchSnapshot();
  });

  it("should render no results if no sessions", () => {
    mockUseGetVenueAvailability.mockReturnValue({
      sessions: [],
      isSessionsLoading: false,
    });

    render(
      <PoolAvailability
        operator={"operator-id"}
        venueId={"venue-id"}
        venueName={"venue-name"}
        date={dayjs("2023-05-21")}
        onRemoveClick={vi.fn()}
      />
    );

    expect(screen.getByText("No results")).toBeTruthy();
  });

  it("should render error alert when query fails", () => {
    //TODO
  });

  it("should call onRemoveClick", async () => {
    mockUseGetVenueAvailability.mockReturnValue({
      sessions: [],
      isSessionsLoading: false,
    });

    const onRemoveClickMock = vi.fn();

    render(
      <PoolAvailability
        operator={"operator-id"}
        venueId={"venue-id"}
        venueName={"venue-name"}
        date={dayjs("2023-05-21")}
        onRemoveClick={onRemoveClickMock}
      />
    );

    const closeButton = screen.getByTestId("CloseIcon");
    userEvent.click(closeButton);

    await waitFor(() => {
      expect(onRemoveClickMock).toHaveBeenCalled();
    });
  });
});
