import React, {useState} from 'react';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import TextareaAutosize from '@mui/material/TextareaAutosize';
import Button from '@mui/material/Button';
import LoadingButton from '@mui/lab/LoadingButton';
import SendIcon from '@mui/icons-material/Send';
import Stack from '@mui/material/Stack';
import Alert from '@mui/material/Alert';
import Chart from '../components/Chart';

function Dashboard() {
  const [query, setQuery] = useState('SELECT * FROM calories;');
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);
  const [error, setError] = useState('');

  const sendQuery = async () => {
    try {
      setLoading(true);
      const results = await (
        await fetch('/api/v1/perf', {
          method: 'POST',
          body: JSON.stringify({query: query}),
          headers: {
            'Content-Type': 'application/json',
          },
        })
      ).json();
      if (results.error) {
        setData([]);
        setError(results.message);
      } else {
        setData(results.map((t, idx) => ({name: `${idx + 1}`, responseTime: t})));
        setError('');
      }
    } catch (error) {
      setError(`Error running query: ${error.message}`);
      setData([]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container maxWidth="sm" style={{padding: '1rem'}}>
      <Stack direction="column" spacing={1}>
        <Typography
          variant="h6"
          noWrap
          component="a"
          href="/"
          sx={{
            mr: 2,
            display: {xs: 'none', md: 'flex'},
            fontFamily: 'monospace',
            fontWeight: 700,
            letterSpacing: '.3rem',
            color: 'inherit',
            textDecoration: 'none',
          }}
        >
          Query:
        </Typography>
        <TextareaAutosize
          onChange={({target}) => setQuery(target.value)}
          aria-label="query"
          minRows={3}
          placeholder="Query"
          value={query}
        />
        {error && <Alert severity="error">{error}</Alert>}
        <LoadingButton
          variant="contained"
          loading={loading}
          endIcon={<SendIcon />}
          onClick={sendQuery}
        >
          Send
        </LoadingButton>
      </Stack>
      <Chart data={data} />
    </Container>
  );
}

export default Dashboard;
