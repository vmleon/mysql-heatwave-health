import React, {useEffect, useState} from 'react';
import Box from '@mui/material/Box';
import {Outlet, useNavigate} from 'react-router-dom';
import Chart from './Chart';
import Wizard from './Wizard';
import NavBar from '../NavBar';

function Workshop({setToken}) {
  const navigate = useNavigate();

  const [logout, setLogout] = useState(false);
  const [dataInnodb, setDataInnodb] = useState([]);
  const [dataRapid, setDataRapid] = useState([]);

  useEffect(() => {
    if (logout) {
      navigate('/');
    }
  }, [logout, navigate]);

  useEffect(() => {
    if (logout) {
      localStorage.removeItem('token');
      setLogout(false);
      setToken('');
    }
  }, [logout, setToken]);

  const requestLogout = () => {
    setLogout(true);
  };

  return (
    <Box>
      <NavBar requestLogout={requestLogout} />
      <Box sx={{display: 'flex', flexDirection: 'row', justifyContent: 'space-evenly'}}>
        <Wizard style={{flexGrow: 1}} setDataInnodb={setDataInnodb} setDataRapid={setDataRapid} />
        <Chart innodbData={dataInnodb} rapidData={dataRapid} />
      </Box>
      <Outlet />
    </Box>
  );
}

export default Workshop;
