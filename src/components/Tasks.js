import { Grid, Skeleton, Typography } from "@mui/material";
import React from "react";
import Task from "./Task";

const Tasks = ({ tasks, onDelete, onUpdate, isLoading }) => {
  const renderLoader = () => {
    if (!isLoading) return;
    return (
      <>
        <Grid item xs={2} sm={4} md={4} height={200}>
          <Skeleton width={"100%"} height={300} />
        </Grid>
        <Grid item xs={2} sm={4} md={4} height={200}>
          <Skeleton width={"100%"} height={300} />
        </Grid>
        <Grid item xs={2} sm={4} md={4} height={200}>
          <Skeleton width={"100%"} height={300} />
        </Grid>
        <Grid item xs={2} sm={4} md={4} height={200}>
          <Skeleton width={"100%"} height={300} />
        </Grid>
        <Grid item xs={2} sm={4} md={4} height={200}>
          <Skeleton width={"100%"} height={300} />
        </Grid>
        <Grid item xs={2} sm={4} md={4} height={200}>
          <Skeleton width={"100%"} height={300} />
        </Grid>
      </>
    );
  };
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
        {renderLoader()}
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
