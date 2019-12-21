import { Link, List, ListItem, ListItemText, Paper } from "@material-ui/core";
import ExpansionPanel from "@material-ui/core/ExpansionPanel";
import ExpansionPanelDetails from "@material-ui/core/ExpansionPanelDetails";
import ExpansionPanelSummary from "@material-ui/core/ExpansionPanelSummary";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import axios from "axios";
import React, { useEffect, useState } from "react";
import ReactLoading from "react-loading";

const useStyles = makeStyles(theme => ({
  root: {
    display: "flex",
    "flex-wrap": "wrap",
    margin: theme.spacing(2),
    "align-items": "flex-start",
    justifyContent: "center"
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
export default function LinksPage(props) {
  const classes = useStyles();
  const [loadingnav, setLoadingnav] = useState(true);
  const [loadingpage, setLoadingpage] = useState(true);

  const [listdata, setListData] = useState([]);
  const [pagedata, setPageData] = useState([]);
  const [linkid, setLinkid] = useState(0);

  useEffect(() => {
    setLoadingnav(true);
    async function getdata() {
      const result = await netrequest(`
      query{
        allLinkCatagories{
          id
          title
        }
      }`);
      setListData(result.allLinkCatagories);
      if (result.allLinkCatagories.length) {
        setLinkid(result.allLinkCatagories[0].id);
      }
      setLoadingnav(false);
    }
    getdata();
  }, []);
  useEffect(() => {
    setLoadingpage(true);
    async function getdata() {
      const result = await netrequest(`
      query {
        filterLinks(catagoryid:${linkid})
        {
          title
          link
        }
      }`);
      setPageData(result.filterLinks);
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
          style={loadingpage ? { alignItems: "center" } : {}}
        >
          {loadingpage ? (
            <ReactLoading type={"balls"} color={"#0000ff"} />
          ) : pagedata.length === 0 ? (
            "Click on Catagory to view Links"
          ) : (
            pagedata.map((data, index) => {
              return (
                <ExpansionPanel key={index} className={classes.expansionPanel}>
                  <ExpansionPanelSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel1bh-content"
                    id="panel1bh-header"
                  >
                    <Typography>{data.title}</Typography>
                  </ExpansionPanelSummary>
                  <ExpansionPanelDetails>
                    <Link target="_blank" rel="noopener" href={data.link}>
                      {data.link}
                    </Link>
                  </ExpansionPanelDetails>
                </ExpansionPanel>
              );
            })
          )}
        </div>
      </Paper>
    </div>
  );
}
