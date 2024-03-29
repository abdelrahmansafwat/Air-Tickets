import React, { useState } from "react";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import Link from "@material-ui/core/Link";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import Paper from "@material-ui/core/Paper";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import Slide from "@material-ui/core/Slide";
import CheckCircleIcon from "@material-ui/icons/CheckCircle";
import { CustomButtonStyles } from "./CustomButton";
import history from "../history";
const axios = require("axios");

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {"Copyright © "}
      <Link color="inherit" href="http://www.eelu.edu.eg/">
        National Egyptian E-Learning University
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: "100%",
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  formPaper: {
    display: "flex",
    [theme.breakpoints.up("md")]: {
      width: "90%",
      padding: "2%",
      margin: "10%",
    },
    [theme.breakpoints.down("md")]: {
      width: "90%",
      padding: 5,
    },
    alignItems: "center",
    justifyContent: "center",
  },
  oneWayGrid: {
    alignItems: "center",
    justifyContent: "center",
  },
  root: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  passengerIcons: {
    color: "#2193b0",
    width: "100px",
    height: "100px",
  },
}));

export default function SignUp() {
  const classes = useStyles();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [phone, setPhone] = useState("");
  const [success, setSuccess] = useState(false);
  const [emailError, setEmailError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);
  const [firstNameError, setFirstNameError] = useState(false);
  const [lastNameError, setLastNameError] = useState(false);
  const [phoneError, setPhoneError] = useState(false);
  const [authError, setAuthError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const CustomButton = CustomButtonStyles({ chubby: true });

  return (
    <Container component="main" maxWidth="md">
      <CssBaseline />
      <div className={classes.root}>
        <Paper elevation={10} className={classes.formPaper}>
          <div className={classes.paper}>
            <Typography component="h1" variant="h5">
              Register
            </Typography>
            <form className={classes.form} noValidate>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  <TextField
                    autoComplete="fname"
                    name="firstName"
                    variant="outlined"
                    required
                    fullWidth
                    error={firstNameError}
                    id="firstName"
                    label="First Name"
                    autoFocus
                    onChange={(e) => {
                      if (e.target.value === "") {
                        setFirstNameError(true);
                      } else {
                        setFirstNameError(false);
                        setFirstName(e.target.value);
                      }
                    }}
                    onBlur={() => {
                      if (firstName === "") {
                        setFirstNameError(true);
                      }
                    }}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    variant="outlined"
                    required
                    fullWidth
                    error={lastNameError}
                    id="lastName"
                    label="Last Name"
                    name="lastName"
                    autoComplete="lname"
                    onChange={(e) => {
                      if (e.target.value === "") {
                        setLastNameError(true);
                      } else {
                        setLastNameError(false);
                        setLastName(e.target.value);
                      }
                    }}
                    onBlur={() => {
                      if (lastName === "") {
                        setLastNameError(true);
                      }
                    }}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    variant="outlined"
                    required
                    fullWidth
                    error={emailError}
                    id="email"
                    label="Email Address"
                    name="email"
                    autoComplete="email"
                    onChange={(e) => {
                      if (e.target.value === "") {
                        setEmailError(true);
                      } else {
                        setEmailError(false);
                        setEmail(e.target.value);
                      }
                    }}
                    onBlur={() => {
                      if (email === "") {
                        setEmailError(true);
                      }
                    }}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    variant="outlined"
                    required
                    fullWidth
                    error={phoneError}
                    id="phone"
                    label="Phone"
                    name="phone"
                    autoComplete="phone"
                    onChange={(e) => {
                      if (e.target.value === "") {
                        setPhoneError(true);
                      } else {
                        setPhoneError(false);
                        setPhone(e.target.value);
                      }
                    }}
                    onBlur={() => {
                      if (phone === "") {
                        setPhoneError(true);
                      }
                    }}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    variant="outlined"
                    required
                    fullWidth
                    error={passwordError}
                    name="password"
                    label="Password"
                    type="password"
                    id="password"
                    autoComplete="current-password"
                    onChange={(e) => {
                      if (e.target.value === "") {
                        setPasswordError(true);
                      } else {
                        setPasswordError(false);
                        setPassword(e.target.value);
                      }
                    }}
                    onBlur={() => {
                      if (password === "") {
                        setPasswordError(true);
                      }
                    }}
                  />
                </Grid>
                <Grid
                  container
                  direction={"row"}
                  className={classes.oneWayGrid}
                >
                  <Grid item md={4} xs={0}></Grid>
                  <Grid item md={4} xs={12}>
                    <Button
                      type="submit"
                      variant="contained"
                      color="primary"
                      style={{ width: "320px" }}
                      classes={CustomButton}
                      onClick={(event) => {
                        event.preventDefault();
                        event.stopPropagation();
                        if (
                          email &&
                          password &&
                          firstName &&
                          lastName &&
                          phone
                        ) {
                          axios.create({ baseURL: window.location.origin });
                          axios
                            .post("/api/user/register", {
                              email,
                              password,
                              firstName,
                              lastName,
                              phone,
                              privilege: 1,
                            })
                            .then(function (response) {
                              setSuccess(true);
                            })
                            .catch(function (error) {
                              console.log(error);
                              if (
                                error.message ===
                                "Request failed with status code 409"
                              ) {
                                setErrorMessage("Email already exists.");
                                setAuthError(true);
                                setEmailError(true);
                                setPassword(true);
                              } else {
                                setErrorMessage(
                                  "An error occured. Please try again."
                                );
                              }
                            });
                        } else {
                          setErrorMessage("Please fill all required fields.");
                          setAuthError(true);
                        }
                      }}
                    >
                      Register
                    </Button>
                  </Grid>
                  <Grid item md={4} xs={12}></Grid>
                </Grid>
                <Dialog
                  open={authError}
                  TransitionComponent={Transition}
                  keepMounted
                  onClose={() => setAuthError(false)}
                  aria-labelledby="alert-dialog-slide-title"
                  aria-describedby="alert-dialog-slide-description"
                >
                  <DialogTitle id="alert-dialog-slide-title">
                    {"Error"}
                  </DialogTitle>
                  <DialogContent>
                    <DialogContentText id="alert-dialog-slide-description">
                      {errorMessage}
                    </DialogContentText>
                  </DialogContent>
                  <DialogActions>
                    <Button onClick={() => setAuthError(false)} color="primary">
                      Close
                    </Button>
                  </DialogActions>
                </Dialog>
                <Dialog
                  open={success}
                  TransitionComponent={Transition}
                  keepMounted
                  onClose={() => setSuccess(false)}
                  aria-labelledby="alert-dialog-slide-title"
                  aria-describedby="alert-dialog-slide-description"
                >
                  <DialogTitle id="alert-dialog-slide-title">
                    {"Success"}
                  </DialogTitle>
                  <DialogContent>
                    <Grid
                      container
                      className={classes.oneWayGrid}
                      direction={"column"}
                    >
                      <Grid xs={1} item></Grid>
                      <Grid xs={10} item>
                        <CheckCircleIcon className={classes.passengerIcons} />
                        <Typography style={{ textAlign: "center" }}>
                          Success!
                        </Typography>
                      </Grid>
                      <Grid xs={1} item></Grid>
                    </Grid>
                  </DialogContent>
                  <DialogActions>
                    <Button onClick={() => history.push("/login")} color="primary">
                      Close
                    </Button>
                  </DialogActions>
                </Dialog>
                <Grid container justify="flex-end">
                  <Grid item>
                    <Link
                      href="/login"
                      variant="body2"
                      onClick={() => history.push("/login")}
                    >
                      Already have an account? Login
                    </Link>
                  </Grid>
                </Grid>
              </Grid>
            </form>
          </div>
        </Paper>
      </div>
    </Container>
  );
}
