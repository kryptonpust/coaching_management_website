// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import { ReactComponent as Live } from "assets/img/live.svg";
import { ReactComponent as Medal } from "assets/img/medal.svg";
import { ReactComponent as Monthly } from "assets/img/planning.svg";
import styles from "assets/jss/material-kit-react/views/landingPageSections/productStyle.js";
// core components
import GridContainer from "components/Grid/GridContainer.js";
import GridItem from "components/Grid/GridItem.js";
import InfoArea from "components/InfoArea/InfoArea.js";
import React from "react";




const useStyles = makeStyles(styles);

export default function ProductSection() {
  const classes = useStyles();
  return (
    <div className={classes.section}>
      <GridContainer justify="center">
        <GridItem xs={12} sm={12} md={8}>
          <h2 className={classes.title}>A Special ICT Private Program</h2>
          <h5 className={classes.description}>
            One of the best private program in pabna.
          </h5>
        </GridItem>
      </GridContainer>
      <div>
        <GridContainer>
          <GridItem xs={12} sm={12} md={4}>
            <InfoArea
              title="Monthly Batch"
              // description=""
              icon={Monthly}
              iconColor="info"
              vertical
            >
              <p> Three Days <br/> Six Days</p>
            </InfoArea>
          </GridItem>
          <GridItem xs={12} sm={12} md={4}>
            <InfoArea
              title="Special Batch for Limited Student."
              description="Short Course Batch."
              icon={Medal}
              iconColor="success"
              vertical
            />
          </GridItem>
          <GridItem xs={12} sm={12} md={4}>
            <InfoArea
              title="Live Class"
              description="live Class"
              icon={Live}
              iconColor="danger"
              vertical
            />
          </GridItem>
        </GridContainer>
      </div>
    </div>
  );
}
