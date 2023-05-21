import { Tab, Tabs } from "@mui/material";
import dayjs from "dayjs";
import { useMemo } from "react";

interface DateTabsProps {
  initialDate: dayjs.Dayjs;
  numberOfDays: number;
  selected: dayjs.Dayjs;
  onSelect: (date: dayjs.Dayjs) => void;
}

export const DateTabs: React.FC<DateTabsProps> = ({
  initialDate,
  numberOfDays,
  selected,
  onSelect,
}) => {
  const dayRange = useMemo(() => {
    return Array(numberOfDays)
      .fill(0)
      .map((_, i) => initialDate.add(i, "day"));
  }, [numberOfDays, initialDate]);

  const selectedIndex = dayRange.findIndex((value) => value.isSame(selected));

  return (
    <Tabs
      value={selectedIndex}
      onChange={(_, index) => onSelect(dayRange[index])}
      variant="scrollable"
      scrollButtons="auto"
    >
      {dayRange.map((day, index) => (
        <Tab key={index} label={day.format("D MMM")} />
      ))}
    </Tabs>
  );
};
