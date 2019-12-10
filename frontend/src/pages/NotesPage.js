import { Button, Divider, List, ListItem, ListItemSecondaryAction, ListItemText, Paper } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import axios from "axios";
import React, { useEffect, useState } from "react";
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
  }
}));

async function netrequest(s = "") {
  if (s === "") throw new Error("query can not be emapy");
  const result = await axios.post(
    "/api",
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
  const [listdata, setListData] = useState([]);
  const [pagedata, setPageData] = useState([]);
  const [linkid, setLinkid] = useState(0);
  const [clicked, setClicked] = useState(Array(listdata.length).fill(false));

  useEffect(() => {
    async function getchapter() {
      const result = await netrequest(`
            query {
                allChapters{
                  id
                  title
                }
              }`);
      setListData(result.allChapters);
    }
    getchapter();
  }, []);
  useEffect(() => {
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
    }
    getdata();
  }, [linkid]);
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
        </div>
      </Paper>
    </div>
  );
}
