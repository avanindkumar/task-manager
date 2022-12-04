import { Container, Paper } from '@mui/material';
import { useState } from 'react';
import './App.css';
import MyAppBar from './components/MyAppBar';
import Tasks from './components/Tasks';
import tasksList from './data.json';
import NewTaskModal from './components/NewTaskModal';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns'

function App() {
  const [inputModal, setInputModal] = useState(false)
  const [tasks, setTasks] = useState(tasksList)
  const onClick = () => {
    setInputModal(true);
  }
  const onTaskDelete = (id) => {
    const filteredTasks = tasks.filter(task => id !== task.id);
    console.log(filteredTasks);
    setTasks(filteredTasks);
  }
  const handleInputModalClose = () => {
    setInputModal(false);
  }
  const handleNewTaskSubmit = (task)=>{
    tasksList.push(task);
    setTasks((prevState)=>{return {...prevState,task}});
    setInputModal(false);
    console.log(task);
  }
  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <Paper elevation={0} >
        <MyAppBar onClick={onClick} />
        <Container maxWidth='md' sx={{ marginTop: '20px' }}>
          <Tasks tasks={tasks} onDelete={onTaskDelete} />
        </Container>
        <NewTaskModal open={inputModal} onInputModalClose={handleInputModalClose} onSubmit = {(task)=>handleNewTaskSubmit(task)}/>
      </Paper>
    </LocalizationProvider>
  );
}

export default App;
