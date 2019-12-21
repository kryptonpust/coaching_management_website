import {
  Button,
  Divider,
  List,
  ListItem,
  ListItemSecondaryAction,
  ListItemText,
  Paper
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import axios from "axios";
import React, { useEffect, useState } from "react";
import ReactLoading from "react-loading";

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
    height: "90vh"
  },
  pageContent: {
    display: "flex",
    padding: "1rem",
    "align-items": "flex-start",
    flexWrap: "wrap",
    justifyContent: "space-around",
    overflow: "hidden",
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
  active: {
    color: "red"
  }
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
export default function NotesPage(props) {
  const classes = useStyles();
  const [loadingnav, setLoadingnav] = useState(true);
  const [loadingpage, setLoadingpage] = useState(true);

  const [listdata, setListData] = useState([]);
  const [pagedata, setPageData] = useState([]);
  const [linkid, setLinkid] = useState(0);

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
          filterNotes(chapterid:${linkid})
          {
            title
            file
          }
        }`);
      setPageData(result.filterNotes);
      setLoadingpage(false);
    }
    getdata();
  }, [linkid]);
  return (
    <div className={classes.root}>
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
        <div
          className={classes.pageContent}
          style={loadingpage ? { justifyContent: "center" } : {}}
        >
          {loadingpage ? (
            <ReactLoading type={"balls"} color={"#0000ff"} />
          ) : (
            <List className={classes.noticelist}>
              {pagedata.length === 0
                ? "Click on chapters to view Notes"
                : pagedata.map((data, index) => {
                    return (
                      <React.Fragment key={index}>
                        <ListItem>
                          <ListItemText primary={data.title} />
                          <ListItemSecondaryAction>
                            <Button
                              variant="outlined"
                              color="primary"
                              target="_blank"
                              rel="noopener"
                              href={data.file}
                              // component={Link}
                              // to="/view"
                            >
                              View
                            </Button>
                          </ListItemSecondaryAction>
                        </ListItem>
                        <Divider />
                      </React.Fragment>
                    );
                  })}
            </List>
          )}
        </div>
      </Paper>
    </div>
  );
}
