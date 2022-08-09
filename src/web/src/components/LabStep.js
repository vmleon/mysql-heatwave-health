import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import React, {Fragment} from 'react';

function LabStep({children, steps, activeStep, handleNext, handleBack, handleReset}) {
  if (!steps) return null;
  if (activeStep === steps.length) {
    return (
      <Fragment>
        {children}
        <Box sx={{display: 'flex', flexDirection: 'row', pt: 2}}>
          <Box sx={{flex: '1 1 auto'}} />
          <Button onClick={handleReset}>Reset</Button>
        </Box>
      </Fragment>
    );
  }
  return (
    <Fragment>
      {children}
      <Box sx={{display: 'flex', flexDirection: 'row', pt: 2}}>
        <Button color="inherit" disabled={activeStep === 0} onClick={handleBack} sx={{mr: 1}}>
          Back
        </Button>
        <Box sx={{flex: '1 1 auto'}} />
        <Button onClick={handleNext}>{activeStep === steps.length - 1 ? 'Finish' : 'Next'}</Button>
      </Box>
    </Fragment>
  );
}

export default LabStep;
