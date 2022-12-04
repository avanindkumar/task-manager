import { Box, Button, Grid, Modal, Typography } from '@mui/material'
import AccessTimeIcon from '@mui/icons-material/AccessTime'
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import React, { useState } from 'react'
import CloseIcon from '@mui/icons-material/Close';
const Task = ({ task, onDelete }) => {
  const [modalOpen, setModalOpen] = useState(false);
  const handleClose = (event) => { setModalOpen(false) }
  const handleTaskDelete = () => {
    onDelete(task.id)
    setModalOpen(false);
  }

  return (
    <>
      <Grid xs={6}>
        <Box component={'div'} margin={2} padding={2} boxShadow='rgba(0, 0, 0, 0.35) 0px 5px 15px' borderRadius='10px' onClick={() => { setModalOpen(true) }}>
          <Typography variant='h5' noWrap textOverflow='ellipsis'>{task.title}</Typography>
          <Box component='div' display='flex' justifyContent='space-between' my={2}>
            <Box component='div' display='flex'>
              <CalendarTodayIcon fontSize='small' />
              <Typography variant='body' marginLeft={1}>{task.date}</Typography>
            </Box>
            <Box component='div' display='flex'>
              <AccessTimeIcon fontSize='small' />
              <Typography variant='body' marginLeft={1}>{task.time}</Typography>
            </Box>
          </Box>
          <Typography variant='p' noWrap textOverflow='ellipsis' mr={2}>{task.title}</Typography>
        </Box>
      </Grid>
      <Modal
        open={modalOpen}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: 400,
          bgcolor: 'background.paper',
          boxShadow: 'rgba(0, 0, 0, 0.35) 0px 5px 15px',
          p: 4,
          borderRadius: '10px',
          outline: 'none'
        }} >
          <Box component={'div'} sx={{ display: 'flex', justifyContent: 'flex-end', width: '100%' }}><CloseIcon fontSize='small' onClick={handleClose} /></Box>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            {task.title}
          </Typography>
          <Typography id="modal-modal-description" sx={{ my: 2 }}>
            {task.details}
          </Typography>
          <Box component='div' sx={{ display: 'flex', justifyContent: 'space-between' }}>
            <Button variant='contained' color='warning'>Update</Button>
            <Button variant='contained' color='error' onClick={handleTaskDelete}>Delete</Button>
          </Box>
        </Box>
      </Modal>
    </>
  )
}

export default Task