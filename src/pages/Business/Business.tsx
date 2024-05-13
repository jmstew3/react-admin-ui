import { useState } from "react";
import { GridColDef } from "@mui/x-data-grid";
import { business } from "../../data";
import DataTable from "../../components/DataTable/DataTable";
import "./business.scss"

// JobsCompleted

const columns: GridColDef<(typeof rows)[number]>[] = [
  {
    field: "JobNumber",
    headerName: "Job Number",
    width: 90,
    type: "string"
  },
  {
    field: "JobType",
    headerName: "Job Type",
    width: 240,
    type: "string"
  },
  {
    field: "Campaign",
    headerName: "Campaign",
    width: 360,
    type: "string"
  },
  {
    field: "CampaignCategory",
    headerName: "Campaign Category",
    width: 270,
    type: "string"
  },
  {
    field: "Category",
    headerName: "Category",
    width: 90,
    type: "string"
  }
];

const Business = () => {
  return (
    <div className="business">
      <DataTable slug="business" columns={columns} rows={business} />
    </div>
  )
}

export default Business
