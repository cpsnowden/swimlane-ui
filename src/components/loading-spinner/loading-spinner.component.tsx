import { CircularProgress, Stack, Typography } from "@mui/material";

interface LoadingSpinnerProps {
  text: string;
}

export const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({ text }) => {
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
