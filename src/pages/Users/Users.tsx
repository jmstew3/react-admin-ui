import { useState } from "react";
import { GridColDef } from "@mui/x-data-grid";
import DataTable from "../../components/DataTable/DataTable";
import { userRows } from "../../data";
import "./users.scss";

const columns: GridColDef<(typeof rows)[number]>[] = [
  {
    field: "id",
    headerName: "ID",
    width: 90,
    type: "number"
  },
  {
    field: "img",
    headerName: "Avatar",
    width: 100,
    type: "string",
    renderCell: (params) => {
      return <img src={(params.value as string) || "/noavatar.png"} alt="" />;
    },
  },
  {
    field: "firstName",
    headerName: "First name",
    type: "string",
    width: 150,
    editable: true
  },
  {
    field: "lastName",
    headerName: "Last name",
    type: "string",
    width: 150,
    editable: true
  },
  {
    field: "email",
    headerName: "Email",
    type: "string",
    width: 200,
    editable: true
  },
  {
    field: "phone",
    headerName: "Phone",
    type: "string",
    width: 250,
    editable: true
  },
  {
    field: "verified",
    headerName: "Verified",
    type: "boolean",
    width: 100,
    editable: false
  },
  // {
  //     field: 'fullName',
  //     headerName: 'Full name',
  //     description: 'This column has a value getter and is not sortable.',
  //     sortable: false,
  //     width: 160,
  //     valueGetter: (value, row) => `${row.firstName || ''} ${row.lastName || ''}`
  // }
];

// DataTable component is used here which takes props that reference data in the database: data.ts

function Users() {
// state to handle the opening and closing of the Add component
  const [open, setOpen] = useState(false) 
  return (
    <div className="users">
      <div className="info">
        <h1>Users</h1>
        <button onClick={()=> setOpen(true)}>Add New User</button> 
      </div>
      <DataTable slug="users" columns={columns} rows={userRows} />
      { open && <Add slug="user" columns={columns} setOpen={setOpen} /> }
    </div>
  );
}

export default Users;
