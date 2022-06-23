import React from 'react';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import {VictoryBar, VictoryChart, VictoryAxis, VictoryTheme} from 'victory';

function Chart({data}) {
  if (!data || !data.length) {
    return null;
  }
  return (
    <Box
      sx={{
        width: 600,
        height: 500,
      }}
    >
      <VictoryChart domainPadding={20} theme={VictoryTheme.material}>
        <VictoryAxis
          tickValues={data.map((d, idx) => idx + 1)}
          tickFormat={data.map((d) => d.name)}
        ></VictoryAxis>
        <VictoryAxis dependentAxis tickFormat={(y) => `${Math.floor(y)}ms`}></VictoryAxis>
        <VictoryBar data={data} x="name" y="responseTime" />
      </VictoryChart>
      <Typography align="center">Innodb Engine (response time)</Typography>
    </Box>
  );
}

export default Chart;
