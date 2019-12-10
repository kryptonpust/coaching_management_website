import AppBar from "@material-ui/core/AppBar";
import CssBaseline from "@material-ui/core/CssBaseline";
import Divider from "@material-ui/core/Divider";
import Drawer from "@material-ui/core/Drawer";
import IconButton from "@material-ui/core/IconButton";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";
import MenuIcon from "@material-ui/icons/Menu";
import clsx from "clsx";
import AuthContext from "context/auth_context";
import PhotosPage from "pages/PhotosPage";
import React, { useContext } from "react";
import { Redirect, Route, Switch } from "react-router-dom";
import About from "./About";
import PhotoUploader from "./Batch/photoUpload";
import Sessions from "./Batch/sessions";
import Chapter from "./chapters";
import FeatureImages from "./featureImages";
import LinkCatagories from "./linkCatagories";
import Links from "./links";
import NavList from "./navList";
import Notes from "./notes";
import Notices from "./Notices";
import Profile from "./Profile";
import Videos from "./videos";

const drawerWidth = 240;

const useStyles = makeStyles(theme => ({
  root: {
    display: "flex"
  },
  appBar: {
    transition: theme.transitions.create(["margin", "width"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen
    })
  },
  appBarShift: {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: drawerWidth,
    transition: theme.transitions.create(["margin", "width"], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen
    })
  },
  menuButton: {
    marginRight: theme.spacing(2)
  },
  hide: {
    display: "none"
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0
  },
  drawerPaper: {
    width: drawerWidth
  },
  drawerHeader: {
    display: "flex",
    alignItems: "center",
    padding: theme.spacing(0, 1),
    ...theme.mixins.toolbar,
    justifyContent: "flex-end"
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen
    }),
    marginLeft: -drawerWidth
  },
  contentShift: {
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen
    }),
    marginLeft: 0
  }
}));

export default function PersistentDrawerLeft() {
  const classes = useStyles();
  const theme = useTheme();
  const [open, setOpen] = React.useState(true);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const context = useContext(AuthContext);

  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar
        position="fixed"
        className={clsx(classes.appBar, {
          [classes.appBarShift]: open
        })}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            className={clsx(classes.menuButton, open && classes.hide)}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap>
            Binary ICT
          </Typography>
        </Toolbar>
      </AppBar>
      <Drawer
        className={classes.drawer}
        variant="persistent"
        anchor="left"
        open={open}
        classes={{
          paper: classes.drawerPaper
        }}
      >
        <div className={classes.drawerHeader}>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === "ltr" ? (
              <ChevronLeftIcon />
            ) : (
              <ChevronRightIcon />
            )}
          </IconButton>
        </div>
        <Divider />
        <NavList />
      </Drawer>
      <main
        className={clsx(classes.content, {
          [classes.contentShift]: open
        })}
      >
        <div className={classes.drawerHeader} />
        <Switch>
          {/* <Route path="/admin/dashboard">
            <h3>Please select a topic.</h3>
          </Route> */}
          <Route path="/admin/photos/upload">
            <PhotoUploader token={context.token} />
          </Route>
          <Route path="/admin/photos/view">
            <PhotosPage token={context.token} />
          </Route>
          <Route path="/admin/sessions">
            <Sessions token={context.token} />
          </Route>
          <Route path="/admin/about">
            <About token={context.token} />
          </Route>
          <Route path="/admin/profile">
            <Profile token={context.token} />
            
            {/* <ProfileTest token={context.token} /> */}
          </Route>
          <Route path="/admin/notices">
            <Notices token={context.token} />
          </Route>
          <Route path="/admin/notes">
            <Notes token={context.token} />
          </Route>
          <Route path="/admin/chapters">
            <Chapter token={context.token} />
          </Route>
          <Route path="/admin/links">
            <Links token={context.token} />
          </Route>
          <Route path="/admin/linkcatagory">
            <LinkCatagories token={context.token} />
          </Route>
          <Route path="/admin/videos">
            <Videos token={context.token} />
          </Route>
          <Route path="/admin/featureimages">
            <FeatureImages token={context.token} />
          </Route>
          <Redirect to="/admin/profile" />
        </Switch>
      </main>
    </div>
  );
}
