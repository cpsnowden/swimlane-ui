import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import dayjs from "dayjs";
import { vi } from "vitest";

import { DateTabs } from ".";

describe("DateTabs", () => {
  const getTab = (name: string, selected?: boolean): HTMLElement => {
    return screen.getByRole("tab", { name, selected });
  };

  it("should render n dates with one selected", () => {
    render(
      <DateTabs
        initialDate={dayjs("2023-05-21")}
        numberOfDays={3}
        selected={dayjs("2023-05-22")}
        onSelect={vi.fn()}
      />
    );

    expect(screen.getAllByRole("tab")).toHaveLength(3);
    expect(getTab("21 May", false)).toBeTruthy();
    expect(getTab("22 May", true)).toBeTruthy();
    expect(getTab("23 May", false)).toBeTruthy();
  });

  it("should call onSelect when date clicked", async () => {
    const mockOnSelect = vi.fn();

    const day1 = dayjs("2023-05-21");
    const day2 = dayjs("2023-05-22");

    render(
      <DateTabs
        initialDate={day1}
        numberOfDays={2}
        selected={day1}
        onSelect={mockOnSelect}
      />
    );

    userEvent.click(getTab("22 May"));

    await waitFor(() => {
      // Arg Match
      expect(mockOnSelect).toHaveBeenCalled();
      expect(mockOnSelect.mock.calls[0][0].isSame(day2)).toBe(true);
    });
  });
});
