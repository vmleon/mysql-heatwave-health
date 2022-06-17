import React, {useState} from 'react';
import Container from '@mui/material/Container';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';

function Config() {
  const [engine, setEngine] = useState('mysql');

  const handleChange = (event, newEngine) => {
    setEngine(newEngine);
  };
  return (
    <Container sx="lg" style={{padding: '1rem'}}>
      <ToggleButtonGroup color="primary" value={engine} exclusive onChange={handleChange}>
        <ToggleButton value="mysql">MySQL</ToggleButton>
        <ToggleButton value="heatwave">Heatwave</ToggleButton>
      </ToggleButtonGroup>
    </Container>
  );
}

export default Config;
