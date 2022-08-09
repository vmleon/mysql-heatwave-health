import React, {useState} from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import LabEnableHeatwave from './LabEnableHeatwave';
import LabHeatwave from './LabHeatwave';
import LabFinish from './LabFinish';
import LabStep from './LabStep';
import LabInnodb from './LabInnodb';

function Wizard({setDataInnodb, setDataRapid}) {
  const steps = ['InnoDB', 'Enable Heatwave', 'Heatwave'];
  const labs = [
    <LabInnodb setDataInnodb={setDataInnodb} />,
    <LabEnableHeatwave />,
    <LabHeatwave />,
    <LabFinish />,
  ];
  const [activeStep, setActiveStep] = useState(0);

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleReset = () => {
    setActiveStep(0);
  };

  return (
    <Box style={{display: 'flex'}}>
      <Box sx={{padding: '1rem'}}>
        <Stepper activeStep={activeStep}>
          {steps.map((label) => {
            const stepProps = {};
            const labelProps = {};
            <Typography variant="caption">Some text</Typography>;
            return (
              <Step key={label} {...stepProps}>
                <StepLabel {...labelProps}>{label}</StepLabel>
              </Step>
            );
          })}
        </Stepper>
        <LabStep
          steps={steps}
          activeStep={activeStep}
          handleNext={handleNext}
          handleBack={handleBack}
          handleReset={handleReset}
        >
          {labs[activeStep]}
        </LabStep>
      </Box>
    </Box>
  );
}

export default Wizard;
