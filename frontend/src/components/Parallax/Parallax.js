// @material-ui/core components
import { makeStyles, useTheme } from "@material-ui/core/styles";
import axios from "axios";
// nodejs library that concatenates classes
import classNames from "classnames";
// nodejs library to set properties for components
import PropTypes from "prop-types";
import React, { useEffect, useState } from "react";
// core components
// import styles from "assets/jss/material-kit-react/components/parallaxStyle.js";
// import MobileStepper from '@material-ui/core/MobileStepper';
import SwipeableViews from 'react-swipeable-views';
import { autoPlay } from 'react-swipeable-views-utils';
import './parallax.css';




const AutoPlaySwipeableViews = autoPlay(SwipeableViews);


const parallaxStyle = {
  parallax: {
    height: "90vh",
    maxHeight: "1000px",
    overflow: "hidden",
    position: "relative",
    backgroundPosition: "center center",
    backgroundSize: "cover",
    margin: "0",
    padding: "0",
    border: "0",
    display: "flex",
    alignItems: "center"
  },
  filter: {
    "&:before": {
      background: "rgba(0, 0, 0, 0.5)"
    },
    "&:after,&:before": {
      position: "absolute",
      zIndex: "1",
      width: "100%",
      height: "100%",
      display: "block",
      left: "0",
      top: "0",
      content: "''"
    }
  },
  small: {
    height: "380px"
  },
  img: {
    height: '100vh',
    // display: 'block',
    // maxWidth: 400,
    overflow: 'hidden',
    width: '100vw',
    // margin: '450px 0px 0px 0px;'
  },
};

const useStyles = makeStyles(parallaxStyle);
async function netrequest(s = "") {
  if (s === "") throw new Error("query can not be emapy");
  const result = await axios.post(
    "/api",
    JSON.stringify({ query: s }),
    {
      headers: {
        "Content-Type": "application/json",
        // Authorization: "Bearer " + token
      }
    }
  );
  return result.data.data;
}
export default function Parallax(props) {
  const theme = useTheme();
  const [activeStep, setActiveStep] = React.useState(0);
  const [imagelist, setimagelist] = useState([])
  useEffect(() => {
    async function getdata() {
      try {
        const result = await netrequest(`query{
            allFeatureimages{
              id
              src
            }
          }`);
        setimagelist(result.allFeatureimages);
      } catch (err) {
        console.log(err);
      }
    }
    getdata();
  }, []);

  let windowScrollTop;
  if (window.innerWidth >= 768) {
    windowScrollTop = window.pageYOffset / 3;
  } else {
    windowScrollTop = 0;
  }
  const [transform, setTransform] = React.useState(
    "translate3d(0," + windowScrollTop + "px,0)"
  );
  React.useEffect(() => {
    if (window.innerWidth >= 768) {
      window.addEventListener("scroll", resetTransform);
    }
    return function cleanup() {
      if (window.innerWidth >= 768) {
        window.removeEventListener("scroll", resetTransform);
      }
    };
  });
  const resetTransform = () => {
    var windowScrollTop = window.pageYOffset / 3;
    setTransform("translate3d(0," + windowScrollTop + "px,0)");
  };
  const { filter, className, style, small } = props;
  const classes = useStyles();
  const parallaxClasses = classNames({
    [classes.parallax]: true,
    [classes.filter]: filter,
    [classes.small]: small,
    [className]: className !== undefined
  });

  
    const handleStepChange = step => {
      setActiveStep(step);
    };
  
  return (
    <div
      className={parallaxClasses}
      style={{
        ...style,
        // backgroundImage: "url(" + image + ")",
        transform: transform
      }}
    >
      <div className="brandText">
        <b>Binary ICT POINT</b>
      </div>
      <AutoPlaySwipeableViews
        axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
        index={activeStep}
        onChangeIndex={handleStepChange}
        enableMouseEvents
      >
        {imagelist.map((step, index) => (
          <div key={index}>
            {Math.abs(activeStep - index) <= 2 ? (
              <img className={classes.img} src={step.src} alt="featured images"/>
            ) : null}
          </div>
        ))}
      </AutoPlaySwipeableViews>
      
    </div>
  );
}

Parallax.propTypes = {
  className: PropTypes.string,
  filter: PropTypes.bool,
  children: PropTypes.node,
  style: PropTypes.string,
  image: PropTypes.string,
  small: PropTypes.bool
};
