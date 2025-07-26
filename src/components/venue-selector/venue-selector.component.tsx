import {
  Box,
  TextField,
  Typography,
  List,
  ListItem,
  ListItemText,
  ListItemButton,
  Checkbox,
  Divider,
  Chip,
  Stack,
} from "@mui/material";
import { useState } from "react";
import { Venue } from "src/types";

interface VenueSelectorProps {
  venues: Venue[];
  selectedVenues: Venue[];
  onAddVenue: (venues: Venue[]) => void;
  onRemoveVenue: (venue: Venue) => void;
}

export const VenueSelector: React.FC<VenueSelectorProps> = ({
  venues,
  selectedVenues,
  onAddVenue,
  onRemoveVenue,
}) => {
  const [searchTerm, setSearchTerm] = useState("");

  const filteredVenues = venues.filter(venue =>
    venue.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    venue.operator.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const availableVenues = filteredVenues.filter(venue =>
    !selectedVenues.some(selected => selected.slug === venue.slug)
  );

  const groupedVenues = availableVenues.reduce((groups, venue) => {
    const operator = venue.operator;
    if (!groups[operator]) {
      groups[operator] = [];
    }
    groups[operator].push(venue);
    return groups;
  }, {} as Record<string, Venue[]>);

  const handleVenueToggle = (venue: Venue) => {
    onAddVenue([venue]);
  };

  return (
    <Box sx={{ p: 3, minHeight: 200, maxHeight: '70vh', display: 'flex', flexDirection: 'column' }}>
      <Typography variant="h6" sx={{ mb: 2 }}>
        Select Venues
      </Typography>
      
      <TextField
        fullWidth
        placeholder="Search venues..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        sx={{ mb: 2 }}
      />

      {selectedVenues.length > 0 && (
        <>
          <Typography variant="subtitle2" sx={{ mb: 1 }}>
            Selected Venues
          </Typography>
          <Stack direction="row" spacing={1} sx={{ mb: 2, flexWrap: 'wrap', gap: 1 }}>
            {selectedVenues.map((venue) => (
              <Chip
                key={venue.slug}
                label={venue.name}
                onDelete={() => onRemoveVenue(venue)}
                color="primary"
                variant="filled"
              />
            ))}
          </Stack>
          <Divider sx={{ mb: 2 }} />
        </>
      )}

      <Typography variant="subtitle2" sx={{ mb: 1 }}>
        Available Venues
      </Typography>
      
      <Box sx={{ flex: 1, overflow: 'auto' }}>
        {Object.entries(groupedVenues).map(([operator, operatorVenues]) => (
          <Box key={operator} sx={{ mb: 2 }}>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 1, fontWeight: 'medium' }}>
              {operator}
            </Typography>
            <List dense>
              {operatorVenues.map((venue) => (
                <ListItem key={venue.slug} disablePadding>
                  <ListItemButton onClick={() => handleVenueToggle(venue)}>
                    <Checkbox
                      edge="start"
                      checked={false}
                      tabIndex={-1}
                      disableRipple
                    />
                    <ListItemText primary={venue.name} />
                  </ListItemButton>
                </ListItem>
              ))}
            </List>
          </Box>
        ))}
      </Box>
    </Box>
  );
};
