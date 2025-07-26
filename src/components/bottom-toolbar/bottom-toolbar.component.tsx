import { AppBar, IconButton, Toolbar } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";

interface BottomToolbarProps {
  onDrawerToggle: () => void;
}

export const BottomToolbar: React.FC<BottomToolbarProps> = ({ onDrawerToggle }) => {
  return (
    <AppBar 
      position="fixed" 
      sx={{ 
        top: 'auto', 
        bottom: 0,
        backgroundColor: 'primary.main',
      }}
    >
      <Toolbar sx={{ justifyContent: 'center' }}>
        <IconButton
          color="inherit"
          aria-label="open venue selector"
          onClick={onDrawerToggle}
          size="large"
        >
          <AddIcon />
        </IconButton>
      </Toolbar>
    </AppBar>
  );
};
