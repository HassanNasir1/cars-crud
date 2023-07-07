import { Typography } from '@mui/material'
import { Box } from '@mui/system'

export const categoryColumns = [
  {
    flex: 0.275,
    minWidth: 290,
    field: 'name',
    headerName: 'Name',
    renderCell: params => {
      const { row } = params

      return (
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <Typography noWrap variant='body2' sx={{ color: 'text.primary', fontWeight: 600 }}>
            {row.name}
          </Typography>
        </Box>
      )
    }
  },
  {
    flex: 0.15,
    minWidth: 200,
    field: 'createdAt',
    headerName: 'Created At',
    renderCell: params => (
      <Typography variant='body2' sx={{ color: 'text.primary' }}>
        {new Date(params.row.createdAt).toLocaleString()}
      </Typography>
    )
  },
  {
    flex: 0.15,
    minWidth: 200,
    field: 'updatedAt',
    headerName: 'Updated At',
    renderCell: params => (
      <Typography variant='body2' sx={{ color: 'text.primary' }}>
        {new Date(params.row.updatedAt).toLocaleString()}
      </Typography>
    )
  }
]

export const carsColumns = [
  {
    flex: 0.275,
    minWidth: 110,
    field: 'name',
    headerName: 'Name',
    renderCell: params => {
      const { row } = params

      return (
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <Typography noWrap variant='body2' sx={{ color: 'text.primary', fontWeight: 600 }}>
            {row.name}
          </Typography>
        </Box>
      )
    }
  },
  {
    flex: 0.275,
    minWidth: 150,
    field: 'categoryName',
    headerName: 'Category Name',
    renderCell: params => {
      const { row } = params

      return (
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <Typography noWrap variant='body2' sx={{ color: 'text.primary', fontWeight: 600 }}>
            {row.categoryData?.name}
          </Typography>
        </Box>
      )
    }
  },
  {
    flex: 0.275,
    minWidth: 110,
    field: 'color',
    headerName: 'Color',
    renderCell: params => {
      const { row } = params

      return (
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <Typography noWrap variant='body2' sx={{ color: 'text.primary', fontWeight: 600 }}>
            {row.color}
          </Typography>
        </Box>
      )
    }
  },
  {
    flex: 0.275,
    minWidth: 110,
    field: 'model',
    headerName: 'Model',
    renderCell: params => {
      const { row } = params

      return (
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <Typography noWrap variant='body2' sx={{ color: 'text.primary', fontWeight: 600 }}>
            {row.model}
          </Typography>
        </Box>
      )
    }
  },
  {
    flex: 0.275,
    minWidth: 110,
    field: 'make',
    headerName: 'Make',
    renderCell: params => {
      const { row } = params

      return (
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <Typography noWrap variant='body2' sx={{ color: 'text.primary', fontWeight: 600 }}>
            {row.make}
          </Typography>
        </Box>
      )
    }
  },
  {
    flex: 0.275,
    minWidth: 170,
    field: 'registrationNo',
    headerName: 'Registration No',
    renderCell: params => {
      const { row } = params

      return (
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <Typography noWrap variant='body2' sx={{ color: 'text.primary', fontWeight: 600 }}>
            {row.registrationNo}
          </Typography>
        </Box>
      )
    }
  },
  {
    flex: 0.15,
    minWidth: 130,
    field: 'createdAt',
    headerName: 'Created At',
    renderCell: params => (
      <Typography variant='body2' sx={{ color: 'text.primary' }}>
        {new Date(params.row.createdAt).toLocaleString()}
      </Typography>
    )
  },
  {
    flex: 0.15,
    minWidth: 130,
    field: 'updatedAt',
    headerName: 'Updated At',
    renderCell: params => (
      <Typography variant='body2' sx={{ color: 'text.primary' }}>
        {new Date(params.row.updatedAt).toLocaleString()}
      </Typography>
    )
  }
]
