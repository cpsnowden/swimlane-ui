import {
  Autocomplete,
  Box,
  TextField,
  Typography,
} from "@mui/material";
import { Venue } from "src/types";

interface VenueSelectorProps {
  venues: Venue[];
  selectedVenues: Venue[];
  isVenuesLoading: boolean;
  onAddVenue: (venues: Venue[]) => void;
}

export const VenueSelector: React.FC<VenueSelectorProps> = ({
  venues,
  selectedVenues,
  isVenuesLoading,
  onAddVenue,
}) => {
  return (
    <Box sx={{ p: 3, minHeight: 200 }}>
      <Typography variant="h6" sx={{ mb: 2 }}>
        Select Venues
      </Typography>
      <Autocomplete
        data-testid="add-venue-autocomplete"
        multiple
        options={venues}
        sx={{
          width: "100%",
        }}
        groupBy={(option) => option.operator}
        getOptionLabel={(option) => option.name}
        getOptionDisabled={(option) =>
          selectedVenues.some((excluded) => excluded.slug === option.slug)
        }
        loading={isVenuesLoading}
        renderInput={(params) => <TextField {...params} label="Add Venue" />}
        onChange={(_, value) => {
          if (value) {
            onAddVenue(value);
          }
        }}
        renderTags={() => null}
      />
    </Box>
  );
};
