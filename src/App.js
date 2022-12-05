import { Container, Paper } from "@mui/material";
import { useState } from "react";
import "./App.css";
import MyAppBar from "./components/MyAppBar";
import Tasks from "./components/Tasks";
import NewTaskModal from "./components/NewTaskModal";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterMoment } from "@mui/x-date-pickers/AdapterMoment";

const DUMMY_TASKS = [
  {
    id: 1,
    title: "interdum in ante vestibulum ante ipsum primis",
    description:
      "aliquam sit amet diam in magna bibendum imperdiet nullam orci pede venenatis non sodales sed tincidunt eu felis fusce posuere felis sed lacus morbi sem mauris laoreet ut rhoncus aliquet pulvinar sed nisl nunc rhoncus dui vel sem sed sagittis nam congue risus semper porta volutpat quam pede lobortis ligula sit amet eleifend pede libero quis orci nullam molestie nibh in",
    time: "7:34 AM",
    date: "06.01.2022",
    reminder: false,
  },
  {
    id: 2,
    title: "faucibus orci luctus et ultrices posuere cubilia",
    description:
      "ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae mauris viverra diam vitae quam suspendisse potenti nullam porttitor lacus at turpis donec posuere metus vitae ipsum aliquam non mauris morbi non lectus aliquam sit amet diam in magna bibendum imperdiet nullam orci pede venenatis non sodales sed tincidunt eu felis fusce posuere felis sed lacus morbi sem mauris laoreet ut rhoncus aliquet pulvinar sed nisl nunc rhoncus dui vel sem sed sagittis nam congue risus semper porta volutpat quam pede lobortis",
    time: "10:50 PM",
    date: "28.09.2022",
    reminder: false,
  },
  {
    id: 3,
    title: "dolor morbi vel lectus in quam fringilla rhoncus mauris",
    description:
      "viverra eget congue eget semper rutrum nulla nunc purus phasellus in felis donec semper sapien a libero nam dui proin leo odio porttitor id consequat in consequat ut nulla sed accumsan felis ut at dolor quis odio consequat varius",
    time: "5:58 PM",
    date: "15.03.2022",
    reminder: true,
  },
];

function App() {
  const [inputModal, setInputModal] = useState(false);
  const [tasks, setTasks] = useState(DUMMY_TASKS);

  const onClick = () => {
    setInputModal(true);
  };
  const handleTaskDelete = (id) => {
    const filteredTasks = tasks.filter((task) => id !== task.id);
    setTasks(filteredTasks);
  };
  const handleTaskUpdate = (newTask) => {
    tasks.forEach((task) => {
      if (task.id === newTask.id) {
        task.title = newTask.title;
        task.description = newTask.description;
        task.time = newTask.time;
        task.date = newTask.date;
        task.reminder = newTask.reminder;
      }
    });
  };
  const handleInputModalClose = () => {
    setInputModal(false);
  };
  const handleNewTaskSubmit = (task) => {
    setTasks((prevTasks) => [...prevTasks, task]);
    setInputModal(false);
  };

  return (
    <LocalizationProvider dateAdapter={AdapterMoment}>
      <Paper elevation={0}>
        <MyAppBar onClick={onClick} />
        <Container maxWidth="lg" sx={{ marginTop: "20px" }}>
          {tasks && (
            <Tasks
              tasks={tasks}
              onDelete={handleTaskDelete}
              onUpdate={handleTaskUpdate}
            />
          )}
        </Container>
        <NewTaskModal
          open={inputModal}
          onInputModalClose={handleInputModalClose}
          onSubmit={(task) => handleNewTaskSubmit(task)}
        />
      </Paper>
    </LocalizationProvider>
  );
}

export default App;
