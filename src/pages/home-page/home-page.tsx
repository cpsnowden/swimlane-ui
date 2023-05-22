import {
  Autocomplete,
  Backdrop,
  Container,
  Stack,
  TextField,
} from "@mui/material";
import dayjs from "dayjs";
import { useMemo, useState } from "react";

import { DateTabs } from "src/components/date-tabs";
import { LoadingSpinner } from "src/components/loading-spinner";
import { PoolAvailability } from "src/components/pool-availability";
import { usePreferences } from "src/hooks/use-preferences";
import { useVenues } from "src/hooks/use-venues";
import { Venue } from "src/types";

export const HomePage: React.FC = () => {
  const { preferences, savePreferences } = usePreferences();
  const { venues, isVenuesLoading } = useVenues();
  const today = useMemo<dayjs.Dayjs>(() => dayjs(), []);
  const [selectedDate, selectDate] = useState<dayjs.Dayjs>(today);

  const handleAddVenue = (venues: Venue[]): void => {
    const newVenueIds = [
      ...preferences.venueIds,
      ...venues
        .map((v) => v.slug)
        .filter((v) => !preferences.venueIds.includes(v)),
    ];
    savePreferences({ ...preferences, venueIds: newVenueIds });
  };

  const handleRemoveVenue = (venue: Venue): void => {
    savePreferences({
      ...preferences,
      venueIds: preferences.venueIds.filter(
        (venueId) => venueId !== venue.slug
      ),
    });
  };

  const selectedVenues = venues.filter((venue) =>
    preferences.venueIds.includes(venue.slug)
  );

  return (
    <Container maxWidth="md">
      <Backdrop
        sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={isVenuesLoading}
      >
        <LoadingSpinner text="Loading Pools..." />
      </Backdrop>
      <Stack
        direction="column"
        justifyContent="flex-start"
        alignItems="center"
        spacing={4}
      >
        <Autocomplete
          data-testid="add-venue-autocomplete"
          multiple
          options={venues}
          sx={{ width: 500 }}
          groupBy={(option) => option.operator}
          getOptionLabel={(option) => option.name}
          getOptionDisabled={(option) =>
            selectedVenues.some((excluded) => excluded.slug === option.slug)
          }
          loading={isVenuesLoading}
          renderInput={(params) => <TextField {...params} label="Add Venue" />}
          onChange={(_, value) => {
            if (value) {
              handleAddVenue(value);
            }
          }}
          renderTags={() => null}
        />
        <DateTabs
          initialDate={today}
          numberOfDays={7}
          selected={selectedDate}
          onSelect={selectDate}
        />
        <Stack direction="row" spacing={2}>
          {selectedVenues.map((venue, i) => (
            // Set styling
            <PoolAvailability
              key={i}
              operator={venue.operator}
              venueId={venue.slug}
              venueName={venue.name}
              date={selectedDate}
              onRemoveClick={() => handleRemoveVenue(venue)}
            />
          ))}
        </Stack>
      </Stack>
    </Container>
  );
};
