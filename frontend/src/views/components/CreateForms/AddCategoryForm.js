// ** React Imports
import { useState } from 'react'

// ** MUI Imports
import Card from '@mui/material/Card'
import Grid from '@mui/material/Grid'
import Button from '@mui/material/Button'
import CardHeader from '@mui/material/CardHeader'
import IconButton from '@mui/material/IconButton'
import CardContent from '@mui/material/CardContent'
import InputAdornment from '@mui/material/InputAdornment'
import CircularProgress from '@mui/material/CircularProgress'
import Box from '@mui/material/Box'

// ** Custom Component Import
import CustomTextField from 'src/@core/components/mui/text-field'

// ** Third Party Imports
import * as yup from 'yup'
import toast from 'react-hot-toast'
import { useForm, Controller } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'

// ** Icon Imports
import Icon from 'src/@core/components/icon'
import { addCategory, editCategory } from 'src/store/categories'
import { useDispatch, useSelector } from 'react-redux'

const showErrors = (field, valueLen, min, max) => {
  if (valueLen === 0) {
    return `${field} field is required`
  } else if (valueLen > 0 && valueLen < min) {
    return `${field} must be at least ${min} characters`
  } else if (valueLen > 0 && valueLen > max) {
    return `${field} must not be greater then ${max} characters`
  } else {
    return ''
  }
}

const schema = yup.object().shape({
  name: yup
    .string()
    .min(3, obj => showErrors('name', obj.value.length, obj.min))
    .required()
})


/**
 * AddCategoryForm Component
 * Renders a form for adding or editing a category
 *
 * @component
 * @param {Object} props - Component props
 * @param {string} props.addBtnText - Text for the submit button ("Add" or "Edit")
 * @param {function} props.handleClose - Function to handle form close
 * @returns {JSX.Element} AddCategoryForm component
 */
const AddCategoryForm = ({ addBtnText, handleClose }) => {
  const [loading, setLoading] = useState(false)
  const row = useSelector(state => state.categories.selected)
  const dispatch = useDispatch()

  const defaultValues = {
    name: row ? row?.name : ''
  }

  // ** Hook

  const {
    control,
    reset,
    handleSubmit,
    formState: { errors }
  } = useForm({
    defaultValues,
    mode: 'onChange',
    resolver: yupResolver(schema)
  })

  const onSubmit = data => {
    if (row) {
      setLoading(true)
      dispatch(editCategory({ data, id: row?._id })).then(response => {
        if (response.payload?.status == 200 || response.payload?.status == 201) {
          setLoading(false)
          handleClose()
          toast.success('Category Data updated Successfully')
        } else {
          setLoading(false)
          toast.error(response.payload)
        }
      })
    } else {
      setLoading(true)
      dispatch(addCategory({ data })).then(response => {
        if (response.payload?.status == 201 || response.payload?.status == 200) {
          setLoading(false)
          toast.success('Category Data added Successfully')
          handleClose()
        } else {
          setLoading(false)
          toast.error(response.payload)
        }
      })
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Grid container spacing={5}>
        <Grid item xs={12} md={12}>
          <Controller
            name='name'
            control={control}
            rules={{ required: true }}
            render={({ field: { value, onChange } }) => (
              <CustomTextField
                fullWidth
                value={value}
                label='Category Name'
                onChange={onChange}
                error={Boolean(errors.name)}
                aria-describedby='validation-schema-name'
                {...(errors.name && { helperText: errors.name.message })}
              />
            )}
          />
        </Grid>
        {loading ? (
          <Box sx={{ display: 'flex', justifyContent: 'center', marginTop: '16px', marginLeft: '50%' }}>
            <CircularProgress />
          </Box>
        ) : (
          <Grid item sx={{ marginLeft: '42%' }}>
            <Button type='submit' variant='contained'>
              {row ? `Edit ${addBtnText}` : `Add ${addBtnText}`}
            </Button>
          </Grid>
        )}
      </Grid>
    </form>
  )
}

export default AddCategoryForm
