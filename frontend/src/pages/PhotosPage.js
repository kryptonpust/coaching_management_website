import { List, ListItem, ListItemText, Paper } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { Image } from "@zzwing/react-image";
import axios from "axios";
import React, { useEffect, useState } from "react";
import ReactLoading from "react-loading";
import { Helmet } from "react-helmet";

const useStyles = makeStyles(theme => ({
  root: {
    display: "flex",
    margin: theme.spacing(2),
    "align-items": "flex-start",
    flex: 5,
    "flex-wrap": "wrap",
    justifyContent: "center"
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
    "min-height": "90vh",
    justifyContent: "center"
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
export default function PhotosPage(props) {
  token = props.token;
  const classes = useStyles();
  const [loadingnav, setLoadingnav] = useState(true);
  const [loadingpage, setLoadingpage] = useState(true);

  const [listdata, setListData] = useState([]);
  const [pagedata, setPageData] = useState([]);
  const [linkid, setLinkid] = useState();
  const [dirty, setdirty] = useState(false);
  useEffect(() => {
    setLoadingnav(true);
    async function getdata() {
      try {
        const result = await netrequest(`query{
          allSessions{
            id
            title
          }
        }`);
        setListData(result.allSessions);
        if (result.allSessions.length) {
          setLinkid(result.allSessions[0].id);
        }
        setLoadingnav(false);
        setdirty(true);
      } catch (err) {
        console.log(err);
      }
    }
    getdata();
  }, []);
  useEffect(() => {
    if (linkid) {
      setLoadingpage(true);
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
          setLoadingpage(false);
        } catch (err) {
          console.log(err);
        }
      }
      getdata();
    }
  }, [dirty, linkid]);
  return (
    <div className={classes.root}>
      <Helmet>
        <meta
          name="description"
          content="Binary ICT Point Students Photo Gallery. Student photos are organized as batchwise"
        />
      </Helmet>
      <Paper
        className={classes.list}
        style={loadingnav ? { justifyContent: "center" } : {}}
      >
        {loadingnav ? (
          <ReactLoading type={"balls"} color={"#ff0000"} />
        ) : (
          <List component="nav" aria-label="main">
            {listdata.map(data => {
              return (
                <ListItem
                  button
                  key={data.id}
                  className={data.id === linkid ? classes.active : ""}
                  onClick={() => {
                    setLinkid(data.id);
                    setdirty(!dirty);
                  }}
                >
                  <ListItemText primary={data.title} />
                </ListItem>
              );
            })}
          </List>
        )}
      </Paper>
      <Paper className={classes.page}>
        <div className={classes.pageContent}>
          <div className={classes.root}>
            {loadingpage ? (
              <ReactLoading type={"balls"} color={"#0000ff"} />
            ) : (
              pagedata.map((img, index) =>
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
              )
            )}
          </div>
        </div>
      </Paper>
    </div>
  );
}
