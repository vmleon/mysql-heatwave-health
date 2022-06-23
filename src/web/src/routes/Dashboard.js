import React, {useState} from 'react';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import TextareaAutosize from '@mui/material/TextareaAutosize';
import LoadingButton from '@mui/lab/LoadingButton';
import Slider from '@mui/material/Slider';
import SendIcon from '@mui/icons-material/Send';
import Stack from '@mui/material/Stack';
import Alert from '@mui/material/Alert';
import Chart from '../components/Chart';

function Dashboard() {
  const [query, setQuery] = useState(
    'SELECT count(*) FROM heartrate_seconds a join daily_activities b on a.id=b.id where a.value>80;',
  );
  const [loading, setLoading] = useState(false);
  const [number, setNumber] = useState(5);
  const [limit, setLimit] = useState(10000);
  const [data, setData] = useState([]);
  const [error, setError] = useState('');

  const sendQuery = async () => {
    setLoading(true);
    setError('');
    try {
      const body = await fetch('/api/v1/perf', {
        method: 'POST',
        body: JSON.stringify({query: query, number: number, limit: limit}),
        headers: {
          'Content-Type': 'application/json',
        },
      });
      const results = await body.json();
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
          sx={{
            mr: 2,
            display: {xs: 'none', md: 'flex'},
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
        <Typography
          variant="h7"
          noWrap
          sx={{
            mr: 2,
            display: {xs: 'none', md: 'flex'},
          }}
        >
          Number of executions:
        </Typography>
        <Slider
          aria-label="Number of executions"
          defaultValue={5}
          valueLabelDisplay="auto"
          disabled={loading}
          onChange={({target}) => setNumber(target.value)}
          step={1}
          marks
          min={1}
          max={10}
        />
        <Typography
          variant="h7"
          noWrap
          sx={{
            mr: 2,
            display: {xs: 'none', md: 'flex'},
          }}
        >
          Limit of rows to fetch:
        </Typography>
        <Slider
          aria-label="Number of rows to fetch"
          defaultValue={10000}
          valueLabelDisplay="auto"
          disabled={loading}
          onChange={({target}) => setLimit(target.value)}
          step={1000}
          marks
          min={1000}
          max={50000}
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
