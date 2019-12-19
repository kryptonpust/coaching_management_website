import { Button, Card, CardActions, CardContent, TextField } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import axios from "axios";
import AuthContext from "context/auth_context";
import React, { useContext, useState } from "react";
import { useHistory } from "react-router-dom";


const useStyles = makeStyles(theme => ({
  root: {
    display: "flex",
    "align-items": "center",
    "justify-content": "center",
    "min-height": "100vh",
    background: "url('https://picsum.photos/1920/1080/') center/cover"
  },
  content: {
    display: "flex",
    "flex-direction": "column",
    "justify-content": "center"
  },
  card: {
    "min-height": "30vh",
    "min-width": "20vw",
    display: "flex",
    "flex-direction": "column",
    "justify-content": "center",
    background: "rgb(255,255,255,0.8)"
  },
  cardaction: {
    "justify-content": "center"
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

export default function Login(props) {
  const classes = useStyles();
  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");
  const context = useContext(AuthContext);
  const history = useHistory();

  return (
    <div className={classes.root}>
      <Card className={classes.card}>
        <CardContent className={classes.content}>
          <TextField
            required
            id="standard-required"
            label="Email"
            // className={classes.textField}
            margin="normal"
            onChange={event => {
              setemail(event.target.value);
            }}
          />
          <TextField
            id="standard-password-input"
            label="Password"
            //   className={classes.textField}
            type="password"
            autoComplete="current-password"
            margin="normal"
            onChange={event => {
              setpassword(event.target.value);
            }}
          />
        </CardContent>
        <CardActions className={classes.cardaction}>
          <Button
            variant="outlined"
            color="secondary"
            onClick={async () => {
              if (email !== "" && password !== "") {
                try {
                  const result = await netrequest(`query{
                        login(credentials:{email: "${email}",password: "${password}",access:"admin"})
                        {
                          token
                        }
                      }`);
                  context.login(result.login.token);
                  history.push("/admin");
                } catch (err) {
                  console.log(err);
                }
              }
            }}
          >
            Login
          </Button>
        </CardActions>
      </Card>
    </div>
  );
}
