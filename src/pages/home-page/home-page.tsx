import {
  Backdrop,
  Container,
  Drawer,
  Stack,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import dayjs from "dayjs";
import { useMemo, useState } from "react";

import { DateTabs } from "src/components/date-tabs";
import { LoadingSpinner } from "src/components/loading-spinner";
import { PoolAvailability } from "src/components/pool-availability";
import { VenueSelector } from "src/components/venue-selector";
import { usePreferences } from "src/hooks/use-preferences";
import { useVenues } from "src/hooks/use-venues";
import { Venue } from "src/types";

interface HomePageProps {
  isDrawerOpen: boolean;
  onDrawerToggle: () => void;
}

export const HomePage: React.FC<HomePageProps> = ({ isDrawerOpen, onDrawerToggle }) => {
  const { preferences, savePreferences } = usePreferences();
  const { venues, isVenuesLoading } = useVenues();
  const today = useMemo<dayjs.Dayjs>(() => dayjs(), []);
  const [selectedDate, selectDate] = useState<dayjs.Dayjs>(today);
  
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

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
      <Drawer
        anchor="bottom"
        open={isDrawerOpen}
        onClose={onDrawerToggle}
        sx={{
          '& .MuiDrawer-paper': {
            paddingBottom: '56px',
          },
        }}
      >
        <VenueSelector
          venues={venues}
          selectedVenues={selectedVenues}
          onAddVenue={handleAddVenue}
          onRemoveVenue={handleRemoveVenue}
        />
      </Drawer>

      <Stack
        direction="column"
        justifyContent="flex-start"
        alignItems="center"
        spacing={4}
        sx={{ paddingBottom: '72px' }}
      >
        <DateTabs
          initialDate={today}
          numberOfDays={7}
          selected={selectedDate}
          onSelect={selectDate}
        />
        <Stack
          direction={{ xs: "column", md: "row" }}
          spacing={isMobile ? 1 : 2}
          sx={{
            width: "100%",
            alignItems: { xs: "stretch", md: "flex-start" },
            justifyContent: "center",
            px: { xs: 1, md: 0 },
          }}
        >
          {selectedVenues.map((venue, i) => (
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
