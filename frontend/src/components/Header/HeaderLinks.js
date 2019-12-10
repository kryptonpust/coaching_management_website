/*eslint-disable*/
import React, { useState, useEffect } from "react";
import DeleteIcon from "@material-ui/icons/Delete";
import IconButton from "@material-ui/core/IconButton";
// react components for routing our app without refresh
import { NavLink, Link } from "react-router-dom";

// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import Tooltip from "@material-ui/core/Tooltip";
import axios from "axios";
import Button from "components/CustomButtons/Button";

// @material-ui/icons
import {
  PhotoOutlined,
  LinkOutlined,
  VideoLibraryOutlined,
  AccountBoxOutlined,
  HomeOutlined,
  NotificationsActiveOutlined,
  NotesOutlined,
  SupervisorAccountOutlined
} from "@material-ui/icons";

// core components
import CustomDropdown from "components/CustomDropdown/CustomDropdown.js";

import styles from "assets/jss/material-kit-react/components/headerLinksStyle.js";

const useStyles = makeStyles(styles);


export default function HeaderLinks(props) {
 
  const classes = useStyles();
  return (
    <List className={classes.list}>
      <ListItem className={classes.listItem}>
        <Button
          component={Link}
          to="/home"
          color="transparent"
          className={classes.navLink}
        >
          <HomeOutlined className={classes.icons} /> Home
        </Button>
      </ListItem>
      <ListItem className={classes.listItem}>
        <NavLink to="/photos" color="transparent" className={classes.navLink}>
          <PhotoOutlined className={classes.icons} /> Photos
        </NavLink>
      </ListItem>
      <ListItem className={classes.listItem}>
        <NavLink to="/videos" color="transparent" className={classes.navLink}>
          <VideoLibraryOutlined className={classes.icons} /> Videos
        </NavLink>
      </ListItem>
      <ListItem className={classes.listItem}>
        <NavLink to="/notices" color="transparent" className={classes.navLink}>
          <NotificationsActiveOutlined className={classes.icons} /> Notices
        </NavLink>
      </ListItem>
      <ListItem className={classes.listItem}>
        <NavLink to="/notes" color="transparent" className={classes.navLink}>
          <NotesOutlined className={classes.icons} /> Notes
        </NavLink>
      </ListItem>
      {/* <NavLink to="/notes" color="transparent" className={classes.navLink}>
          <VideoLibraryOutlined className={classes.icons} /> Notes
        </NavLink> */}
      <ListItem className={classes.listItem}>
        <NavLink to="/links" color="transparent" className={classes.navLink}>
          <LinkOutlined className={classes.icons} /> Links
        </NavLink>
      </ListItem>
      <ListItem className={classes.listItem}>
        <NavLink to="/profile" color="transparent" className={classes.navLink}>
          <AccountBoxOutlined className={classes.icons} /> Profile
        </NavLink>
      </ListItem>
      <ListItem className={classes.listItem}>
        <NavLink to="/login" color="transparent" className={classes.navLink}>
          <SupervisorAccountOutlined className={classes.icons} /> Login
        </NavLink>
      </ListItem>
      {/* <ListItem className={classes.listItem}>
        <Tooltip
          id="instagram-twitter"
          title="Goto to baal"
          placement={window.innerWidth > 959 ? "top" : "left"}
          classes={{ tooltip: classes.tooltip }}
        >
          <NavLink
            to="baal.com"
            target="_blank"
            color="transparent"
            className={classes.navLink}
          >
            Baal
          </NavLink>
        </Tooltip>
      </ListItem> */}
    </List>
  );
}
