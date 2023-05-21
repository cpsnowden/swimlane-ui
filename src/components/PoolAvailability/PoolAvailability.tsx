import CloseIcon from "@mui/icons-material/Close";
import {
  Card,
  CardContent,
  CardHeader,
  IconButton,
  List,
  ListItem,
  ListItemText,
} from "@mui/material";
import { Dayjs } from "dayjs";

import { useGetVenueAvailability } from "src/hooks/use-venue-availability";

import { LoadingIndicator } from "../LoadingIndicator";

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
  const { sessions, isSessionsLoading } = useGetVenueAvailability(
    operator,
    venueId,
    date.format("YYYY-MM-DD")
  );

  // https://mui-treasury.com/components/card/

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
          <LoadingIndicator text="Loading Availability" />
        ) : (
          <List>
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
