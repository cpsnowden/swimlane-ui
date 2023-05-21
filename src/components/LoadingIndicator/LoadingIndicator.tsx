import { CircularProgress, Stack, Typography } from "@mui/material";

interface LoadingIndicatorProps {
  text: string;
}

export const LoadingIndicator: React.FC<LoadingIndicatorProps> = ({ text }) => {
  return (
    <Stack alignItems="center" spacing={2}>
      <CircularProgress />
      <Typography
        variant="h6"
        sx={{
          textAlign: "center",
        }}
      >
        {text}
      </Typography>
    </Stack>
  );
};
