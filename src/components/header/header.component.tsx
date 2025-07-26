import { AppBar, Container, Toolbar, Typography } from "@mui/material";

export const Header: React.FC = () => {
  return (
    <>
      <AppBar position="fixed">
        <Container maxWidth="xl">
          <Toolbar sx={{ justifyContent: "center" }}>
            <Typography variant="h6" color="inherit" component="div">
              SwimLane
            </Typography>
          </Toolbar>
        </Container>
      </AppBar>
      <Toolbar />
    </>
  );
};
