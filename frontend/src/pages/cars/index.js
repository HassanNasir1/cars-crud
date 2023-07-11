import Card from '@mui/material/Card'
import Grid from '@mui/material/Grid'
import Typography from '@mui/material/Typography'
import CardHeader from '@mui/material/CardHeader'
import IconButton from '@mui/material/IconButton'
import CardContent from '@mui/material/CardContent'
import { DataGrid } from '@mui/x-data-grid'
import { Box } from '@mui/system'
import toast from 'react-hot-toast'
import { useDispatch, useSelector } from 'react-redux'
import QuickSearchToolbar from 'src/views/components/table/data-grid/QuickSearchToolbar'
import TableHeader from 'src/views/components/table/table-header/TableHeader'
import { carsColumns } from 'src/columns/columns'
import { fetchData, selectCar, deleteCar } from 'src/store/cars'
import AddCarForm from 'src/views/components/CreateForms/AddCarForm'
import Datatable from 'src/views/components/table/data-grid/Datatable'
import { useState, useEffect, useCallback } from 'react'
import Icon from 'src/@core/components/icon'
import ConfirmationModal from 'src/views/components/confirmationModal'

const escapeRegExp = value => {
  return value.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, '\\$&')
}

/**
 * Categories component for displaying and managing car categories.
 * @component
 * @returns {JSX.Element} Categories component.
 */
const Cars = () => {
  const [open, setOpen] = useState(false)
  const [openModal, setOpenModal] = useState(false)
  const [modalRow, setModalRow] = useState(null)
  const [loading, setLoading] = useState(false)

  const [queryOptions, setQueryOptions] = useState({
    direction: 'desc',
    column: 'createdAt'
  })

  const [paginationModel, setPaginationModel] = useState({
    pageSize: 5,
    page: 0
  })
  const [searchText, setSearchText] = useState('')
  const [filteredData, setFilteredData] = useState([])

  const store = useSelector(state => state.cars)
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

  /**
   * Handles the change in sort model.
   * @param {Object[]} sortModel - The sort model.
   */
  const handleSortModelChange = useCallback(sortModel => {
    setQueryOptions({
      direction: sortModel[0]?.sort,
      column: sortModel[0]?.field
    })
  }, [])

  /**
   * Handles the search action.
   * @param {string} searchValue - The search value.
   */
  const handleSearch = searchValue => {
    setSearchText(searchValue)
    const searchRegex = new RegExp(escapeRegExp(searchValue), 'i')

    const filteredRows = store?.data.filter(row => {
      return Object.keys(row).some(field => {
        return searchRegex.test(row[field]?.toString())
      })
    })
    if (searchValue.length) {
      setFilteredData(filteredRows)
    } else {
      setFilteredData([])
    }
  }

  /**
   * Handles the edit action for a row.
   * @param {Object} row - The row data.
   */
  const handleEdit = row => {
    setOpen(true)
    dispatch(selectCar(row))
  }

  /**
   * Opens the confirmation modal for deleting a row.
   * @param {Object} row - The row data.
   */
  const handleClickOpen = row => {
    setOpenModal(true)
    setModalRow(row)
  }

  /**
   * Closes the confirmation modal.
   */
  const handleClose = () => {
    setOpenModal(false)
  }

  /**
   * Closes the add/edit modal.
   */
  const handlePopUpClose = () => {
    setOpen(false)
    dispatch(selectCar(null))
  }

  /**
   * Handles the agree action in the confirmation modal.
   */
  const handleAgree = () => {
    setLoading(true)
    dispatch(deleteCar({ id: modalRow?._id })).then(response => {
      if (response.payload?.status === 201 || response.payload?.status === 200) {
        setLoading(false)
        handleClose()
        toast.success('Car Data deleted Successfully')
      } else {
        setLoading(false)
        toast.error(`Error is: ${response.error}`)
      }
    })
  }

  const updatedColumns = [
    ...carsColumns,
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
          addBtnText='Car'
          title='Cars'
          FormContent={AddCarForm}
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
          title={'Car'}
          handleAgree={handleAgree}
          loading={loading}
        />
      </Card>
    </Grid>
  )
}

export default Cars
