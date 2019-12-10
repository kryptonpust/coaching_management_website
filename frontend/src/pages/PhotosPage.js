import { List, ListItem, ListItemText, Paper } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { Image } from "@zzwing/react-image";
import axios from "axios";
import React, { useEffect, useState } from "react";

const useStyles = makeStyles(theme => ({
  root: {
    display: "flex",
    margin: theme.spacing(2),
    "align-items": "flex-start",
    flex: 5,
    "flex-wrap": "wrap"
  },
  list: {
    display: "flex",
    flex: 1,
    margin: theme.spacing(2),
    "& nav": {
      "flex-grow": 1
    }
  },
  page: {
    display: "flex",
    flex: 4,
    margin: theme.spacing(2),
    "min-height": "90vh"
  },
  pageContent: {
    display: "flex",
    padding: "1rem",
    "align-items": "flex-start",
    flexWrap: "wrap",
    justifyContent: "space-around",
    overflow: "hidden",
    backgroundColor: theme.palette.background.paper
  },
  gridList: {},
  active: {
    color: "red"
  },
  titleBar: {
    background:
      "linear-gradient(to bottom, rgba(0,0,0,0.7) 0%, " +
      "rgba(0,0,0,0.3) 70%, rgba(0,0,0,0) 100%)"
  }
}));

let token;

async function netrequest(s = "") {
  if (s === "") throw new Error("query can not be emapy");
  const result = await axios.post("/api", JSON.stringify({ query: s }), {
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + token
    }
  });
  return result.data.data;
}
export default function PhotosPage(props) {
  token = props.token;
  const classes = useStyles();
  const [listdata, setListData] = useState([]);
  const [pagedata, setPageData] = useState([]);
  const [linkid, setLinkid] = useState();
  const [clicked, setClicked] = useState(Array(listdata.length).fill(false));
  const [dirty, setdirty] = useState(0);
  useEffect(() => {
    async function getdata() {
      try {
        const result = await netrequest(`query{
          allSessions{
            id
            title
          }
        }`);
        setListData(result.allSessions);
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
          filterImages(sessionid: ${linkid}) {
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
    getdata();
  }, [dirty,linkid]);
  return (
    <div className={classes.root}>
      <Paper className={classes.list}>
        <List component="nav" aria-label="main">
          {listdata.map(data => {
            return (
              <ListItem
                button
                key={data.id}
                className={clicked[data.id - 1] ? classes.active : ""}
                onClick={() => {
                  setLinkid(data.id);
                  setdirty(!dirty);
                  setClicked(prev =>
                    Array.from(prev, (x, index) => {
                      if (index === data.id - 1) return !x;
                      return false;
                    })
                  );
                }}
              >
                <ListItemText primary={data.title} />
              </ListItem>
            );
          })}
        </List>
      </Paper>
      <Paper className={classes.page}>
        <div className={classes.pageContent}>
          <div className={classes.root}>
            {/* <GridList cellHeight={160} className={classes.gridList} cols={3}>
              {pagedata.map(tile => (
                <GridListTile key={tile.id} cols={tile.cols || 1}>
                  <img src={tile.link} alt={tile.title || "test image"} />
                  <GridListTileBar titlePosition="top" actionPosition="right" className={classes.titleBar}/>
                </GridListTile>
              ))}
            </GridList> */}

            {pagedata.map((img, index) =>
              props.token ? (
                <Image
                  group="multi"
                  key={index}
                  width={120}
                  height={120}
                  src={img.link}
                  style={{ margin: "5px" }}
                  onDelete={async event => {
                    try {
                      await netrequest(`mutation{
                        deleteImages(src: "${event}")
                      }
                      `);
                      setdirty(!dirty);
                    } catch (err) {
                      console.log(err);
                    }
                  }}
                />
              ) : (
                <Image
                  group="multi"
                  key={index}
                  width={120}
                  height={120}
                  src={img.link}
                  style={{ margin: "5px" }}
                />
              )
            )}
          </div>
        </div>
      </Paper>
    </div>
  );
}
