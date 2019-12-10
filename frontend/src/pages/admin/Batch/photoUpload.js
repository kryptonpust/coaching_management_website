import React, { useState, useEffect } from "react";
import { DropzoneArea } from "material-ui-dropzone";
import {
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  LinearProgress,
  Button
} from "@material-ui/core";

import { makeStyles } from "@material-ui/core/styles";
import axios from "axios";
const useStyles = makeStyles(theme => ({
  root: {
    display: "flex",
    "flex-direction": "column"
  },
  select: {
    margin: "1rem"
  },
  dropzone: {
    margin: "1rem"
  },
  uploadzone: {
    margin: "1rem"
  }
}));

let token;
async function netrequest(s = "") {
  if (s === "") throw new Error("query can not be emapy");
  const result = await axios.post(
    "/api",
    JSON.stringify({ query: s }),
    {
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token
      }
    }
  );
  return result.data.data;
}

async function upload(file) {
  const formdata = new FormData();
  formdata.append("file", file);
  const result = await axios.post("/files", formdata, {
    headers: {
      // "Content-Type": "application/json",
      Authorization: "Bearer " + token
    }
  });
  return result.data;
}

export default function PhotoUploader(props) {
  token = props.token;

  const [progress, setprogress] = useState(0);
  const [isuploading, setisuploading] = useState(false);
  const [files, setfiles] = useState([]);
  const [selectmenus, setselectmenus] = useState([]);
  const [session, setsession] = useState("");
  const [renderkey, setrenderkey] = useState(0);
  const classes = useStyles();

  useEffect(() => {
    async function getdata() {
      try {
        const result = await netrequest(`query{
          allSessions{
            id
            title
          }
        }`);
        setselectmenus(result.allSessions);
      } catch (err) {
        console.log(err);
      }
    }
    getdata();
  }, []);
  return (
    <div className={classes.root}>
      <FormControl className={classes.select}>
        <InputLabel id="demo-simple-select-autowidth-label">
          Select session
        </InputLabel>
        <Select
          value={session}
          onChange={event => {
            setsession(event.target.value);
          }}
          autoWidth
        >
          {selectmenus.map(data => {
            return (
              <MenuItem key={data.id} value={data.id}>
                {data.title}
              </MenuItem>
            );
          })}
        </Select>
      </FormControl>
      <div className={classes.uploadzone}>
        {isuploading && (
          <LinearProgress
            style={{ margin: "1rem" }}
            variant="determinate"
            value={progress}
          />
        )}
        <Button
          variant="outlined"
          disabled={isuploading || files.length === 0}
          onClick={async () => {
            setisuploading(true);
            for (let [index, file] of files.entries()) {
              try {
                const result = await upload(file);
                const dbregister = await netrequest(`mutation{
                  editImages(sessionid: ${session}, link: "${result.url}"){
                    link
                  }
                }`);
                if (dbregister.editImages) {
                  setprogress((index*1.0 / files.length) * 100);
                }
              } catch (err) {
                console.log(err);
              }
            }
            setisuploading(false);
            setfiles([]);
            setrenderkey(!renderkey);
          }}
        >
          Upload
        </Button>
      </div>

      <div className={classes.dropzone}>
        {session && (
          <DropzoneArea
            key={renderkey}
            maxFileSize={10000000}
            onChange={files => {
              setfiles(files);
            }}
            filesLimit={10}
          />
        )}
      </div>
    </div>
  );
}
