import { useState } from 'react';
import Box from '@mui/material/Box';
import Dialog from '@mui/material/Dialog';
import Button from '@mui/material/Button';
import Checkbox from '@mui/material/Checkbox';
import Typography from '@mui/material/Typography';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import FormControlLabel from '@mui/material/FormControlLabel';
import CardHeader from '@mui/material/CardHeader';
import CustomTextField from 'src/@core/components/mui/text-field';
import { useDispatch, useSelector } from 'react-redux';
import { selectCategory } from 'src/store/categories';

/**
 * TableHeader component for displaying the header of a table.
 * @component
 * @param {Object} props - The component props.
 * @param {string} props.title - The title of the table.
 * @param {string} props.addBtnText - The text for the add button.
 * @param {React.Component} props.FormContent - The form content component.
 * @param {boolean} props.open - Indicates whether the dialog is open or not.
 * @param {function} props.setOpen - The function to toggle the dialog open state.
 * @param {function} props.handleClose - The function to handle dialog close.
 * @returns {JSX.Element} TableHeader component.
 */
const TableHeader = (props) => {
  const { title, addBtnText, FormContent, open, setOpen, handleClose } = props;

  const store = useSelector((state) => state.categories);
  const dispatch = useDispatch();

  /**
   * Handles the toggle of the dialog open state.
   * @returns {void}
   */
  const handleDialogToggle = () => setOpen(!open);

  /**
   * Handles the form submission.
   * @param {Event} e - The form submit event.
   * @returns {void}
   */
  const onSubmit = (e) => {
    setOpen(false);
    e.preventDefault();
  };

  return (
    <>
      <Box sx={{ pb: 0, pr: 7, display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between' }}>
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
            px: (theme) => [`${theme.spacing(5)} !important`, `${theme.spacing(15)} !important`],
            pt: (theme) => [`${theme.spacing(8)} !important`, `${theme.spacing(12.5)} !important`],
          }}
        >
          <Typography variant='h3' sx={{ mb: 2 }}>
            {store?.selected ? `Edit ${addBtnText}` : `Add New ${addBtnText}`}
          </Typography>
          <FormContent addBtnText={addBtnText} handleClose={handleClose} />
        </DialogTitle>
      </Dialog>
    </>
  );
};

export default TableHeader;
