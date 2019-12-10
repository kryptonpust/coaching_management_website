import CssBaseline from "@material-ui/core/CssBaseline";
import { makeStyles } from "@material-ui/core/styles";
import Header from "components/Header/Header.js";
import HeaderLinks from "components/Header/HeaderLinks.js";
import LandingPage from "pages/LandingPage/LandingPage";
import LinksPage from "pages/LinksPage";
import NotesPage from "pages/NotesPage";
import NoticePage from "pages/NoticePage";
import PhotosPage from "pages/PhotosPage";
import ProfilePage from "pages/ProfilePage";
import VideosPage from "pages/VideosPage";
import React, { useState } from "react";
import { Redirect, Route, Switch } from "react-router-dom";
const useStyles = makeStyles(theme => ({
  root: {
    // display: "flex"
  }
}));
export default function BasePage(props) {
  const [headercolor] = useState("white");
  const { ...rest } = props;
  const classes = useStyles();
  return (
    <React.Fragment>
      <CssBaseline />
      <div className={classes.root}>
        <Header
          color={headercolor}
          brand="Binary ICT POINT"
          rightLinks={<HeaderLinks />}
          changeColorOnScroll={{
            height: 400,
            color: "white"
          }}
          {...rest}
        />

        <Switch>
          <Route path="/home">
            <LandingPage />
          </Route>
          <Route path="/photos">
            <PhotosPage />
          </Route>
          <Route path="/videos">
            <VideosPage />
          </Route>
          <Route path="/links">
            <LinksPage />
          </Route>
          <Route path="/notes">
            <NotesPage />
          </Route>
          <Route path="/notices">
            <NoticePage />
          </Route>
          <Route path="/profile">
            <ProfilePage />
          </Route>
          <Redirect to="/home" />
        </Switch>
        {props.children}
        {/* <Footer /> */}
      </div>
    </React.Fragment>
  );
}
