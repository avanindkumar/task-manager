import { Container, Paper } from "@mui/material";
import { useEffect, useState } from "react";
import "./App.css";
import MyAppBar from "./components/MyAppBar";
import Tasks from "./components/Tasks";
import NewTaskModal from "./components/NewTaskModal";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterMoment } from "@mui/x-date-pickers/AdapterMoment";
import useHttp from "./Hooks/useHttp";
import ErrorModal from "./UIElements/ErrorModal";

function App() {
  const [inputModal, setInputModal] = useState(false);
  const [tasks, setTasks] = useState([]);
  const { isLoading, error, clearError, sendRequest } = useHttp();

  useEffect(() => {
    const fetchTasks = async () => {
      const data = await sendRequest("/tasks");
      if (data) {
        setTasks(data);
      }
    };
    fetchTasks();
  }, [sendRequest, setTasks]);

  const onClick = () => {
    setInputModal(true);
  };
  const handleTaskDelete = async (id) => {
    setInputModal(false);
    const data = await sendRequest("/tasks/" + id, "DELETE");
    if (data) {
      setTasks((pervTasks) => pervTasks.filter((task) => task.id !== id));
    }
  };
  const handleTaskUpdate = async ({
    id,
    title,
    description,
    time,
    date,
    reminder,
  }) => {
    setInputModal(false);
    const data = await sendRequest(
      "/tasks/" + id,
      "PATCH",
      JSON.stringify({
        title,
        description,
        time,
        date,
        reminder,
      }),
      {
        "Content-Type": "Application/json",
      }
    );
    if (data) {
      setTasks((prevTasks) =>
        prevTasks.map((task) => {
          if (task.id === id) {
            return { id, title, description, time, data, reminder };
          }
          return task;
        })
      );
    }
  };
  const handleInputModalClose = () => {
    setInputModal(false);
  };
  const handleNewTaskSubmit = async ({
    title,
    description,
    time,
    date,
    reminder,
  }) => {
    setInputModal(false);
    const data = await sendRequest(
      "/tasks",
      "POST",
      JSON.stringify({
        title,
        description,
        time,
        date,
        reminder,
      }),
      {
        "Content-Type": "Application/json",
      }
    );
    if (data) {
      setTasks((prevTasks) => [
        ...prevTasks,
        { id: data.id, title, description, time, date, reminder },
      ]);
    }
  };

  return (
    <LocalizationProvider dateAdapter={AdapterMoment}>
      <Paper elevation={0}>
        <MyAppBar onClick={onClick} />
        <Container maxWidth="lg" sx={{ marginTop: "20px" }}>
          <ErrorModal error={error} clearError={clearError} />
          {!isLoading && !error && (
            <Tasks
              isLoading={isLoading}
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
          onUpdate={handleTaskUpdate}
        />
      </Paper>
    </LocalizationProvider>
  );
}

export default App;
