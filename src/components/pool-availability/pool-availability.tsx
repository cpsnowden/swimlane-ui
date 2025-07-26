import CloseIcon from "@mui/icons-material/Close";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Card,
  CardContent,
  CardHeader,
  Divider,
  IconButton,
  List,
  ListItem,
  ListItemText,
  ListSubheader,
  Typography,
  useMediaQuery,
  useTheme,
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
  forceAccordionMode?: boolean;
}

export const PoolAvailability: React.FC<PoolAvailabilityProps> = ({
  operator,
  venueId,
  venueName,
  date,
  onRemoveClick,
  forceAccordionMode = false,
}) => {
  const { sessions, isSessionsLoading } = useVenueAvailability(
    operator,
    venueId,
    date.format("YYYY-MM-DD")
  );
  
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const useAccordionLayout = forceAccordionMode || isMobile;

  const sessionContent = (
    <>
      {isSessionsLoading ? (
        <LoadingSpinner text="Loading Availability" />
      ) : (
        <List
          aria-labelledby="session-list-header"
          subheader={
            !useAccordionLayout ? (
              <ListSubheader id="session-list-header">Sessions</ListSubheader>
            ) : undefined
          }
        >
          {sessions.length ? (
            sessions.map((session, i) => (
              <>
                <ListItem key={i} disabled={session.spaces === 0}>
                  <ListItemText
                    primary={`${session.startAt.format(
                      "HH:mm"
                    )} - ${session.endAt.format("HH:mm")} (${
                      session.spaces
                    } spaces)`}
                    secondary={session.laneName}
                  />
                </ListItem>
                <Divider variant="fullWidth" component="li" />
              </>
            ))
          ) : (
            <ListItem>
              <ListItemText primary="No results" />
            </ListItem>
          )}
        </List>
      )}
    </>
  );

  if (useAccordionLayout) {
    return (
      <Accordion
        sx={{
          width: "100%",
          boxShadow: 1,
        }}
      >
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls={`${venueId}-content`}
          id={`${venueId}-header`}
          sx={{
            '& .MuiAccordionSummary-content': {
              alignItems: 'center',
              justifyContent: 'space-between',
            },
          }}
        >
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            {venueName}
          </Typography>
          <IconButton 
            onClick={(e) => {
              e.stopPropagation();
              onRemoveClick();
            }}
            size="small"
            sx={{ ml: 1 }}
          >
            <CloseIcon />
          </IconButton>
        </AccordionSummary>
        <AccordionDetails sx={{ pt: 0 }}>
          {sessionContent}
        </AccordionDetails>
      </Accordion>
    );
  }

  return (
    <Card
      sx={{
        width: { xs: "100%", sm: "100%", md: 500 },
        maxWidth: { xs: "100%", md: 500 },
        minWidth: { md: 400 },
      }}
    >
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
        {sessionContent}
      </CardContent>
    </Card>
  );
};
