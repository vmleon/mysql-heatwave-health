import React, {useState} from 'react';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import TextareaAutosize from '@mui/material/TextareaAutosize';
import LoadingButton from '@mui/lab/LoadingButton';
import Slider from '@mui/material/Slider';
import Stack from '@mui/material/Stack';
import Alert from '@mui/material/Alert';
import SendIcon from '@mui/icons-material/Send';

const defaultQuery = `SELECT count(*) 
  FROM heartrate_seconds a 
    join daily_activities b on a.id = b.id 
    join sleep_day c on c.id = b.id 
  where a.value > 80 and b.total_distance > 7.0 
    and c.total_minutes_asleep > 350;`;

function Lab0({setDataInnodb}) {
  const [query, setQuery] = useState(defaultQuery);
  const [loading, setLoading] = useState(false);
  const [number, setNumber] = useState(5);
  const [limit, setLimit] = useState(10000);
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
          Authorization: localStorage.getItem('token'),
        },
      });
      const results = await body.json();
      if (results.error) {
        setDataInnodb([]);
        setError(results.message);
      } else {
        setDataInnodb(results);
        setError('');
      }
    } catch (error) {
      setError(`Error running query: ${error.message}`);
      setDataInnodb([]);
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
    </Container>
  );
}

export default Lab0;
