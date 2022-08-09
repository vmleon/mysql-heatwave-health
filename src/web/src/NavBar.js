import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import AppBar from '@mui/material/AppBar';

function NavBar({requestLogout}) {
  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" component="div" sx={{flexGrow: 1}}>
          MySQL Heatwave Workshop
        </Typography>
        <Button color="inherit" onClick={() => requestLogout()}>
          Logout
        </Button>
      </Toolbar>
    </AppBar>
  );
}

export default NavBar;
