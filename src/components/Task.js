import { Box, Button, Grid, Modal, Typography } from "@mui/material";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import React, { useState } from "react";
import CloseIcon from "@mui/icons-material/Close";
import ConfirmationModal from "../UIElements/ConfirmationModal";
import NewTaskModal from "./NewTaskModal";

const Task = ({ task, onDelete, onUpdate }) => {
  const [modalOpen, setModal] = useState(false);
  const [deleteModal, setDeleteModal] = useState(false);
  const [updateModal, setUpdateModal] = useState(false);
  const handleClose = (event) => {
    setModal(false);
  };
  const handleUpdateModalClose = () => {
    setUpdateModal(false);
  };
  const handleTaskDelete = () => {
    onDelete(task.id);
    setModal(false);
  };
  const handleTaskUpdate = (newTask, id) => {
    onUpdate(newTask, id);
    setUpdateModal(false);
  };
  return (
    <>
      <Grid item xs={2} sm={4} md={4}>
        <Box
          component={"div"}
          margin={2}
          padding={2}
          boxShadow="rgba(0, 0, 0, 0.35) 0px 5px 15px"
          borderRadius="10px"
          borderLeft={task.reminder ? "5px solid green" : "5px solid orange"}
          onClick={() => {
            setModal(true);
          }}
        >
          <Typography variant="h5" noWrap textOverflow="ellipsis">
            {task.title}
          </Typography>
          <Box
            component="div"
            display="flex"
            justifyContent="space-between"
            my={2}
          >
            <Box component="div" display="flex">
              <CalendarTodayIcon fontSize="small" />
              <Typography variant="body" marginLeft={1}>
                {task.date}
              </Typography>
            </Box>
            <Box component="div" display="flex">
              <AccessTimeIcon fontSize="small" />
              <Typography variant="body" marginLeft={1}>
                {task.time}
              </Typography>
            </Box>
          </Box>
          <Typography
            variant="p"
            sx={{
              overflow: "hidden",
              textOverflow: "ellipsis",
              display: "-webkit-box",
              WebkitLineClamp: "2",
              WebkitBoxOrient: "vertical",
            }}
          >
            {task.description}
          </Typography>
        </Box>
      </Grid>
      <Modal
        open={modalOpen}
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
            width: 400,
            bgcolor: "background.paper",
            boxShadow: "rgba(0, 0, 0, 0.35) 0px 5px 15px",
            p: 4,
            borderRadius: "10px",
            outline: "none",
          }}
        >
          <Box
            component={"div"}
            sx={{ display: "flex", justifyContent: "flex-end", width: "100%" }}
          >
            <CloseIcon fontSize="small" onClick={handleClose} />
          </Box>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            {task.title}
          </Typography>
          <Typography id="modal-modal-description" sx={{ my: 2 }}>
            {task.description}
          </Typography>
          <Box
            component="div"
            sx={{ display: "flex", justifyContent: "space-between" }}
          >
            <Button
              variant="contained"
              color="warning"
              onClick={() => {
                setUpdateModal(true);
              }}
            >
              Update
            </Button>
            <Button
              variant="contained"
              color="error"
              onClick={() => {
                setDeleteModal(true);
              }}
            >
              Delete
            </Button>
          </Box>
        </Box>
      </Modal>
      <ConfirmationModal
        text="Are You Sure"
        confirmAction={handleTaskDelete}
        confirmText="Delete"
        cancelAction={() => {
          setDeleteModal(false);
        }}
        cancelText="Cancel"
        modalOpen={deleteModal}
      />
      <NewTaskModal
        isUpdating
        task={task}
        open={updateModal}
        onInputModalClose={handleUpdateModalClose}
        onUpdate={handleTaskUpdate}
      />
    </>
  );
};

export default Task;
