import { DataGrid, GridColDef, GridToolbar, GridValueGetter } from "@mui/x-data-grid";
import "./dataTable.scss"

type Props = {
  columns: GridColDef[],
  rows: object[]
}

const DataTable = (props: Props) => {

  return (
    <div className="dataTable">
      <DataGrid
        className="dataGrid"
        rows={props.rows}
        columns={props.columns}
        initialState={{
          pagination: {
            paginationModel: {
              pageSize: 10,
            },
          },
        }}
        slots={{ toolbar: GridToolbar }}
        slotProps={{
          toolbar: {
            showQuickFilter: true,
            // debounceMs:500 delays the search so that it doesn't search for each character on every key press
            quickFilterProps: { debounceMs: 500 },
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
