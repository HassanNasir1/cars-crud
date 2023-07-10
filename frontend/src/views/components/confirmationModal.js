// ** React Imports
import { Fragment, useState } from 'react'

// ** MUI Imports
import Button from '@mui/material/Button'
import Dialog from '@mui/material/Dialog'
import DialogTitle from '@mui/material/DialogTitle'
import DialogContent from '@mui/material/DialogContent'
import DialogActions from '@mui/material/DialogActions'
import DialogContentText from '@mui/material/DialogContentText'
import CircularProgress from '@mui/material/CircularProgress'
import Box from '@mui/material/Box'
import { useSelector } from 'react-redux'

/**
 * ConfirmationModal component for displaying a confirmation dialog.
 * @component
 * @param {Object} props - The component props.
 * @param {boolean} props.open - Indicates whether the dialog is open or not.
 * @param {function} props.handleClose - The function to handle dialog close.
 * @param {Object} props.row - The data object associated with the row being confirmed.
 * @param {string} props.title - The title of the confirmation.
 * @param {function} props.handleAgree - The function to handle the agree action.
 * @param {boolean} props.loading - Indicates whether the confirmation is in a loading state or not.
 * @returns {JSX.Element} ConfirmationModal component.
 */
const ConfirmationModal = ({ open, handleClose, row, title, handleAgree, loading }) => {
  // ** State

  return (
    <Fragment>
      <Dialog
        open={open}
        disableEscapeKeyDown
        aria-labelledby='alert-dialog-title'
        aria-describedby='alert-dialog-description'
        onClose={(event, reason) => {
          if (reason !== 'backdropClick') {
            handleClose()
          }
        }}
      >
        <DialogTitle id='alert-dialog-title'>{`Delete ${title}`}</DialogTitle>
        <DialogContent>
          <DialogContentText id='alert-dialog-description'>
            {`Are you sure you want to delete this ${title}: `} {<b>{row?.name}</b>}
          </DialogContentText>
        </DialogContent>
        {loading ? (
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'center',
              marginTop: '10px',
              marginBottom: '10px'
            }}
          >
            <CircularProgress />
          </Box>
        ) : (
          <DialogActions className='dialog-actions-dense'>
            <Button onClick={handleClose}>Disagree</Button>
            <Button onClick={handleAgree}>Agree</Button>
          </DialogActions>
        )}
      </Dialog>
    </Fragment>
  )
}

export default ConfirmationModal
