// ** React Imports
import { useState } from 'react'

// ** MUI Imports
import Box from '@mui/material/Box'
import Dialog from '@mui/material/Dialog'
import Button from '@mui/material/Button'
import Checkbox from '@mui/material/Checkbox'
import Typography from '@mui/material/Typography'
import DialogTitle from '@mui/material/DialogTitle'
import DialogContent from '@mui/material/DialogContent'
import FormControlLabel from '@mui/material/FormControlLabel'
import CardHeader from '@mui/material/CardHeader'

// ** Custom Component Import
import CustomTextField from 'src/@core/components/mui/text-field'

import { useDispatch, useSelector } from 'react-redux'
import { selectCategory } from 'src/store/categories'

const TableHeader = props => {
  // ** Props
  const { title, addBtnText, FormContent, open, setOpen, handleClose } = props

  const store = useSelector(state => state.categories)
  const dispatch = useDispatch()

  // ** State
  const handleDialogToggle = () => setOpen(!open)

  const onSubmit = e => {
    setOpen(false)
    e.preventDefault()
  }

  return (
    <>
      <Box
        sx={{ pb: 0, pr: 7, display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between' }}
      >
        <CardHeader title={title} />

        <Button sx={{ mb: 2 }} variant='contained' onClick={handleDialogToggle}>
          Add {addBtnText}
        </Button>
      </Box>
      <Dialog fullWidth maxWidth='md' onClose={handleClose} open={open}>
        <DialogTitle
          component='div'
          sx={{
            textAlign: 'center',
            px: theme => [`${theme.spacing(5)} !important`, `${theme.spacing(15)} !important`],
            pt: theme => [`${theme.spacing(8)} !important`, `${theme.spacing(12.5)} !important`]
          }}
        >
          <Typography variant='h3' sx={{ mb: 2 }}>
            {store?.selected ? `Edit ${addBtnText}` : `Add New ${addBtnText}`}
          </Typography>
          <FormContent addBtnText={addBtnText} handleClose={handleClose} />
        </DialogTitle>
      </Dialog>
    </>
  )
}

export default TableHeader
