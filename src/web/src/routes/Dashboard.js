import React, {useState} from 'react';
import Container from '@mui/material/Container';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import Typography from '@mui/material/Typography';
import TextareaAutosize from '@mui/material/TextareaAutosize';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import SendIcon from '@mui/icons-material/Send';
import Stack from '@mui/material/Stack';
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
  const [engine, setEngine] = useState('mysql');

  const handleChange = (event, newEngine) => {
    setEngine(newEngine);
  };

  return (
    <Container maxWidth="sm" style={{padding: '1rem'}}>
      <ToggleButtonGroup color="primary" value={engine} exclusive onChange={handleChange}>
        <ToggleButton value="mysql">MySQL</ToggleButton>
        <ToggleButton value="heatwave">Heatwave</ToggleButton>
      </ToggleButtonGroup>
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
          aria-label="minimum height"
          minRows={3}
          placeholder="Minimum 3 rows"
          value="SELECT * FROM TABLE;"
        />
        <Button variant="contained" endIcon={<SendIcon />}>
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
            tickValues={[1, 2, 3, 4]}
            tickFormat={['Test 1', 'Test 2', 'Test 3', 'Test 4']}
          ></VictoryAxis>
          <VictoryAxis dependentAxis tickFormat={(x) => `${x / 1000}s`}></VictoryAxis>
          <VictoryBar data={dataMysql} x="testNumber" y="responseTime" />
        </VictoryChart>
        <Typography align="center">Innodb Engine vs Heatwave Response times</Typography>
      </Box>
    </Container>
  );
}

export default Dashboard;
