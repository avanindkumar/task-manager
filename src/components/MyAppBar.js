import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';


const MyAppBar =({onClick}) =>{
  const handleAddTask = () => { 
    onClick()
   }
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h5" component="div" sx={{ flexGrow: 1 }}>
            Task Manager
          </Typography>
          <Button color="inherit" onClick={handleAddTask}>Add Task</Button>
        </Toolbar>
      </AppBar>
    </Box>
  );
}

export default MyAppBar ; 