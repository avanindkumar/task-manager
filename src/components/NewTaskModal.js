import {
  Box,
  Button,
  Checkbox,
  Modal,
  TextField,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { TimePicker } from "@mui/x-date-pickers/TimePicker";
import { DatePicker } from "@mui/x-date-pickers";
import { v4 as uuidv4 } from "uuid";
import moment from "moment/moment";

const NewTaskModal = ({
  open,
  onInputModalClose,
  onSubmit,
  onUpdate,
  isUpdating,
  task,
}) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [time, setTime] = useState(null);
  const [date, setDate] = useState(null);
  const [reminder, setReminder] = useState(false);
  useEffect(() => {
    if (!isUpdating) return;
    if (!task) return;
    setTitle(task.title);
    setDescription(task.description);
    setTime(moment(task.time, "LT"));
    setDate(moment(task.date, "DD-MM-YYYY"));
    setReminder(task.reminder);
  }, [task, isUpdating, open]);

  const handleClose = () => {
    onInputModalClose();
  };
  const handleTitle = (e) => {
    setTitle(e.target.value);
  };
  const handleDescription = (e) => {
    setDescription(e.target.value);
  };
  const handleTime = (newTime) => {
    setTime(newTime);
  };
  const handleDate = (newDate) => {
    setDate(newDate);
    console.log(date);
  };
  const handleReminder = (e) => {
    setReminder(e.target.checked);
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    const id = uuidv4();
    const newTask = {
      id,
      title,
      description,
      time: moment(time).format("LT"),
      date: moment(date).format("DD-MM-YYYY"),
      reminder,
    };
    handleReset();
    if (isUpdating) {
      const updatedTask = {
        id: task.id,
        title,
        description,
        time: moment(time).format("LT"),
        date: moment(date).format("DD-MM-YYYY"),
        reminder,
      };
      onUpdate(updatedTask);
      return;
    }
    onSubmit(newTask);
  };
  const handleReset = () => {
    setTitle("");
    setDescription("");
    setTime(null);
    setDate(null);
  };

  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: "60%",
          bgcolor: "background.paper",
          boxShadow: 24,
          p: 4,
          borderRadius: "10px",
          outline: "none",
        }}
      >
        <Typography variant="h4" py={3} textAlign="center">
          Enter Task Details
        </Typography>
        <form onSubmit={handleSubmit}>
          <Box component="div" display="flex" flexDirection="column">
            <TextField
              required
              label="Task Title"
              value={title}
              onChange={handleTitle}
              sx={{ pb: 3 }}
            />
            <TextField
              required
              multiline
              maxRows={4}
              sx={{ pb: 3 }}
              label="Task Description"
              value={description}
              onChange={handleDescription}
            />
          </Box>
          <Box
            component="div"
            display="flex"
            justifyContent="space-between"
            alignItems="center"
            pb={3}
          >
            <TimePicker
              label="Select Time"
              renderInput={(param) => <TextField {...param} />}
              value={time}
              onChange={handleTime}
            />
            <DatePicker
              label="Select Date"
              renderInput={(param) => <TextField {...param} />}
              value={date}
              onChange={handleDate}
            />
            <Typography component="p" noWrap>
              <Checkbox
                checked={reminder}
                onChange={handleReminder}
                inputProps={{ "aria-label": "controlled" }}
              />
              Reminder
            </Typography>
          </Box>
          <Box
            component="div"
            display="flex"
            justifyContent="space-between"
            pb={3}
          >
            <Button variant="contained" onClick={handleSubmit}>
              {isUpdating ? "Update" : "Submit"}
            </Button>
            <Button variant="contained" color="error" onClick={handleReset}>
              Reset
            </Button>
          </Box>
        </form>
      </Box>
    </Modal>
  );
};

export default NewTaskModal;
