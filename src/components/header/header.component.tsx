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
      {/* Render secondary toolbar to prevent any overlap as per https://mui.com/material-ui/react-app-bar/#fixed-placement */}
      <Toolbar />
    </>
  );
};
