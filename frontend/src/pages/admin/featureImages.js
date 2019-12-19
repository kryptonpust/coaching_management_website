import { FormControl, InputLabel, MenuItem, Select } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { Image } from "@zzwing/react-image";
import axios from "axios";
import React, { useEffect, useState } from "react";

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
    "/backend/api",
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


export default function FeatureImages(props) {
  token = props.token;

  const [selectmenus, setselectmenus] = useState([]);
  const [session, setsession] = useState("");

  const [images, setimages] = useState([]);
  const [pagedata, setPageData] = useState([]);
  const [dirty, setdirty] = useState(0);
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

  useEffect(() => {
    async function getdata() {
      try {
        const result = await netrequest(`query {
          filterImages(sessionid: ${session}) {
            id
            sessionid
            link
          }
        }`);
        setPageData(result.filterImages);
      } catch (err) {
        console.log(err);
      }
    }
    if (session) {
      getdata();
    }
  }, [session]);

  useEffect(() => {
    async function getdata() {
      try {
        const result = await netrequest(`query{
            allFeatureimages{
              id
              src
            }
          }`);
        setimages(result.allFeatureimages);
      } catch (err) {
        console.log(err);
      }
    }

    getdata();
  }, [dirty]);

  return (
    <div className={classes.root}>
      <div>
        {images.map((data, index) => {
          return (
            <Image
              group="multi"
              key={index}
              width={120}
              height={120}
              src={data.src}
              style={{ margin: "5px" }}
              onDelete={async event => {
                try {
                   await netrequest(`mutation{
                    deleteFeatureimages(src: "${event}")
                }
                `);
                  setdirty(!dirty);
                } catch (err) {
                  console.log(err);
                }
              }}
            />
          );
        })}
      </div>
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

      <div className={classes.dropzone}>
        {pagedata.map((img, index) => (
          <Image
            group="multi"
            key={index}
            width={120}
            height={120}
            src={img.link}
            preview={false}
            style={{ margin: "5px" }}
            onClick={async src => {
              try {
                 await netrequest(`mutation{
                        editFeatureimages(src: "${src}")
                        {
                          src
                        }
                      }
                    `);
                setdirty(!dirty);
              } catch (err) {
                console.log(err);
              }
            }}
          />
        ))}
      </div>
    </div>
  );
}
