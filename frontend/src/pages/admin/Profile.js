import React, { useState, useEffect } from "react";

import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";
import { Button, Avatar, Input } from "@material-ui/core";
import axios from "axios";
import he from "he";
import { Editor } from "@tinymce/tinymce-react";

import "./About.css";

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
    margin: "1rem 0"
  },
  paper: {
    padding: theme.spacing(2),
    display: "flex",
    textAlign: "center",
    "justify-content": "space-between",
    color: theme.palette.text.secondary
  },
  profile: {
    display: "flex",
    "align-items": "center",
    margin: "1rem",
    "flex-direction": "column"
  },
  bigAvatar: {
    width: 60,
    height: 60
  }
}));
let token;

const editorconfg = {
  plugins: [
    "advlist anchor autolink autoresize charmap code codesample directionality emoticons fullscreen hr image importcss insertdatetime link" +
      " lists nonbreaking noneditable pagebreak preview powerpaste quickbars save searchreplace spellchecker" +
      " tabfocus table template textpattern" +
      " toc visualblocks visualchars wordcount"
  ],
  menubar: "edit insert view format table tools",
  toolbar:
    "insertfile undo redo | fontsizeselect | bold italic font | forecolor backcolor | alignleft aligncenter alignright alignjustify | bullist numlist | link image",
  toolbar_drawer: "floating",
  templates: [
    {
      title: "Basic Template",
      description: "Basic Template",
      content: "<h1>Hello from Template</h1>"
    }
  ],
  style_formats: [
    {
      title: "Image Left",
      selector: "img",
      styles: {
        float: "left",
        margin: "0 10px 0 10px"
      }
    },
    {
      title: "Image Right",
      selector: "img",
      styles: {
        float: "right",
        margin: "0 10px 0 10px"
      }
    }
  ],
  branding: false,
  min_height: 500,
  images_upload_handler: function(blobInfo, success, failure) {
    //   console.log(blobInfo);
    var formData = new FormData();
    // formData.append=('image',blobInfo);
    formData.append("file", blobInfo.blob());
    axios
      .post("/backend/files", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: "Bearer " + token
        }
      })
      .then(data => {
        success(data.data.url);
        console.log(data);
      })
      .catch(error => {
        failure(error);
        //console.log(error);
      });
  }
};

async function netrequest(s = "", html) {
  if (s === "") throw new Error("query can not be emapy");
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
        "Content-Type": "application/json",
        Authorization: "Bearer " + token
      }
    }
  );
  return result.data.data;
}
export default props => {
  token = props.token;
  const [state, setState] = useState(true);
  const [dirty, setDirty] = useState(false);
  const [data, setData] = useState("");
  const [initialdata, setinitialdata] = useState("");
  const [propic, setpropic] = useState('');

  const classes = useStyles();
  useEffect(() => {
    async function getdata() {
      try {
        const result = await netrequest(`query{profile{page}}`);
        setinitialdata(result.profile.page);
      } catch (err) {
        console.log(err);
      }
    }
    getdata();
  }, []);
  useEffect(() => {
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
  const save = async () => {
    if (!state && dirty) {
      //save data to server
      try {
        const result = await netrequest(
          `mutation test($text: String!){
        editProfile(html: $text) {
          page
        }
      }`,
          he.encode(data)
        );
        console.log(result);
        setData(result.editProfile.page);
      } catch (err) {
        console.log(err);
        return;
      }
    }
    setState(!state);
    setDirty(false);
  };

  return (
    <React.Fragment>
      <Box className={classes.root}>
        <Paper className={classes.paper}>
          <Typography variant="h5" component="h3">
            Write Your Profile
          </Typography>
          <Button
            variant="outlined"
            color="secondary"
            onClick={() => {
              save();
            }}
          >
            {state ? "Unlock" : dirty ? "Save" : "Lock"}
          </Button>
        </Paper>
      </Box>

      <div className={classes.profile}>
        <Avatar
          alt="Profile picture"
          src={propic}
          className={classes.bigAvatar}
        />

        <Input
          type="file"
          onChange={async event => {
            const data = new FormData();
            data.append("file", event.target.files[0]);
            const result = await axios.post(
              "/backend/files",
              data
            );
            const query= await netrequest(`mutation test($text: String!){
              editProfilePic(html: $text) {
                page
              }
            }`,result.data.url)
            setpropic(query.editProfilePic.page);
          }}
        />
      </div>

      <Editor
        value={he.decode(initialdata)}
        init={editorconfg}
        disabled={state}
        onEditorChange={data => {
          setDirty(true);
          // console.log(data);
          setData(data);
        }}
      />
    </React.Fragment>
  );
};
