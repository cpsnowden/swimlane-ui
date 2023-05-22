import CloseIcon from "@mui/icons-material/Close";
import {
  Card,
  CardContent,
  CardHeader,
  IconButton,
  List,
  ListItem,
  ListItemText,
  ListSubheader,
} from "@mui/material";
import { Dayjs } from "dayjs";

import { LoadingSpinner } from "src/components/loading-spinner";
import { useVenueAvailability } from "src/hooks/use-venue-availability";

interface PoolAvailabilityProps {
  operator: string;
  venueId: string;
  venueName: string;
  date: Dayjs;
  onRemoveClick: () => void;
}

export const PoolAvailability: React.FC<PoolAvailabilityProps> = ({
  operator,
  venueId,
  venueName,
  date,
  onRemoveClick,
}) => {
  const { sessions, isSessionsLoading } = useVenueAvailability(
    operator,
    venueId,
    date.format("YYYY-MM-DD")
  );

  //Consider https://mui-treasury.com/components/card/

  return (
    <Card sx={{ width: 400 }}>
      <CardHeader
        title={venueName}
        titleTypographyProps={{ variant: "h6" }}
        action={
          <IconButton onClick={onRemoveClick}>
            <CloseIcon />
          </IconButton>
        }
      />
      <CardContent>
        {isSessionsLoading ? (
          <LoadingSpinner text="Loading Availability" />
        ) : (
          <List
            aria-labelledby="session-list-header"
            subheader={
              <ListSubheader id="session-list-header">Sessions</ListSubheader>
            }
          >
            {sessions.length ? (
              sessions.map((session, i) => (
                <ListItem key={i}>
                  <ListItemText
                    primary={`${session.startAt.format(
                      "HH:mm"
                    )} - ${session.endAt.format("HH:mm")} (${session.spaces})`}
                    secondary={session.laneName}
                  />
                </ListItem>
              ))
            ) : (
              <ListItem>
                <ListItemText primary="No results" />
              </ListItem>
            )}
          </List>
        )}
      </CardContent>
    </Card>
  );
};
