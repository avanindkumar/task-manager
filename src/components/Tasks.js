import { Grid, Typography } from '@mui/material';
import React from 'react'
import Task from './Task'

const Tasks = ({ tasks, onDelete }) => {
  return (
    <>
      <Typography variant='h4' textAlign='center' pb={3}>Task List</Typography>
      <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 12 }}>
        {tasks.map((task) => <Task task={task} key={task.id} onDelete={onDelete} />)}
      </Grid>
    </>
  )
}

export default Tasks;