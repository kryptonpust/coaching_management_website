import Button from "@material-ui/core/Button";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import styles from "assets/jss/material-kit-react/views/landingPageSections/teamStyle.js";
import axios from "axios";
// nodejs library that concatenates classes
import classNames from "classnames";
import Card from "components/Card/Card.js";
import CardFooter from "components/Card/CardFooter.js";
// @material-ui/icons
// core components
import GridContainer from "components/Grid/GridContainer.js";
import GridItem from "components/Grid/GridItem.js";
import React from "react";
import { Link } from "react-router-dom";



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

const useStyles = makeStyles(styles);

export default function TeamSection() {
  const [propic, setpropic] = React.useState("");
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
    <div className={classes.section}>
      <h2 className={classes.title}>Our Teachers</h2>
      <div>
        <GridContainer className={classes.grid}>
          <GridItem xs={12} sm={12} md={4}>
            <Card plain >
              <GridItem xs={12} sm={12} md={6} className={classes.itemGrid}>
                <img src={propic} alt="..." className={imageClasses} />
              </GridItem>
              <h4 className={classes.cardTitle}>
                Md. Shahriar Joy
                <br />
                <small className={classes.smallTitle}>Director & Senior Lecturer in ICT</small>
              </h4>
              {/* <CardBody>
                <p className={classes.description}>
                  You can write here details about one of your team members. You
                  can give more details about what they do. Feel free to add
                  some <a href="#pablo">links</a> for people to be able to
                  follow them outside the site.
                </p>
              </CardBody> */}
              <CardFooter className={classes.justifyCenter}>
                <Button variant="outlined" color="primary"
                  component={Link}
                  to="/profile"
                >
                  View Profile
                </Button>
              </CardFooter>
            </Card>
          </GridItem>
        </GridContainer>
      </div>
    </div>
  );
}
