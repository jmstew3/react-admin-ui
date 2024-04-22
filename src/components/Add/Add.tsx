import { GridColDef } from "@mui/x-data-grid";
import "./add.scss";

type Props = {
    slug: string;
    columns: GridColDef[];
    setOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

const Add = (props: Props) => {
  return (
    <div className="add">
      <div className="modal">
        <span className="close" onClick={()=>props.setOpen(false)}>X</span>
        <h1>Add new {props.slug}</h1>
        <form>
            {props.columns.filter(item=>item.field !== "id" && item.field !== "img")
            .map(column =>
                <div className="item">
                    <label>{column.headerName}</label>
                    <input type={column.type} placeholder={column.field} />
                </div>
            )}
        </form>
      </div>
    </div>
  )
};

export default Add
