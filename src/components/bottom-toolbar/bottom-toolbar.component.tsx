import { AppBar, IconButton, Toolbar } from "@mui/material";
import PoolOutlined from "@mui/icons-material/PoolOutlined";

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
          <PoolOutlined />
        </IconButton>
      </Toolbar>
    </AppBar>
  );
};
