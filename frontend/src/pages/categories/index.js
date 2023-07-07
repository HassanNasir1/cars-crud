// ** MUI Imports
import Card from '@mui/material/Card'
import Grid from '@mui/material/Grid'
import Typography from '@mui/material/Typography'
import CardHeader from '@mui/material/CardHeader'
import IconButton from '@mui/material/IconButton'
import CardContent from '@mui/material/CardContent'
import { DataGrid } from '@mui/x-data-grid' // Import the DataGrid component
import { Box } from '@mui/system'
import toast from 'react-hot-toast'

// ** Store Imports
import { useDispatch, useSelector } from 'react-redux'

// ** Custom Component Import
import QuickSearchToolbar from 'src/views/components/table/data-grid/QuickSearchToolbar'
import TableHeader from 'src/views/components/table/table-header/TableHeader'
import { categoryColumns } from 'src/columns/columns'
import { fetchData, selectCategory, deleteCategory } from 'src/store/categories'
import AddCategoryForm from 'src/views/components/CreateForms/AddCategoryForm'
import Datatable from 'src/views/components/table/data-grid/Datatable'

// ** React Imports
import { useState, useEffect, useCallback } from 'react'

// ** Icon Imports
import Icon from 'src/@core/components/icon'
import ConfirmationModal from 'src/views/components/confirmationModal'

const escapeRegExp = value => {
  return value.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, '\\$&')
}

const Categories = () => {
  // const [value, setValue] = useState('')
  const [open, setOpen] = useState(false)
  const [openModal, setOpenModal] = useState(false)
  const [modalRow, setModalRow] = useState(null)
  const [loading, setLoading] = useState(false)

  const [queryOptions, setQueryOptions] = useState({
    direction: 1,
    column: 'createdAt'
  })

  const [paginationModel, setPaginationModel] = useState({
    pageSize: 5,
    page: 0
  })
  const [searchText, setSearchText] = useState('')
  const [filteredData, setFilteredData] = useState([])

  const store = useSelector(state => state.categories)
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(
      fetchData({
        sortBy: queryOptions?.column,
        sortOrder: queryOptions?.direction,
        page: paginationModel.page + 1,
        limit: paginationModel.pageSize
      })
    )
  }, [dispatch, searchText, paginationModel, queryOptions])

  const handleSortModelChange = useCallback(sortModel => {
    // Here you save the data you need from the sort model
    setQueryOptions({
      direction: sortModel[0]?.sort,
      column: sortModel[0]?.field
    })
  }, [])

  const handleSearch = searchValue => {
    setSearchText(searchValue)
    const searchRegex = new RegExp(escapeRegExp(searchValue), 'i')

    const filteredRows = store?.data.filter(row => {
      return Object.keys(row).some(field => {
        // @ts-ignore
        return searchRegex.test(row[field]?.toString())
      })
    })
    if (searchValue.length) {
      setFilteredData(filteredRows)
    } else {
      setFilteredData([])
    }
  }

  const handleEdit = row => {
    setOpen(true)
    dispatch(selectCategory(row))
  }

  const handleClickOpen = row => {
    setOpenModal(true)
    setModalRow(row)
  }

  const handleClose = () => {
    setOpenModal(false)
  }

  const handlePopUpClose = () => {
    setOpen(false)
    dispatch(selectCategory(null))
  }

  const handleAgree = () => {
    setLoading(true)
    dispatch(deleteCategory({ id: modalRow?._id })).then(response => {
      if (response.payload?.status === 201 || 200) {
        setLoading(false)
        handleClose()
        toast.success('Category Data deleted Successfully')
      } else {
        setLoading(false)
        toast.error(`Error is : ${response.error}`)
      }
    })
  }

  const updatedColumns = [
    ...categoryColumns,
    {
      flex: 0.15,
      minWidth: 120,
      sortable: false,
      field: 'actions',
      headerName: 'Actions',
      renderCell: ({ row }) => (
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <IconButton onClick={() => handleEdit(row)}>
            <Icon icon='tabler:edit' />
          </IconButton>
          <IconButton onClick={() => handleClickOpen(row)}>
            <Icon icon='tabler:trash' />
          </IconButton>
        </Box>
      )
    }
  ]

  return (
    <Grid item xs={12}>
      <Card>
        <TableHeader
          addBtnText='Category'
          title='Categories'
          FormContent={AddCategoryForm}
          open={open}
          setOpen={setOpen}
          handleClose={handlePopUpClose}
        />
        <DataGrid
          autoHeight
          columns={updatedColumns}
          pageSizeOptions={[5, 10, 25]}
          rows={filteredData.length ? filteredData : store?.data || []}
          rowCount={store?.total}
          getRowId={row => row._id}
          paginationModel={paginationModel}
          loading={store?.apiPending}
          paginationMode='server'
          sortingMode='server'
          sortingOrder={['desc', 'asc']}
          filterMode='server'
          onSortModelChange={handleSortModelChange}
          onPaginationModelChange={setPaginationModel}
          slots={{ toolbar: QuickSearchToolbar }}
          {...store?.data}
          // initialState={{
          //   ...store?.data?.initialState,
          //   columns: {
          //     // ...store?.data.initialState?.columns,
          //     columnVisibilityModel: {
          //       created_at: false
          //     }
          //   }
          // }}
          sx={{
            '& .MuiSvgIcon-root': {
              fontSize: '1.125rem'
            }
          }}
          slotProps={{
            baseButton: {
              size: 'medium',
              variant: 'outlined'
            },

            toolbar: {
              value: searchText,
              clearSearch: () => handleSearch(''),
              onChange: event => handleSearch(event.target.value)
            }
          }}
        />
        <ConfirmationModal
          open={openModal}
          setOpen={setOpenModal}
          handleClickOpen={handleClickOpen}
          handleClose={handleClose}
          row={modalRow}
          title={'Category'}
          handleAgree={handleAgree}
          loading={loading}
        />
      </Card>
    </Grid>
  )
}

export default Categories
