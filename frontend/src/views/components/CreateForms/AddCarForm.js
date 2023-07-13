// ** React Imports
import { useEffect, useState } from 'react'

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
import { FormControl, FormHelperText, InputLabel, MenuItem, Select } from '@mui/material'

// ** Custom Component Import
import CustomTextField from 'src/@core/components/mui/text-field'

// ** Third Party Imports
import * as yup from 'yup'
import toast from 'react-hot-toast'
import { useForm, Controller } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'

// ** Icon Imports
import Icon from 'src/@core/components/icon'
import { addCar, editCar, fetchDropdownCategories } from 'src/store/cars'
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
    .required(),
  color: yup
    .string()
    .min(3, obj => showErrors('color', obj.value.length, obj.min))
    .required(),
  model: yup
    .string()
    .min(3, obj => showErrors('model', obj.value.length, obj.min))
    .required(),
  make: yup
    .string()
    .min(3, obj => showErrors('make', obj.value.length, obj.min))
    .required(),
  registrationNo: yup
    .string()
    .min(3, obj => showErrors('registrationNo', obj.value.length, obj.min))
    .required(),
  category: yup.string().required('Category must be selected')
})

/**
 * AddCarForm Component
 * Renders a form for adding or editing a car
 *
 * @component
 * @param {Object} props - Component props
 * @param {string} props.addBtnText - Text for the submit button ("Add" or "Edit")
 * @param {function} props.handleClose - Function to handle form close
 * @returns {JSX.Element} AddCarForm component
 */
const AddCarForm = ({ addBtnText, handleClose }) => {
  const [loading, setLoading] = useState(false)
  const row = useSelector(state => state.cars.selected)
  const dispatch = useDispatch()

  const [categories, setCategories] = useState([])

  const defaultValues = {
    name: row ? row?.name : '',
    color: row ? row?.color : '',
    model: row ? row?.model : '',
    make: row ? row?.make : '',
    registrationNo: row ? row?.registrationNo : '',
    category: row ? row.category : ''
  }

  // ** Hook

  const {
    control,
    reset,
    handleSubmit,
    formState: { errors },
    setValue,
    watch
  } = useForm({
    defaultValues,
    mode: 'onChange',
    resolver: yupResolver(schema)
  })

  const selectedCategory = watch('category')

  useEffect(() => {
    fetchDropdownCategories().then(response => {
      setCategories(response.data)
    })
  }, [selectedCategory, row])

  const handleCategoryChange = e => {
    const category = e.target.value
    setValue('category', category)
  }

  const onSubmit = data => {
    if (row) {
      setLoading(true)
      dispatch(editCar({ data, id: row?._id })).then(response => {
        if (response.payload?.status == 200 || response.payload?.status == 201) {
          setLoading(false)
          handleClose()
          toast.success('Car Data updated Successfully')
        } else {
          setLoading(false)
          toast.error(response.payload)
        }
      })
    } else {
      setLoading(true)
      dispatch(addCar({ data })).then(response => {
        if (response.payload?.status == 201 || response.payload?.status == 200) {
          setLoading(false)
          toast.success('Car Data added Successfully')
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
        <Grid item xs={12} md={6}>
          <Controller
            name='name'
            control={control}
            rules={{ required: true }}
            render={({ field: { value, onChange } }) => (
              <CustomTextField
                fullWidth
                value={value}
                label='Car Name'
                onChange={onChange}
                error={Boolean(errors.name)}
                aria-describedby='validation-schema-name'
                {...(errors.name && { helperText: errors.name.message })}
              />
            )}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <Controller
            name='color'
            control={control}
            rules={{ required: true }}
            render={({ field: { value, onChange } }) => (
              <CustomTextField
                fullWidth
                value={value}
                label='Color'
                onChange={onChange}
                error={Boolean(errors.color)}
                aria-describedby='validation-schema-name'
                {...(errors.color && { helperText: errors.color.message })}
              />
            )}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <Controller
            name='model'
            control={control}
            rules={{ required: true }}
            render={({ field: { value, onChange } }) => (
              <CustomTextField
                fullWidth
                value={value}
                label='Model'
                onChange={onChange}
                error={Boolean(errors.model)}
                aria-describedby='validation-schema-name'
                {...(errors.model && { helperText: errors.model.message })}
              />
            )}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <Controller
            name='make'
            control={control}
            rules={{ required: true }}
            render={({ field: { value, onChange } }) => (
              <CustomTextField
                fullWidth
                value={value}
                label='Make'
                onChange={onChange}
                error={Boolean(errors.make)}
                aria-describedby='validation-schema-name'
                {...(errors.make && { helperText: errors.make.message })}
              />
            )}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <Controller
            name='registrationNo'
            control={control}
            rules={{ required: true }}
            render={({ field: { value, onChange } }) => (
              <CustomTextField
                fullWidth
                value={value}
                label='Registration No'
                onChange={onChange}
                error={Boolean(errors.registrationNo)}
                aria-describedby='validation-schema-name'
                {...(errors.registrationNo && { helperText: errors.registrationNo.message })}
              />
            )}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <Controller
            name='category'
            control={control}
            rules={{ required: true }}
            render={({ field }) => (
              <FormControl fullWidth error={Boolean(errors.category)}>
                <InputLabel id='category-label'>Category</InputLabel>
                <Select {...field} label='Category' labelId='category-label' onChange={handleCategoryChange}>
                  {categories.map(category => (
                    <MenuItem key={category._id} value={category._id}>
                      {category.name}
                    </MenuItem>
                  ))}
                </Select>
                {errors.category && <FormHelperText>Please select a category</FormHelperText>}
              </FormControl>
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

export default AddCarForm
