import React, {useEffect, useState} from 'react';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import LoadingButton from '@mui/lab/LoadingButton';
import Alert from '@mui/material/Alert';
import SendIcon from '@mui/icons-material/Send';

function LabEnableHeatwave() {
  const [result, setResult] = useState();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const requestEnableHeatwave = async () => {
    setLoading(true);
    setError('');
    try {
      const body = await fetch('/api/v1/rapid', {
        method: 'POST',
        body: JSON.stringify({operation: 'enable'}),
        headers: {
          'Content-Type': 'application/json',
          Authorization: localStorage.getItem('token'),
        },
      });
      const results = await body.json();
      if (body.status === 200) {
        setResult(results);
        setError(undefined);
      } else {
        setResult(undefined);
        setError(results.message);
      }
    } catch (error) {
      setResult(undefined);
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box>
      <Stack direction="column" spacing={1}>
        <Typography variant="h6">Enable Heatwave</Typography>
        <LoadingButton
          variant="contained"
          loading={loading}
          endIcon={<SendIcon />}
          onClick={() => requestEnableHeatwave()}
        >
          Enable
        </LoadingButton>
        {result && <Alert severity="success">{JSON.stringify(result)}</Alert>}
        {error && <Alert severity="error">{error}</Alert>}
      </Stack>
    </Box>
  );
}

export default LabEnableHeatwave;
