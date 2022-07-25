import React from 'react';
import Box from '@mui/material/Box';
import {max, min} from 'd3-array';
import {curveLinear} from '@visx/curve';
import {Group} from '@visx/group';
import {LinePath} from '@visx/shape';
import {AxisLeft, AxisBottom} from '@visx/axis';
import {GridRows, GridColumns} from '@visx/grid';
import {LegendOrdinal} from '@visx/legend';
import {scaleLinear, scaleOrdinal} from '@visx/scale';
import {MarkerCircle, MarkerLine} from '@visx/marker';
import {lightBlue, red} from '@mui/material/colors';

const getPoint = (d) => d.number;
const getResponseTime = (d) => d.responseTime;

const roundCorner = 7;
const margin = 20;
const innerMargin = 25;

const innodbColor = lightBlue[500];
const rapidsColor = red[500];

const colorScale = scaleOrdinal({
  domain: ['InnoDB', 'Rapids'],
  range: [innodbColor, rapidsColor],
});

function Chart({innodbData, rapidData, width = 500, height = 400}) {
  if (innodbData.length === 0 && rapidData.length === 0) {
    return null;
  }

  const maxPoint = max(innodbData.map(getPoint));
  const maxResponseTime = max(innodbData.map(getResponseTime));
  const minResponseTime = min(innodbData.map(getResponseTime));

  const pointScale = scaleLinear({
    domain: [0, maxPoint],
    range: [margin + innerMargin, width - margin - innerMargin],
  });

  const responseTimeScale = scaleLinear({
    domain: [max([minResponseTime - 50, 0]), maxResponseTime + 5],
    range: [height - margin - innerMargin, margin + innerMargin],
  });

  return (
    <Box sx={{margin: 2}}>
      <LegendOrdinal scale={colorScale} direction="row" margin="5px" labelMargin="0 15px 0 0" />
      <svg width={width} height={height}>
        <MarkerCircle id="marker-circle" fill="#333" size={2} refX={2} />
        <MarkerLine id="marker-line" fill="#333" size={16} strokeWidth={1} />
        <rect width={width} height={height} fill="#efefef" rx={roundCorner} ry={roundCorner} />
        <GridRows scale={responseTimeScale} width={width} height={height} stroke={lightBlue[100]} />
        <GridColumns scale={pointScale} width={width} height={height} stroke={lightBlue[100]} />
        <Group left={14}>
          {innodbData.map((d, idx) => (
            <circle
              key={idx}
              r={5}
              cx={pointScale(getPoint(d))}
              cy={responseTimeScale(getResponseTime(d))}
            />
          ))}
          <LinePath
            curve={curveLinear}
            data={innodbData}
            x={(d) => pointScale(getPoint(d))}
            y={(d) => responseTimeScale(getResponseTime(d))}
            stroke={innodbColor}
            strokeWidth={2}
            markerMid="url(#marker-circle)"
          />
          <text x="-130" y={innerMargin + 10} transform="rotate(-90)" fontSize={10}>
            Response Time (ms)
          </text>
          <text x={width - margin - innerMargin - 10} y={height - 10} fontSize={10}>
            Test #
          </text>
          <AxisBottom top={width - margin - innerMargin - 100} scale={pointScale} numTicks={5} />
          <AxisLeft left={innerMargin} scale={responseTimeScale} numTicks={10} />
        </Group>
        <Group left={13}>
          {rapidData.map((d, idx) => (
            <circle
              key={idx}
              r={5}
              cx={pointScale(getPoint(d))}
              cy={responseTimeScale(getResponseTime(d))}
            />
          ))}
          <LinePath
            curve={curveLinear}
            data={rapidData}
            x={(d) => pointScale(getPoint(d))}
            y={(d) => responseTimeScale(getResponseTime(d))}
            stroke={rapidsColor}
            strokeWidth={2}
            markerMid="url(#marker-circle)"
          />
        </Group>
      </svg>
    </Box>
  );
}

export default Chart;
