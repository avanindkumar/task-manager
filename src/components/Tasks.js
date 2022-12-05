import { Grid, Typography } from "@mui/material";
import React from "react";
import Task from "./Task";

const Tasks = ({ tasks, onDelete, onUpdate }) => {
  return (
    <>
      <Typography variant="h4" textAlign="center" pb={3}>
        Task List
      </Typography>
      <Grid
        container
        spacing={{ xs: 1, md: 2 }}
        columns={{ xs: 2, sm: 8, md: 12 }}
      >
        {tasks.map((task) => (
          <Task
            task={task}
            key={task.id}
            onDelete={onDelete}
            onUpdate={onUpdate}
          />
        ))}
      </Grid>
    </>
  );
};

export default Tasks;
