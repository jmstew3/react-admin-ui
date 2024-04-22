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
      <span className="close">X</span>
      <h1>Add new {props.slug}</h1>
      </div>
    </div>
  )
};

export default Add
