// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import styles from "assets/jss/material-kit-react/views/profilePage.js";
import axios from "axios";
// nodejs library that concatenates classes
import classNames from "classnames";
import Footer from "components/Footer/Footer.js";
import Parallax from "components/Parallax/Parallax.js";
import he from "he";
import React from "react";



const useStyles = makeStyles(styles);
async function netrequest(s = "", html) {
  if (s === "") throw new Error("query can not be empty");
  const result = await axios.post(
    "/api",
    JSON.stringify({
      query: s,
      variables: {
        text: html
      }
    }),
    {
      headers: {
        "Content-Type": "application/json"
        // Authorization: "Bearer " + token
      }
    }
  );
  return result.data.data;
}

export default function ProfilePage(props) {
  const [details, setdetails] = React.useState("");
  const [propic, setpropic] = React.useState("");
  React.useEffect(() => {
    async function getdata() {
      try {
        const result = await netrequest(`query{profile{page}}`);
        setdetails(result.profile.page);
      } catch (err) {
        console.log(err);
      }
    }
    getdata();
  }, []);
  React.useEffect(() => {
    async function getdata() {
      try {
        const result = await netrequest(`query{profilePic{page}}`);
        setpropic(result.profilePic.page);
      } catch (err) {
        console.log(err);
      }
    }
    getdata();
  }, []);
  const classes = useStyles();
  const imageClasses = classNames(
    classes.imgRaised,
    classes.imgRoundedCircle,
    classes.imgFluid
  );
 
  return (
    <div>
      {/* <Header
        color="transparent"
        brand="Material Kit React"
        rightLinks={<HeaderLinks />}
        fixed
        changeColorOnScroll={{
          height: 200,
          color: "white"
        }}
        {...rest}
      /> */}
      <Parallax small filter />
      <div className={classNames(classes.main, classes.mainRaised)}>
        <div className={classes.profile}>
          <img src={propic} alt="..." className={imageClasses} />
          {/* <iframe srcDoc={he.decode(details)}  */}
        </div>
        <div
          style={{
            "text-align": "initial",
            margin: "1rem",
            marginTop: "-80px"
          }}
          dangerouslySetInnerHTML={{ __html: he.decode(details) }}
        ></div>
      </div>
      <Footer />
    </div>
  );
}
