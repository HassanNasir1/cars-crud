import Card from '@mui/material/Card';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import CardHeader from '@mui/material/CardHeader';
import IconButton from '@mui/material/IconButton';
import CardContent from '@mui/material/CardContent';
import { DataGrid } from '@mui/x-data-grid';
import { Box } from '@mui/system';
import { useDispatch, useSelector } from 'react-redux';
import { useState, useEffect, useCallback } from 'react';
import Icon from 'src/@core/components/icon';
import QuickSearchToolbar from 'src/views/components/table/data-grid/QuickSearchToolbar';
import TableHeader from 'src/views/components/table/table-header/TableHeader';
import AddCountryForm from 'src/views/components/CreateForms/AddCategoryForm';

/**
 * Escapes special characters in a regular expression pattern.
 * @param {string} value - The string to escape.
 * @returns {string} The escaped string.
 */
const escapeRegExp = value => {
  return value.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, '\\$&');
};

/**
 * Datatable component for displaying data in a table format.
 * @component
 * @param {Object[]} data - The data to be displayed in the table.
 * @param {Object[]} updatedColumns - The updated columns configuration for the table.
 * @param {number} count - The total count of rows in the table.
 * @param {function} onRowsPerPageChange - The callback function to handle rows per page change.
 * @param {function} onPageChange - The callback function to handle page change.
 * @param {number} rowsPerPage - The number of rows per page.
 * @param {number} page - The current page number.
 * @returns {JSX.Element} Datatable component.
 */
const Datatable = ({ data, updatedColumns, count, onRowsPerPageChange, onPageChange, rowsPerPage, page }) => {
  /**
   * State to store the search text entered by the user.
   * @type {string}
   */
  const [searchText, setSearchText] = useState('');

  /**
   * State to store the filtered data based on the search text.
   * @type {Object[]}
   */
  const [filteredData, setFilteredData] = useState([]);

  /**
   * State to manage pagination of the table.
   * @type {Object}
   */
  const [paginationModel, setPaginationModel] = useState({ page: 0, pageSize: 7 });

  /**
   * Handles the search functionality by filtering the data based on the search value.
   * @param {string} searchValue - The search value entered by the user.
   * @returns {void}
   */
  const handleSearch = searchValue => {
    setSearchText(searchValue);
    const searchRegex = new RegExp(escapeRegExp(searchValue), 'i');

    const filteredRows = data?.filter(row => {
      return Object.keys(row).some(field => {
        return searchRegex.test(row[field]?.toString());
      });
    });

    if (searchValue.length) {
      setFilteredData(filteredRows);
    } else {
      setFilteredData([]);
    }
  };

  return (
    <DataGrid
      autoHeight
      columns={updatedColumns}
      pageSizeOptions={[7, 10, 25, 50]}
      paginationModel={paginationModel}
      slots={{ toolbar: QuickSearchToolbar }}
      onPaginationModelChange={setPaginationModel}
      rows={filteredData.length ? filteredData : data}
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
  );
};

export default Datatable;
