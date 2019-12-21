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
export default function NoticePage(props) {
  const classes = useStyles();

  const [pagedata, setPageData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [linkid] = useState();

  useEffect(() => {
    setLoading(true);
    async function getdata() {
      const result = await netrequest(`
      query{
        allNotices{
          title
          file
        }
      }`);
      setPageData(result.allNotices);
      setLoading(false);
    }
    getdata();
  }, [linkid]);
  return (
    <div className={classes.root}>
      <Paper className={classes.page}>
        <div
          className={classes.pageContent}
          style={loading ? { justifyContent: "center" } : {}}
        >
          {loading ? (
            <ReactLoading type={"balls"} color={"#0000ff"} />
          ) : (
            <List className={classes.noticelist}>
              {pagedata.length === 0
                ? "Notice Board is Empty"
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
