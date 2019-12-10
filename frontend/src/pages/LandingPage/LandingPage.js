import { Divider, List, ListItem, ListItemText, Link } from "@material-ui/core";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import styles from "assets/jss/material-kit-react/views/landingPage.js";
import axios from "axios";
// nodejs library that concatenates classes
import classNames from "classnames";
import CustomTabs from "components/CustomTabs/CustomTabs.js";
import Footer from "components/Footer/Footer.js";
import Parallax from "components/Parallax/Parallax.js";
import he from "he";
import React, { useEffect, useState } from "react";
import "./landingPage.css";
// Sections for this page
import ProductSection from "./Sections/ProductSection.js";
import TeamSection from "./Sections/TeamSection.js";

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

const useStyles = makeStyles(styles);

export default function LandingPage(props) {
  const classes = useStyles();
  const [latestnotices, setlatestnotices] = useState([]);
  const [details, setdetails] = useState("");

  useEffect(() => {
    async function getdata() {
      const result = await netrequest(`query{
        latestNotices(size: 10){
          title
          file
          updatedAt
        }
      }`);
      if (!result) throw new Error("Response is null");
      setlatestnotices(result.latestNotices);
    }
    getdata();
  }, []);
  useEffect(() => {
    async function getdata() {
      try {
        const result = await netrequest(`query{aboutUs{page}}`);
        setdetails(result.aboutUs.page);
      } catch (err) {
        console.log(err);
      }
    }
    getdata();
  }, []);
  // const { ...rest } = props;
  return (
    <div>
      {/* <h1>Binary ICT Point</h1> */}
      {/* <Header
        color="transparent"
        brand="Binary ICT"
        rightLinks={<HeaderLinks />}
        fixed
        changeColorOnScroll={{
          height: 400,
          color: "white"
        }}
        {...rest}
      /> */}
      <Parallax />

      <div className={classNames(classes.main, classes.mainRaised)}>
        <div className={classes.container}>
          <ProductSection />
          <div className={classes.noticeRoot}>
            <CustomTabs
              headerColor="danger"
              to={"/profile"}
              btntxt={"Director Profile"}
              tabs={[
                {
                  tabName: "Director Message",
                  tabContent: (
                    <div
                      style={{
                        "text-align": "initial"
                        // marginTop: "-80px"
                      }}
                      dangerouslySetInnerHTML={{ __html: he.decode(details) }}
                    ></div>
                    // <p className={classes.textCenter}>
                    //   Welcome to the website of Binary ICT POINT which is the
                    //   first EXclusive ICT care in the Pabna region of
                    //   Bangladesh. It stands in the urban din and bustle at a
                    //   beautiful and scenic location some 13 km north of Pabna
                    //   town by the side of the intercity highway that links town
                    //   to ghacpara. I feel great pleasure in expressing my
                    //   heartiest congratulations and best wishes for the greatest
                    //   ICT care at Pabna. It is a matter of satisfaction for us
                    //   that the BINARY has made steady progress in a relatively
                    //   short period of time in terms of expansion of its physical
                    //   infrastructure and academic programmes. The BINARY has
                    //   been growing rapidly in terms of quality, recognition,
                    //   activities, student intake. We are proud for our students
                    //   as the number is the highest among the coaching in
                    //   Pabna.They got highest number of final exam. In the
                    //   continuing task of nation building, BINARY is trying to
                    //   promote excellence in higher education for a vibrant and
                    //   inclusive society through knowledge creation and
                    //   dissemination. It is making sincere efforts to contribute
                    //   its mite by providing the right kind of human resources.
                    //   It is striving hard to impart quality education to meet
                    //   national and global challenges, towards accomplishing its
                    //   mission.
                    // </p>
                  )
                }
              ]}
            />
            <CustomTabs
              headerColor="primary"
              to={"/notices"}
              btntxt={"view all"}
              tabs={[
                {
                  tabName: "Notice",
                  tabContent: (
                    <List className="marquee">
                      {latestnotices.map((res, index) => {
                        return (
                          <React.Fragment key={index}>
                            <ListItem
                              component={Link}
                              target="_blank"
                              href={res.file}
                              style={{background: 'aliceblue'}}
                            >
                              <ListItemText
                                primary={res.title}
                                secondary={new Date(
                                  res.updatedAt
                                ).toLocaleDateString()}
                              />
                            </ListItem>
                            <Divider />
                          </React.Fragment>
                        );
                      })}
                    </List>
                  )
                }
              ]}
            />
          </div>

          <TeamSection />
          {/* <WorkSection /> */}
        </div>
      </div>
      <Footer />
    </div>
  );
}
