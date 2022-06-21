import React, {useState, useEffect} from 'react';
import Container from '@mui/material/Container';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import Typography from '@mui/material/Typography';
import TextareaAutosize from '@mui/material/TextareaAutosize';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import SendIcon from '@mui/icons-material/Send';
import Stack from '@mui/material/Stack';
import Alert from '@mui/material/Alert';
import {VictoryBar, VictoryChart, VictoryAxis, VictoryTheme} from 'victory';

const dataMysql = [
  {testNumber: 1, responseTime: 13000},
  {testNumber: 2, responseTime: 16500},
  {testNumber: 3, responseTime: 14250},
  {testNumber: 4, responseTime: 19000},
];
const dataHeatwave = [
  {testNumber: 1, responseTime: 1200},
  {testNumber: 2, responseTime: 1350},
  {testNumber: 3, responseTime: 1475},
  {testNumber: 4, responseTime: 1800},
];

function Dashboard() {
  const [text, setText] = useState('SELECT * FROM heartrate_seconds;');
  const [data, setData] = useState([]);
  const [error, setError] = useState('');

  const sendQuery = async (query) => {
    try {
      const results = await (
        await fetch('/api/v1/perf', {
          method: 'POST',
          body: JSON.stringify({query: text}),
          headers: {
            'Content-Type': 'application/json',
          },
        })
      ).json();
      setData(results.map((t, idx) => ({name: `${idx + 1}`, responseTime: t})));
      setError('');
    } catch (error) {
      setError(`Error running query: ${error.message}`);
      setData([]);
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
          onChange={({target}) => setText(target.value)}
          aria-label="query"
          minRows={3}
          placeholder="Query"
          value={text}
        />
        {error && <Alert severity="error">{error}</Alert>}
        <Button variant="contained" endIcon={<SendIcon />} onClick={sendQuery}>
          Send
        </Button>
      </Stack>
      <Box
        sx={{
          width: 500,
          height: 500,
        }}
      >
        <VictoryChart domainPadding={20} theme={VictoryTheme.material}>
          <VictoryAxis
            tickValues={data.map((d, idx) => idx + 1)}
            tickFormat={data.map((d) => d.name)}
          ></VictoryAxis>
          <VictoryAxis dependentAxis tickFormat={(x) => `${x}ms`}></VictoryAxis>
          <VictoryBar data={data} x="name" y="responseTime" />
        </VictoryChart>
        <Typography align="center">Innodb Engine vs Heatwave Response times</Typography>
      </Box>
    </Container>
  );
}

export default Dashboard;
