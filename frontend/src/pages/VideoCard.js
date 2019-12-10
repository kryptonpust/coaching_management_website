import { Fab } from "@material-ui/core";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardHeader from "@material-ui/core/CardHeader";
import Collapse from "@material-ui/core/Collapse";
import { red } from "@material-ui/core/colors";
import { makeStyles } from "@material-ui/core/styles";
import { Edit } from "@material-ui/icons";
import clsx from "clsx";
import React from "react";
import ReactPlayer from "react-player";
import CommentBox from "./Comment";

const useStyles = makeStyles(theme => ({
  card: {
    display: "flex",
    "flex-direction": "column",
    "align-items": "center",
    "margin-top": "10px"
  },
  media: {
    height: 0,
    paddingTop: "56.25%" // 16:9
  },
  expand: {
    transform: "rotate(0deg)",
    marginLeft: "auto",
    transition: theme.transitions.create("transform", {
      duration: theme.transitions.duration.shortest
    })
  },
  expandOpen: {
    transform: "rotate(180deg)"
  },
  avatar: {
    backgroundColor: red[500]
  }
}));

export default function VideoCard(props) {
  const classes = useStyles();
  const [expanded, setExpanded] = React.useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  return (
    <Card className={classes.card}>
      <CardHeader
        title={props.title}
        subheader={new Date(props.time).toLocaleDateString()}
      />

      <ReactPlayer url={props.link} controls />

      <CardActions disableSpacing>
        <Fab
          color="secondary"
          className={clsx(classes.expand, {
            [classes.expandOpen]: expanded
          })}
          onClick={handleExpandClick}
          aria-expanded={expanded}
          aria-label="show more"
        >
          <Edit />
        </Fab>
      </CardActions>
      <Collapse in={expanded} timeout="auto" unmountOnExit>
        <CardContent>
          <CommentBox id={props.id} />
        </CardContent>
      </Collapse>
    </Card>
  );
}
