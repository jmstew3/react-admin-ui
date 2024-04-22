import "./products.scss";

const Products = () => {
  // state to handle the opening and closing of the Add component
  const [open, setOpen] = useState(false) 
  return (
    <div className="products">
      <div className="info">
        <h1>Products</h1>
        <button onClick={()=> setOpen(true)}>Add New User</button> 
      </div>
      <DataTable slug="users" columns={columns} rows={userRows} />
      { open && <Add slug="user" columns={columns} setOpen={setOpen} /> }
    </div>
  );
}

export default Products
