import { Box, Button, Modal, Typography } from "@mui/material";
import React from "react";

const ConfirmationModal = ({
  text,
  confirmAction,
  confirmText,
  cancelAction,
  cancelText,
  modalOpen,
}) => {
  return (
    <Modal
      open={modalOpen}
      onClose={cancelAction}
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
        <Typography
          id="modal-modal-title"
          variant="h6"
          component="h2"
          textAlign={"center"}
        >
          {text}
        </Typography>
        <Box
          component="div"
          sx={{ display: "flex", justifyContent: "space-between" }}
        >
          <Button variant="contained" color="success" onClick={cancelAction}>
            {cancelText}
          </Button>
          <Button variant="contained" color="error" onClick={confirmAction}>
            {confirmText}
          </Button>
        </Box>
      </Box>
    </Modal>
  );
};

export default ConfirmationModal;
