import { useState } from "react";
import { GridColDef } from "@mui/x-data-grid";
import { products } from "../../data";
import DataTable from "../../components/DataTable/DataTable";
import Add from "../../components/Add/Add";
import "./products.scss";

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
      field: "title",
      headerName: "Title",
      type: "string",
      width: 300,
      editable: false
    },
    {
      field: "color",
      headerName: "Color",
      type: "string",
      width: 150,
      editable: true
    },
    {
      field: "producer",
      headerName: "Producer",
      type: "string",
      width: 200,
      editable: true
    },
    {
      field: "price",
      headerName: "Producer",
      type: "string",
      width: 250,
      editable: true
    },
    {
      field: "createdAt",
      headerName: "Created At",
      type: "string",
      width: 250,
      editable: true
    },
    {
      field: "inStock",
      headerName: "In Stock",
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

const Products = () => {
  // state to handle the opening and closing of the Add component
  const [open, setOpen] = useState(false) 
  return (
    <div className="products">
      <div className="info">
        <h1>Products</h1>
        <button onClick={()=> setOpen(true)}>Add New Products</button> 
      </div>
      <DataTable slug="products" columns={columns} rows={products} />
      { open && <Add slug="product" columns={columns} setOpen={setOpen} /> }
    </div>
  );
}

export default Products