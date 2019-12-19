import { Button, Card, CardActions, CardContent, CardHeader, TextField } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import axios from "axios";
import React, { useEffect, useState } from "react";



const useStyles = makeStyles(theme => ({
  root: {
    display: "flex",
    // background: "red",
    "flex-grow": 1,
    width: "90vw",
    "flex-wrap": "wrap",
    "flex-direction": "column"
  },

  commentroot: {
    display: "flex",
    // background: "blue",
    "flex-direction": "column",
    "align-items": "flex-start",
    margin: "1rem",
    "background-color": "#f2f3f5",
    "border-radius": "18px",
    "box-sizing": "border-box",
    "line-height": "16px",
    "max-width": "100%",
    "word-wrap": "break-word",
    "flex-grow": 1,
    "padding-left": "1rem",
    "white-space": "normal",
    "word-break": "break-word"
  },
  commentname: {
    margin: "0.5rem",
    color: "#3c4858",
    "text-decoration": "none",
    "font-weight": 700,
    "font-family": "Roboto Slab,Times New Roman,serif",
    display: "flex"
  },
  commentdate: {
    "font-weight": "100",
    "font-family": "Roboto Slab,Times New Roman,serif"
  },
  commentbody: {
    margin: "0.5rem"
  },
  textField: {
    width: "100%"
  },
  card: {
    background: "aliceblue"
  },
  cardaction: {
    "justify-content": "flex-end"
  }
}));

async function netrequest(s = "") {
  if (s === "") throw new Error("query can not be emapy");
  const result = await axios.post(
    "/backend/api",
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

export default function CommentBox(props) {
  const [videocomments, setvideocomments] = useState([]);
  const [commentname, setcommentname] = useState("Unknown");
  const [commentbody, setcommentbody] = useState("Awesome video");

  useEffect(() => {
    async function getdata() {
      const result = await netrequest(`
      query{
        filterVideocomments(videoid: ${props.id}){
          title
          comment
          updatedAt
        }
      }`);
      setvideocomments(result.filterVideocomments);
    }
    getdata();
  }, [props.id]);
  const classes = useStyles();
  return (
    <div className={classes.root}>
      {videocomments.length === 0
        ? "No Comments"
        : videocomments.map((data, index) => {
            return (
              <Comment
                key={index}
                name={data.title}
                time={data.updatedAt}
                comment={data.comment}
              />
            );
          })}

      <Card className={classes.card}>
        <CardHeader title="New Comment" />
        <CardContent>
          <TextField
            required
            id="outlined-required"
            label="Name"
            // defaultValue="Unknown"
            onChange={event => {
              setcommentname(event.target.value);
            }}
            className={classes.textField}
            value={commentname}
            margin="normal"
            variant="outlined"
          />

          <TextField
            id="outlined-multiline-static"
            label="Comment"
            multiline
            rows="4"
            onChange={event => {
              setcommentbody(event.target.value);
            }}
            // defaultValue="Awesome video"
            className={classes.textField}
            value={commentbody}
            margin="normal"
            variant="outlined"
          />
        </CardContent>
        <CardActions className={classes.cardaction}>
          <Button
            variant="contained"
            color="primary"
            onClick={async () => {
              try {
                await netrequest(`
                mutation{
                  editVideocomments(videoid: ${props.id},title: "${commentname}", comment: "${commentbody}")
                  {
                    title
                    comment
                  }
                }`);

                setvideocomments(old => [
                  ...old,
                  { title: commentname, comment: commentbody }
                ]);
                setcommentname("Unknown");
                setcommentbody("Awesome video");
              } catch (err) {
                console.log(err);
              }
            }}
          >
            Post
          </Button>
        </CardActions>
      </Card>
    </div>
  );
}

function Comment(props) {
  const classes = useStyles();
  return (
    <div className={classes.commentroot}>
      <div className={classes.commentname}>
        {props.name}
        <div className={classes.commentdate}>
          {" "}
          - {new Date(props.time).toLocaleDateString()}
        </div>
      </div>
      <div className={classes.commentbody}>{props.comment}</div>
    </div>
  );
}
