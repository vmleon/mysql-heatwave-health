import Box from '@mui/material/Box';
import {Typography} from '@mui/material';

function Footer() {
  return (
    <Box
      style={{
        position: 'fixed',
        left: 0,
        bottom: 0,
        width: '100%',
        textAlign: 'center',
      }}
    >
      <Typography align="center">with &hearts; from EMEA Product Strategy</Typography>
    </Box>
  );
}

export default Footer;
