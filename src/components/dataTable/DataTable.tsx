import { DataGrid, GridColDef, GridToolbar, GridValueGetter } from "@mui/x-data-grid";
import "./dataTable.scss"

const DataTable = () => {

    const columns: GridColDef<(typeof rows)[number]>[] = [
        { field: 'id',
          headerName: 'ID',
          width: 90
        },
        { 
          field: 'avatar',
          headerName: 'Avatar',
          width: 100,
          renderCell: (params) => {
            return <img src={params.value as string || "/noavatar.png"} alt="" />
          }
        },
        {
          field: 'status',
          headerName: 'Status',
          width: 100,
          type: 'boolean'
        },
        {
          field: 'firstName',
          headerName: 'First name',
          width: 150,
          editable: true,
        },
        {
          field: 'lastName',
          headerName: 'Last name',
          width: 150,
          editable: true,
        },
        {
          field: 'age',
          headerName: 'Age',
          type: 'number',
          width: 110,
          editable: true,
        },
        {
          field: 'fullName',
          headerName: 'Full name',
          description: 'This column has a value getter and is not sortable.',
          sortable: false,
          width: 160,
          valueGetter: (value, row) => `${row.firstName || ''} ${row.lastName || ''}`,
        }
      ];

      const rows = [
        { id: 1, lastName: 'Snow', firstName: 'Jon', age: 14, avatar: '', status: true},
        { id: 2, lastName: 'Lannister', firstName: 'Cersei', age: 31, avatar: '', status: false},
        { id: 3, lastName: 'Lannister', firstName: 'Jaime', age: 31, avatar: '', status: false},
        { id: 4, lastName: 'Stark', firstName: 'Arya', age: 11, avatar: '', status: true},
        { id: 5, lastName: 'Targaryen', firstName: 'Daenerys', age: null, avatar: '', status: false},
        { id: 6, lastName: 'Melisandre', firstName: null, age: 150, avatar: '', status: true},
        { id: 7, lastName: 'Clifford', firstName: 'Ferrara', age: 44, avatar: '', status: true},
        { id: 8, lastName: 'Frances', firstName: 'Rossini', age: 36, avatar: '', status: true},
        { id: 9, lastName: 'Roxie', firstName: 'Harvey', age: 65, avatar: '', status: true}
      ];

  return (
    <div className="dataTable">
      <DataGrid
        className="dataGrid"
        rows={rows}
        columns={columns}
        initialState={{
          pagination: {
            paginationModel: {
              pageSize: 5,
            },
          },
        }}
        slots = {{ toolbar: GridToolbar}}
        slotProps={{
            toolbar: {
                showQuickFilter: true,
                // debounceMs:500 delays the search so that it doesn't search for each character on every key press
                quickFilterProps: { debounceMs: 500},
            },
        }}
        pageSizeOptions={[5]}
        checkboxSelection
        disableRowSelectionOnClick
        disableColumnFilter
        disableDensitySelector
        disableColumnSelector
      />
    </div>
  )
}

export default DataTable
