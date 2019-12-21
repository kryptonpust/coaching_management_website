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
import ReactLoading from "react-loading";
import { Helmet } from "react-helmet";

const useStyles = makeStyles(styles);
async function netrequest(s = "", html) {
  if (s === "") throw new Error("query can not be empty");
  const result = await axios.post(
    "/backend/api",
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
  const [loading, setLoading] = React.useState(true);
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
    setLoading(true);
    async function getdata() {
      try {
        const result = await netrequest(`query{profilePic{page}}`);
        setpropic(result.profilePic.page);
        setLoading(false);
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
      <Helmet>
        <meta
          name="description"
          content="Joy Shahriar
          Student of Information and Communication Engineering.
          Pabna UNiversity of Science & Technology.
          Director at Binary ICT POINT"
        />
      </Helmet>
      <Parallax small filter />
      <div
        className={classNames(classes.main, classes.mainRaised)}
        style={loading ? { display: "flex", justifyContent: "center" } : {}}
      >
        {loading ? (
          <ReactLoading type={"balls"} color={"#ff0000"} />
        ) : (
          <React.Fragment>
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
          </React.Fragment>
        )}
      </div>
      <Footer />
    </div>
  );
}
