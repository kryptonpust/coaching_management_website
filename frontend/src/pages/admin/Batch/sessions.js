import AddBox from "@material-ui/icons/AddBox";
import ArrowDownward from "@material-ui/icons/ArrowDownward";
import Check from "@material-ui/icons/Check";
import ChevronLeft from "@material-ui/icons/ChevronLeft";
import ChevronRight from "@material-ui/icons/ChevronRight";
import Clear from "@material-ui/icons/Clear";
import DeleteOutline from "@material-ui/icons/DeleteOutline";
import Edit from "@material-ui/icons/Edit";
import FilterList from "@material-ui/icons/FilterList";
import FirstPage from "@material-ui/icons/FirstPage";
import LastPage from "@material-ui/icons/LastPage";
import Remove from "@material-ui/icons/Remove";
import SaveAlt from "@material-ui/icons/SaveAlt";
import Search from "@material-ui/icons/Search";
import ViewColumn from "@material-ui/icons/ViewColumn";
import axios from "axios";
import MaterialTable from "components/material_table";
import React, { forwardRef } from "react";


const tableIcons = {
  Add: forwardRef((props, ref) => <AddBox {...props} ref={ref} />),

  Check: forwardRef((props, ref) => <Check {...props} ref={ref} />),
  Clear: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
  Delete: forwardRef((props, ref) => <DeleteOutline {...props} ref={ref} />),
  DetailPanel: forwardRef((props, ref) => (
    <ChevronRight {...props} ref={ref} />
  )),
  Edit: forwardRef((props, ref) => <Edit {...props} ref={ref} />),
  Export: forwardRef((props, ref) => <SaveAlt {...props} ref={ref} />),
  Filter: forwardRef((props, ref) => <FilterList {...props} ref={ref} />),
  FirstPage: forwardRef((props, ref) => <FirstPage {...props} ref={ref} />),
  LastPage: forwardRef((props, ref) => <LastPage {...props} ref={ref} />),
  NextPage: forwardRef((props, ref) => <ChevronRight {...props} ref={ref} />),
  PreviousPage: forwardRef((props, ref) => (
    <ChevronLeft {...props} ref={ref} />
  )),
  ResetSearch: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
  Search: forwardRef((props, ref) => <Search {...props} ref={ref} />),
  SortArrow: forwardRef((props, ref) => <ArrowDownward {...props} ref={ref} />),
  ThirdStateCheck: forwardRef((props, ref) => <Remove {...props} ref={ref} />),
  ViewColumn: forwardRef((props, ref) => <ViewColumn {...props} ref={ref} />)
};

let token;
async function netrequest(s = "") {
  if (s === "") throw new Error("query can not be emapy");
  const result = await axios.post(
    "/backend/api",
    JSON.stringify({ query: s }),
    {
      headers: {
        "Content-Type": "application/json",
        Authorization: 'Bearer ' + token
      }
    }
  );
  
  return result.data.data;
}

export default function Sessions(props) {
  token=props.token;
  return (
    <div style={{ maxWidth: "100%" }}>
      <MaterialTable
        title="Sessions"
        icons={tableIcons}
        columns={[
            { title: "Title", field: "title" },
          ]}
        data={async query => {
          const result = await netrequest(`
          query{
            sessions(size: ${query.pageSize}, page: ${query.page}) {
              count
              page
              rows {
                id
                title
              }
            }
          }`);
          //   console.log(result)
          return {
            data: result.sessions.rows,
            page: result.sessions.page,
            totalCount: result.sessions.count
          };
        }}
        editable={{
          Add: {
            icon: "Add New Session",
            type: "button",
            btnprops: {
              variant: "outlined",
              color: "secondary",
              style: {
                margin: "1rem"
              }
            }
          },
          onRowAdd: async newData => {
            const result = await netrequest(`
            mutation {
                editSessions(title: "${newData.title}")
                {
                  title
                }
              }`);
            console.log(result);
          },
          onRowUpdate: async (newData, oldData) => {
            await netrequest(`
            mutation {
                editSessions(id: ${newData.id},title: "${newData.title}")
                {
                  title
                }
              }`);
          },
          onRowDelete: async oldData => {
            await netrequest(`
            mutation {
                deleteSessions(id: ${oldData.id})
              }
              `);
          }
        }}
        options={{
          // filtering: true
          search: false,
          footer: false
        }}
      />
    </div>
  );
}
