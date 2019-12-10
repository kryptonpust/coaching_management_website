import React from "react";
import PropTypes from "prop-types";
import ListSubheader from "@material-ui/core/ListSubheader";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import Collapse from "@material-ui/core/Collapse";

import ExpandLess from "@material-ui/icons/ExpandLess";
import ExpandMore from "@material-ui/icons/ExpandMore";

import Divider from "@material-ui/core/Divider";
import { withStyles } from "@material-ui/core/styles";
import { NavLink } from "react-router-dom";
// import './navList.css';
const styles = theme => ({
  root: {
    width: "100%",
    maxWidth: 360,
    background: theme.palette.background.paper,
    
  },
  nested: {
    paddingLeft: theme.spacing(4)
  },
  link:{
    '&.active': {
      color: 'red'
    }
  }
});
function getItems() {
  var json = {
    list: [
      // {
      //   id: 1,
      //   title: "Dashboard",
      //   items: [
      //     {
      //       id: 1,
      //       name: "Dashboard",
      //       path: "dashboard"
      //     }
      //   ]
      // },
      {
        id: 2,
        title: "Batch",
        items: [
          {
            id: 1,
            name: "Sessions",
            path: "sessions"
          },
          {
            id: 2,
            name: "Photos",
            path: "photos",
            subitems: [
              {
                id: 1,
                name: "Upload",
                path: "upload"
              },
              {
                id: 2,
                name: "View",
                path: "view"
              }
            ]
          }
        ]
      },
      {
        id:3,
        title: "Infromations",
        items: [
          {
            id: 1,
            name: "About Us",
            path: "about"
          },
          {
            id:2,
            name: "Profile",
            path: "profile"
          },
          {
            id:3,
            name: "Notices",
            path: "notices"
          },
          {
            id:4,
            name: "Notes",
            path: "notes"
          }
          ,
          {
            id:6,
            name: "Chapters",
            path: "chapters"
          }
          ,
          {
            id:7,
            name: "Links",
            path: "links"
          },
          {
            id:8,
            name: "LinkCatagory",
            path: "linkcatagory"
          },
          {
            id:9,
            name: "Videos",
            path: "videos"
          }
          ,
          {
            id:10,
            name: "Feature Images",
            path: "featureimages"
          }
        ]
      }
    ]
  };
  return json;
}
class NestedList extends React.Component {
  state = {};
  handleClick = e => {
    this.setState({ [e]: !this.state[e] });
  };
  

  render() {
    const items = getItems();
    const { classes } = this.props;
    return (
      <div>
        {items.list.map(list => {
          return (
            <List
              className={classes.root}
              key={list.id}
              subheader={<ListSubheader>{list.title}</ListSubheader>}
            >
              {list.items.map(item => {
                return (
                  <div key={item.id}>
                    {item.subitems != null ? (
                      <div key={item.id}>
                        <ListItem
                          button
                          key={item.id}
                          onClick={this.handleClick.bind(this, item.name)}
                        >
                          <ListItemText primary={item.name} />
                          {this.state[item.name] ? (
                            <ExpandLess />
                          ) : (
                            <ExpandMore />
                          )}
                        </ListItem>
                        <Collapse
                          key={list.items.id}
                          component="li"
                          in={this.state[item.name]}
                          timeout="auto"
                          unmountOnExit
                        >
                          <List disablePadding>
                            {item.subitems.map(sitem => {
                              return (
                                <ListItem
                                  button
                                  component={NavLink}
                                  to={"/admin/" + item.path + "/" + sitem.path}
                                  key={sitem.id}
                                  className={classes.nested +' '+ classes.link}
                                >
                                  <ListItemText
                                    key={sitem.id}
                                    primary={sitem.name}
                                  />
                                </ListItem>
                              );
                            })}
                          </List>
                        </Collapse>{" "}
                      </div>
                    ) : (
                      <ListItem
                        button
                        component={NavLink}
                        to={"/admin/" + item.path}
                        onClick={this.handleClick.bind(this, item.name)}
                        key={item.id}
                        className={classes.link}
                      >
                        <ListItemText primary={item.name} />
                      </ListItem>
                    )}
                  </div>
                );
              })}
              <Divider key={list.id} absolute />
            </List>
          );
        })}
      </div>
    );
  }
}
NestedList.propTypes = {
  classes: PropTypes.object.isRequired
};
export default withStyles(styles)(NestedList);
