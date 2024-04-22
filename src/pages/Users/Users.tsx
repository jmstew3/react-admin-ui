import { GridColDef } from "@mui/x-data-grid";
import DataTable from "../../components/DataTable/DataTable"
import { userRows } from "../../data";
import "./users.scss"

const columns: GridColDef<(typeof rows)[number]>[] = [
    {
        field: 'id',
        headerName: 'ID',
        width: 90
    },
    {
        field: 'avatar',
        headerName: 'Avatar',
        width: 100,
        renderCell: (params) => {
            return <img src={params.value as string || "/noavatar.png"} alt="" />
        },
    },
    {
        field: 'firstName',
        headerName: 'First name',
        width: 150,
        editable: true
    },
    {
        field: 'lastName',
        headerName: 'Last name',
        width: 150,
        editable: true
    },
    {
        field: 'email',
        headerName: 'Email',
        type: 'string',
        width: 200,
        editable: true
    },
    // {
    //     field: 'fullName',
    //     headerName: 'Full name',
    //     description: 'This column has a value getter and is not sortable.',
    //     sortable: false,
    //     width: 160,
    //     valueGetter: (value, row) => `${row.firstName || ''} ${row.lastName || ''}`
    // },
    {
        field: 'phone',
        headerName: 'Phone',
        type: 'string',
        width: 250,
        editable: true
    },
    // {
    //     field: 'actions',
    //     headerName: 'Actions',
    //     width: 100,
    //     renderCell: (params) => {
    //         return <div className='action'>
    //             <div className='view'>View</div>
    //             <div className='delete'>Delete</div>
    //         </div>;
    //     },
    // },
    {
        field: 'verified',
        headerName: 'Verified',
        width: 100,
        type: 'boolean'
    }
];

function Users() {
    return (
        <div className="users">
            <div className="info">
                <h1>Users</h1>
                <button>Add New User</button>
            </div>
            // DataTable component is used here which is pulling from the database in data.ts
            <DataTable slug="users" columns={columns} rows={userRows} />
        </div>
    )
}

export default Users