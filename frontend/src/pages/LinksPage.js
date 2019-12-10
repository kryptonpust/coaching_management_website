import { Link, List, ListItem, ListItemText, Paper } from "@material-ui/core";
import ExpansionPanel from "@material-ui/core/ExpansionPanel";
import ExpansionPanelDetails from "@material-ui/core/ExpansionPanelDetails";
import ExpansionPanelSummary from "@material-ui/core/ExpansionPanelSummary";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
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
    flexWrap: "wrap",
    "flex-direction": "column",
    width: "100%",
    backgroundColor: theme.palette.background.paper
  },
  gridList: {
    width: 500,
    height: 450
  },
  active: {
    color: "red"
  },
  expansionPanel: {
    margin: theme.spacing(1)
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
export default function LinksPage(props) {
  const classes = useStyles();
  const [listdata, setListData] = useState([]);
  const [pagedata, setPageData] = useState([]);
  const [linkid, setLinkid] = useState(0);
  const [clicked, setClicked] = useState(Array(listdata.length).fill(false));

  useEffect(() => {
    async function getdata() {
      const result = await netrequest(`
      query{
        allLinkCatagories{
          id
          title
        }
      }`);
      setListData(result.allLinkCatagories);
    }
    getdata();
  }, []);
  useEffect(() => {
    async function getdata() {
      console.log(`fetching data for list ${linkid}`);
      const result = await netrequest(`
      query {
        filterLinks(catagoryid:${linkid})
        {
          title
          link
        }
      }`);
      setPageData(result.filterLinks);
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
            {pagedata.length === 0
              ? "Click on Catagory to view Links"
              : pagedata.map((data, index) => {
                  return (
                    <ExpansionPanel
                      key={index}
                      className={classes.expansionPanel}
                    >
                      <ExpansionPanelSummary
                        expandIcon={<ExpandMoreIcon />}
                        aria-controls="panel1bh-content"
                        id="panel1bh-header"
                      >
                        <Typography>{data.title}</Typography>
                      </ExpansionPanelSummary>
                      <ExpansionPanelDetails>
                        <Link target="_blank" rel="noopener" href={data.link}>{data.link}</Link>
                      </ExpansionPanelDetails>
                    </ExpansionPanel>
                  );
                })}
          </div>
        </Paper>
      </div>
  );
}
