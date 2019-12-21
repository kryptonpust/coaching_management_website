import { List, ListItem, ListItemText, Paper } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import axios from "axios";
import React, { useEffect, useState } from "react";
import VideoCard from "./VideoCard";
import ReactLoading from "react-loading";
import { Helmet } from "react-helmet";

const useStyles = makeStyles(theme => ({
  root: {
    display: "flex",
    "flex-wrap": "wrap",
    margin: theme.spacing(2),
    "align-items": "flex-start"
  },
  list: {
    display: "flex",
    "flex-grow": 1,
    margin: theme.spacing(2),
    "& nav": {
      "flex-grow": 1
    }
  },
  page: {
    display: "flex",
    "flex-grow": 3,
    margin: theme.spacing(2),
    "min-height": "90vh"
  },
  pageContent: {
    display: "flex",
    padding: "1rem",
    "align-items": "flex-start",
    flexWrap: "wrap",
    justifyContent: "space-around",
    backgroundColor: theme.palette.background.paper,
    width: "100%"
  },
  noticelist: {
    width: "100%"
  },
  noticeitem: {
    "&:hover": {
      background: "red"
    }
  },
  videocontainer: {
    div: {
      display: "flex",
      "align-items": "flex-start",
      "justify-content": "center",
      "flex-grow": 1
    }
  },
  active: {
    color: "red"
  },
}));

async function netrequest(s = "") {
  if (s === "") throw new Error("query can not be emapy");
  const result = await axios.post(
    "/backend/api",
    JSON.stringify({ query: s }),
    {
      headers: {
        "Content-Type": "application/json"
        // Authorization: 'Bearer ' + token
      }
    }
  );
  return result.data.data;
}
export default function VideosPage(props) {
  const classes = useStyles();
  const [listdata, setListData] = useState([]);
  const [pagedata, setPageData] = useState([]);
  const [linkid, setLinkid] = useState(0);
  const [loadingnav, setLoadingnav] = useState(true);
  const [loadingpage, setLoadingpage] = useState(true);

  useEffect(() => {
    setLoadingnav(true);
    async function getchapter() {
      const result = await netrequest(`
                query {
                    allChapters{
                      id
                      title
                    }
                  }`);
      setListData(result.allChapters);
      if (result.allChapters.length) {
        setLinkid(result.allChapters[0].id);
      }
      setLoadingnav(false);
    }
    getchapter();
  }, []);
  useEffect(() => {
    setLoadingpage(true);
    async function getdata() {
      const result = await netrequest(`
            query {
              filterVideos(chapterid:${linkid})
              {
                id
                title
                file
                updatedAt
              }
            }`);
      setPageData(result.filterVideos);
      setLoadingpage(false);
    }
    getdata();
  }, [linkid]);
  return (
    <div className={classes.root}>
      <Helmet>
        <meta
          name="description"
          content="Special ICT videos for Students."
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
          {loadingpage ? (
            <ReactLoading type={"balls"} color={"#0000ff"} />
          ) : (
            <List className={classes.noticelist}>
              {pagedata.length === 0
                ? "Click on chapters to view Videos"
                : pagedata.map((data, index) => {
                    return (
                      <VideoCard
                        key={index}
                        id={data.id}
                        title={data.title}
                        link={data.file}
                        time={data.updatedAt}
                      />
                    );
                  })}
            </List>
          )}
        </div>
      </Paper>
    </div>
  );
}
