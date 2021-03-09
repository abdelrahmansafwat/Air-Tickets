import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import {
  Paper,
  TextField,
  Grid,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  IconButton,
  DialogTitle,
  Slide,
  InputAdornment,
  FormControl,
  FormControlLabel,
  Input,
  Select,
  ListItemText,
  MenuItem,
  InputLabel,
  Typography,
  Divider,
  Checkbox,
  Container,
  CssBaseline,
} from "@material-ui/core";
import { Autocomplete } from "@material-ui/lab";
import { MuiPickersUtilsProvider, DatePicker } from "@material-ui/pickers";
import {
  Today,
  Phone,
  Email,
  Person,
  ChildCare,
  ChildFriendly,
  PermIdentity,
} from "@material-ui/icons";
import { CustomButtonStyles } from "./CustomButton";
import DateFnsUtils from "@date-io/date-fns";
import { useForm, Controller } from "react-hook-form";
import axios from "axios";
import dayjs from "dayjs";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const useStyles = makeStyles((theme) => ({
  form: {
    [theme.breakpoints.up("md")]: {
      width: "50%",
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
  field: {
    marginTop: theme.spacing(2),
  },
  oneWayGrid: {
    alignItems: "center",
    justifyContent: "center",
  },
  oneWayButton: {
    textTransform: "none",
  },
  enabledText: {
    color: "#2193b0",
    fontWeight: 600,
  },
  disabledText: {
    color: "#808080",
  },
  switch: {
    color: "#2193b0",
  },
  icon: {
    color: "#2193b0",
    marginRight: theme.spacing(2),
  },
  passengerIcons: {
    color: "#2193b0",
  },
  dialog: {
    [theme.breakpoints.up("md")]: {
      width: "100%",
    },
    [theme.breakpoints.down("md")]: {
      width: "100%",
    },
  },
  textField: {
    "& label.Mui-focused": {
      color: "#2193b0",
    },
    "& .MuiInput-underline:after": {
      borderBottomColor: "#2193b0",
    },
    "& .MuiOutlinedInput-root": {
      "& fieldset": {
        borderColor: "#2193b0",
      },
      "&:hover fieldset": {
        borderColor: "#6dd5ed",
      },
      "&.Mui-focused fieldset": {
        borderColor: "#2193b0",
      },
    },
  },
  appBar: {
    position: "relative",
    background: "#2193b0",
  },
  title: {
    marginLeft: theme.spacing(2),
    flex: 1,
  },
  paper: {
    //width: "90%",
    marginTop: theme.spacing(2),
    paddingTop: theme.spacing(1),
    paddingBottom: theme.spacing(1),
    textAlign: "center",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  checkBox: {
    //width: "90%",
    marginTop: theme.spacing(3),
  },
  logo: {
    position: "absolute",
    width: "100px",
    top: "3px",

    [theme.breakpoints.up("md")]: {
      left: "45.25%",
    },
    [theme.breakpoints.down("md")]: {
      left: "32.25%",
    },
  },
  option: {
    fontSize: 15,
    "& > span": {
      marginRight: 10,
      fontSize: 18,
    },
  },
  root: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
}));

function ReserveForm(props) {
  const classes = useStyles();

  const [adults, setAdults] = useState(props.adults);
  const [children, setChildren] = useState(props.children);
  const [infants, setInfants] = useState(props.infants);

  var passengersTemp = [];
  for (var i = 0; i < adults + children + infants; i++) {
    console.log("Test");
    passengersTemp.push({
      firstName: "",
      lastName: "",
      dateOfBirth: null,
      email: "",
      phone: "",
      countryCode: "",
      title: "",
      gender: "",
    });
    console.log(passengersTemp);
  }

  const [passengers, setPassengers] = useState(passengersTemp);
  const [index, setIndex] = useState(0);
  const [oneWay, setOneWay] = useState(props.oneWay);
  const [confirm, setConfirm] = useState(false);
  const [arrivalDate, setArrivalDate] = useState(props.arrivalDate);
  const [departureDate, setDepartureDate] = useState(props.departureDate);
  const [message, setMessage] = useState("");
  const [messageDialog, setMessageDialog] = useState(false);
  const [messageLevel, setMessageLevel] = useState("");
  const [render, setRender] = useState(false);
  const [selectedGoingTicket, setSelectedGoingTicket] = useState(
    props.selectedGoingTicket
  );
  const [terms, setTerms] = useState(false);
  const [selectedReturningTicket, setSelectedReturningTicket] = useState(
    props.selectedReturningTicket
  );

  const CustomButton = CustomButtonStyles({ chubby: true });

  //setPassengers(passengersTemp);

  console.log(passengers);

  return (
    <Container component="main" maxWidth="md">
      <CssBaseline />
      <div className={classes.root}>
        <Paper elevation={10} className={classes.form}>
          <Grid container direction={"column"} spacing={1}>
            <Grid
              container
              direction={"row"}
              spacing={3}
              className={classes.oneWayGrid}
            >
              <Grid item xs={"auto"}></Grid>
              <Grid item xs={"auto"}>
                {Array(adults)
                  .fill()
                  .map((value, number) => {
                    return (
                      <IconButton
                        onClick={(value) => {
                          if (
                            !/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(
                              passengers[index].email
                            ) &&
                            index < adults
                          ) {
                            setMessage("Invalid email format.");
                            setMessageLevel("Error");
                            setMessageDialog(true);
                          } else if (
                            (index < adults &&
                              passengers[index].title === "") ||
                            (index < adults &&
                              passengers[index].email === "") ||
                            (index < adults &&
                              passengers[index].phone === "") ||
                            passengers[index].gender === "" ||
                            passengers[index].firstName === "" ||
                            passengers[index].lastName === "" ||
                            passengers[index].dateOfBirth === null
                          ) {
                            setMessage("Please fill all fields.");
                            setMessageLevel("Error");
                            setMessageDialog(true);
                          } else {
                            if (index === adults + children + infants - 1) {
                              setConfirm(true);
                            } else {
                              setIndex(number);
                            }
                          }
                        }}
                      >
                        <Person
                          className={classes.passengerIcons}
                          fontSize={number === index ? "large" : ""}
                        />{" "}
                      </IconButton>
                    );
                  })}
                {Array(children)
                  .fill()
                  .map((value, number) => {
                    return (
                      <IconButton
                        onClick={(value) => {
                          setIndex(number + adults);
                        }}
                      >
                        <ChildCare
                          className={classes.passengerIcons}
                          fontSize={number + adults === index ? "large" : ""}
                        />{" "}
                      </IconButton>
                    );
                  })}
                {Array(infants)
                  .fill()
                  .map((value, number) => {
                    return (
                      <IconButton
                        onClick={(value) => {
                          setIndex(number + adults + children);
                        }}
                      >
                        <ChildFriendly
                          className={classes.passengerIcons}
                          fontSize={
                            number + adults + children === index ? "large" : ""
                          }
                        />{" "}
                      </IconButton>
                    );
                  })}
              </Grid>
              <Grid item xs={"auto"}></Grid>
            </Grid>
            {index < adults && (
              <Grid item>
                <Autocomplete
                  id="combo-box-demo"
                  fullWidth
                  disableClearable
                  filterOptions={(x) => x}
                  options={["Mr.", "Ms.", "Mrs."]}
                  getOptionLabel={(option) => option}
                  value={passengers[index].title}
                  onChange={(event, newValue) => {
                    var temp = passengers;
                    temp[index].title = newValue;
                    setPassengers(temp);
                    setRender(!render);
                  }}
                  renderInput={(params) => (
                    <TextField
                      //variant="outlined"
                      classes={{ root: classes.textField }}
                      {...params}
                      margin="normal"
                      fullWidth
                      id="title"
                      label="Title"
                      name="title"
                      InputProps={{
                        ...params.InputProps,
                        startAdornment: (
                          <InputAdornment position="start">
                            <PermIdentity className={classes.icon} />
                          </InputAdornment>
                        ),
                      }}
                    />
                  )}
                />
              </Grid>
            )}
            <Grid item>
              <TextField
                //variant="outlined"
                classes={{ root: classes.textField }}
                margin="normal"
                fullWidth
                id="firstName"
                label="First Name"
                name="firstName"
                value={passengers[index].firstName}
                //placeholder="From where?"
                onChange={(value) => {
                  //console.log(newValue);
                  var temp = passengers;
                  temp[index].firstName = value.target.value;
                  setPassengers(temp);
                  setRender(!render);
                }}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <PermIdentity className={classes.icon} />
                    </InputAdornment>
                  ),
                }}
                onFocus={() => {
                  //setSelectedDepartureAirport("");
                }}
              />
            </Grid>

            <Grid item>
              <TextField
                //variant="outlined"
                classes={{ root: classes.textField }}
                margin="normal"
                fullWidth
                id="lastName"
                label="Last Name"
                name="lastName"
                //placeholder="From where?"
                value={passengers[index].lastName}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <PermIdentity className={classes.icon} />
                    </InputAdornment>
                  ),
                }}
                onChange={(value) => {
                  //console.log(newValue);
                  var temp = passengers;
                  temp[index].lastName = value.target.value;
                  setPassengers(temp);
                  setRender(!render);
                }}
                onFocus={() => {
                  //setSelectedDepartureAirport("");
                }}
              />
            </Grid>

            <Grid item>
              <Autocomplete
                id="combo-box-demo"
                fullWidth
                disableClearable
                options={["Male", "Female"]}
                filterOptions={(x) => x}
                getOptionLabel={(option) => option}
                value={passengers[index].gender}
                onChange={(event, newValue) => {
                  var temp = passengers;
                  temp[index].gender = newValue;
                  setPassengers(temp);
                  setRender(!render);
                }}
                renderInput={(params) => (
                  <TextField
                    //variant="outlined"
                    classes={{ root: classes.textField }}
                    {...params}
                    margin="normal"
                    fullWidth
                    id="gender"
                    label="Gender"
                    name="gender"
                    InputProps={{
                      ...params.InputProps,
                      startAdornment: (
                        <InputAdornment position="start">
                          <PermIdentity className={classes.icon} />
                        </InputAdornment>
                      ),
                    }}
                  />
                )}
              />
            </Grid>

            {index < adults && (
              <Grid item>
                <TextField
                  //variant="outlined"
                  classes={{ root: classes.textField }}
                  margin="normal"
                  fullWidth
                  id="email"
                  label="Email"
                  name="email"
                  //placeholder="From where?"
                  value={passengers[index].email}
                  onChange={(value) => {
                    //console.log(newValue);
                    var temp = passengers;
                    temp[index].email = value.target.value;
                    setPassengers(temp);
                    setRender(!render);
                  }}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <Email className={classes.icon} />
                      </InputAdornment>
                    ),
                  }}
                  onFocus={() => {
                    //setSelectedDepartureAirport("");
                  }}
                />
              </Grid>
            )}

            {index < adults && (
              <Grid item>
                <TextField
                  //variant="outlined"
                  classes={{ root: classes.textField }}
                  margin="normal"
                  fullWidth
                  id="phone"
                  label="Phone"
                  name="phone"
                  //placeholder="From where?"
                  value={passengers[index].phone}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <Phone className={classes.icon} />
                      </InputAdornment>
                    ),
                  }}
                  onChange={(value) => {
                    //console.log(newValue);
                    var temp = passengers;
                    temp[index].phone = value.target.value;
                    setPassengers(temp);
                    setRender(!render);
                    console.log(passengers);
                  }}
                  onFocus={() => {
                    //setSelectedDepartureAirport("");
                  }}
                />
              </Grid>
            )}

            <Grid item>
              <MuiPickersUtilsProvider utils={DateFnsUtils}>
                <DatePicker
                  classes={{ root: classes.textField }}
                  fullWidth
                  variant="outlined"
                  margin="normal"
                  id="date"
                  label="Date of Birth"
                  disableFuture
                  autoOk
                  openTo="year"
                  views={["year", "month", "date"]}
                  format="dd/MM/yyyy"
                  initialFocusedDate={
                    index < adults
                      ? dayjs().subtract(12, "year")
                      : index >= adults && index < adults + children
                      ? dayjs().subtract(2, "year")
                      : dayjs()
                  }
                  maxDate={
                    index < adults
                      ? dayjs().subtract(12, "year")
                      : index >= adults && index < adults + children
                      ? dayjs().subtract(2, "year")
                      : dayjs()
                  }
                  minDate={
                    index < adults
                      ? dayjs("1900-01-01")
                      : index >= adults && index < adults + children
                      ? dayjs().subtract(12, "year")
                      : dayjs().subtract(2, "year")
                  }
                  value={passengers[index].dateOfBirth}
                  onChange={(value) => {
                    //console.log(newValue);
                    console.log(value);
                    var temp = passengers;
                    temp[index].dateOfBirth = value;
                    setPassengers(temp);
                    setRender(!render);
                    /*
                if (index === adults + children + infants - 1) {
                  setConfirm(true);
                } else {
                  setIndex(index + 1);
                }
                */
                  }}
                  KeyboardButtonProps={{
                    "aria-label": "change date",
                  }}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <Today className={classes.icon} />
                      </InputAdornment>
                    ),
                  }}
                />
              </MuiPickersUtilsProvider>
            </Grid>

            <Grid item className={classes.field}>
              <Grid
                container
                direction={"row"}
                spacing={3}
                className={classes.oneWayGrid}
              >
                <Grid item xs={6}>
                  <Button
                    variant="contained"
                    color="primary"
                    component="span"
                    fullWidth
                    classes={CustomButton}
                    onClick={async (event) => {
                      if (index === 0) {
                        setMessage(
                          "Are you sure you want to cancel reservation and go back to search page?"
                        );
                        setMessageLevel("Cancel");
                        setMessageDialog(true);
                      } else {
                        setIndex(index - 1);
                      }
                    }}
                  >
                    {index === 0 ? "Cancel" : "Back"}
                  </Button>
                </Grid>
                <Grid item xs={6}>
                  <Button
                    variant="contained"
                    color="primary"
                    component="span"
                    fullWidth
                    classes={CustomButton}
                    onClick={async (event) => {
                      if (
                        !/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(
                          passengers[index].email
                        ) &&
                        index < adults
                      ) {
                        setMessage("Invalid email format.");
                        setMessageLevel("Error");
                        setMessageDialog(true);
                      } else if (
                        (index < adults && passengers[index].title === "") ||
                        (index < adults && passengers[index].email === "") ||
                        (index < adults && passengers[index].phone === "") ||
                        passengers[index].gender === "" ||
                        passengers[index].firstName === "" ||
                        passengers[index].lastName === "" ||
                        passengers[index].dateOfBirth === null
                      ) {
                        setMessage("Please fill all fields.");
                        setMessageLevel("Error");
                        setMessageDialog(true);
                      } else {
                        if (index === adults + children + infants - 1) {
                          setConfirm(true);
                        } else {
                          setIndex(index + 1);
                          setRender(!render);
                        }
                      }
                    }}
                  >
                    Next
                  </Button>
                </Grid>
              </Grid>
            </Grid>
          </Grid>

          <Dialog
            open={confirm}
            TransitionComponent={Transition}
            keepMounted
            fullWidth={true}
            maxWidth={"sm"}
            onClose={() => setConfirm(false)}
            aria-labelledby="alert-dialog-slide-title"
            aria-describedby="alert-dialog-slide-description"
          >
            <DialogTitle id="alert-dialog-slide-title">{"Confirm"}</DialogTitle>
            <DialogContent>
              <Grid container direction={"row"}>
                <Grid container direction={"row"}>
                  <Grid container xs={6} direction={"column"}>
                    <Grid item>
                      <Typography>{"Type of Fare"}</Typography>
                    </Grid>
                    <Grid item>
                      <Typography>{"Adult"}</Typography>
                    </Grid>
                    {children > 0 && (
                      <Grid item>
                        <Typography>{"Child"}</Typography>
                      </Grid>
                    )}
                    {infants > 0 && (
                      <Grid item>
                        <Typography>{"Infant"}</Typography>
                      </Grid>
                    )}
                    <Grid item>
                      <Divider />
                      <Typography>{"Total Fare"}</Typography>
                    </Grid>
                    <Grid item>
                      <Typography>{"Discount"}</Typography>
                    </Grid>
                    <Grid item>
                      <Typography>{"Total Payable Fare"}</Typography>
                    </Grid>
                  </Grid>

                  <Grid container xs={6} direction={"column"}>
                    <Grid item>
                      <Typography align="right">{"Total"}</Typography>
                    </Grid>
                    <Grid item>
                      <Typography align="right">
                        {adults +
                          " x " +
                          (selectedGoingTicket.lowestPrice +
                            (oneWay ? selectedGoingTicket.lowestPrice : 0)) +
                          " = "}
                        {adults *
                          (selectedGoingTicket.lowestPrice +
                            (oneWay ? selectedGoingTicket.lowestPrice : 0))}
                      </Typography>
                    </Grid>
                    {children > 0 && (
                      <Grid item>
                        <Typography align="right">
                          {children +
                            " x " +
                            Math.floor(
                              (selectedGoingTicket.lowestPrice - 725 * 1) *
                                0.75 +
                                725 * 1 +
                                (oneWay
                                  ? (selectedGoingTicket.lowestPrice -
                                      725 * 1) *
                                      0.75 +
                                    725 * 1
                                  : 0)
                            ) +
                            " = "}
                          {Math.floor(
                            children *
                              ((selectedGoingTicket.lowestPrice - 725 * 1) *
                                0.75 +
                                725 * 1) +
                              (oneWay
                                ? (selectedGoingTicket.lowestPrice - 725 * 1) *
                                    0.75 +
                                  725 * 1
                                : 0)
                          )}
                        </Typography>
                      </Grid>
                    )}
                    {infants > 0 && (
                      <Grid item>
                        <Typography align="right">
                          {infants +
                            " x " +
                            Math.floor(
                              (selectedGoingTicket.lowestPrice - 725 * 1) *
                                0.1 +
                                200 +
                                (oneWay
                                  ? (selectedReturningTicket.lowestPrice -
                                      725 * 1) *
                                      0.1 +
                                    200
                                  : 0)
                            ) +
                            " = "}
                          {Math.floor(
                            infants *
                              ((selectedGoingTicket.lowestPrice - 725 * 1) *
                                0.1 +
                                200) +
                              (oneWay
                                ? (selectedReturningTicket.lowestPrice -
                                    725 * 1) *
                                    0.1 +
                                  200
                                : 0)
                          )}
                        </Typography>
                      </Grid>
                    )}
                    <Grid item>
                      <Divider />
                      <Typography align="right">
                        {Math.floor(
                          adults * selectedGoingTicket.lowestPrice +
                            children *
                              ((selectedGoingTicket.lowestPrice - 725 * 1) *
                                0.75 +
                                725 * 1) +
                            infants *
                              ((selectedGoingTicket.lowestPrice - 725 * 1) *
                                0.1 +
                                200)
                        ) +
                          (oneWay
                            ? Math.floor(
                                adults * selectedReturningTicket.lowestPrice +
                                  children *
                                    ((selectedReturningTicket.lowestPrice -
                                      725 * 1) *
                                      0.75 +
                                      725 * 1) +
                                  infants *
                                    ((selectedReturningTicket.lowestPrice -
                                      725 * 1) *
                                      0.1 +
                                      200)
                              )
                            : 0)}
                      </Typography>
                    </Grid>
                    <Grid item>
                      <Typography align="right">
                        {(window.location.href.split("/").includes("applive")
                          ? 200
                          : 100) *
                          (adults + children)}
                      </Typography>
                    </Grid>
                    <Grid item>
                      <Typography align="right">
                        {(selectedGoingTicket === ""
                          ? 0
                          : Math.floor(
                              adults * selectedGoingTicket.lowestPrice +
                                children *
                                  ((selectedGoingTicket.lowestPrice - 725 * 1) *
                                    0.75 +
                                    725 * 1) +
                                infants *
                                  ((selectedGoingTicket.lowestPrice - 725 * 1) *
                                    0.1 +
                                    200)
                            ) -
                            (window.location.href.split("/").includes("applive")
                              ? 200
                              : 100) *
                              (adults + children)) +
                          (selectedReturningTicket === ""
                            ? 0
                            : Math.floor(
                                adults * selectedReturningTicket.lowestPrice +
                                  children *
                                    ((selectedReturningTicket.lowestPrice -
                                      725 * 1) *
                                      0.75 +
                                      725 * 1) +
                                  infants *
                                    ((selectedReturningTicket.lowestPrice -
                                      725 * 1) *
                                      0.1 +
                                      200)
                              ) -
                              (window.location.href
                                .split("/")
                                .includes("applive")
                                ? 200
                                : 100) *
                                (adults + children))}
                      </Typography>
                    </Grid>
                  </Grid>
                </Grid>

                <Grid item>
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={terms}
                        onChange={(event) => setTerms(event.target.checked)}
                        name="checkedF"
                        color="primary"
                      />
                    }
                    className={classes.checkBox}
                    label="By proceeding with the payment, I have read and agree to the
                Terms & Conditions, Privacy Policy, Refund and Change Policy"
                  />
                </Grid>
              </Grid>
            </DialogContent>
            <DialogActions>
              <Button
                disabled={!terms}
                onClick={async () => {
                  axios.create({ baseURL: window.location.origin });
                  var numberOfTickets =
                    adults * (oneWay ? 2 : 1) +
                    children * (oneWay ? 2 : 1) +
                    infants * (oneWay ? 2 : 1);

                  var total =
                    Math.floor(
                      adults * selectedGoingTicket.lowestPrice +
                        children *
                          ((selectedGoingTicket.lowestPrice - 725 * 1) * 0.75 +
                            725 * 1) +
                        infants *
                          ((selectedGoingTicket.lowestPrice - 725 * 1) * 0.1 +
                            200)
                    ) -
                    (window.location.href.split("/").includes("applive")
                      ? 200
                      : 100) *
                      (adults + children) +
                    (oneWay
                      ? Math.floor(
                          adults * selectedReturningTicket.lowestPrice +
                            children *
                              ((selectedReturningTicket.lowestPrice - 725 * 1) *
                                0.75 +
                                725 * 1) +
                            infants *
                              ((selectedReturningTicket.lowestPrice - 725 * 1) *
                                0.1 +
                                200)
                        ) -
                        (window.location.href.split("/").includes("applive")
                          ? 200
                          : 100) *
                          (adults + children)
                      : 0);

                  await axios
                    .post("/api/reservation/reserve/", {
                      url: window.location.href,
                      email: passengers[0].email,
                      passengers: passengers,
                      selectedGoingTicket: selectedGoingTicket,
                      selectedReturningTicket: selectedReturningTicket,
                      oneWay: !oneWay,
                      departureDate: departureDate,
                      arrivalDate: arrivalDate,
                      numberOfTickets: numberOfTickets,
                      total: total,
                    })
                    .then(function (response) {
                      console.log(response.data);
                      setConfirm(false);
                      window.location.href = response.data.gateWayUrl;
                    })
                    .catch(function (error) {
                      console.log(error);
                      if (error) {
                      }
                    });
                }}
                color="primary"
              >
                Confirm
              </Button>
            </DialogActions>
          </Dialog>
          <Dialog
            open={messageDialog}
            TransitionComponent={Transition}
            keepMounted
            onClose={() => setMessageDialog(false)}
            aria-labelledby="alert-dialog-slide-title"
            aria-describedby="alert-dialog-slide-description"
          >
            <DialogTitle id="alert-dialog-slide-title">
              {messageLevel}
            </DialogTitle>
            <DialogContent>
              <DialogContentText id="alert-dialog-slide-description">
                {message}
              </DialogContentText>
            </DialogContent>
            <DialogActions>
              <Button onClick={() => setMessageDialog(false)} color="primary">
                Close
              </Button>
              {messageLevel === "Cancel" && (
                <Button
                  onClick={() => {
                    props.setSelectedGoingTicket("");
                    props.setSelectedReturningTicket("");
                    props.setSearch(true);
                  }}
                  color="primary"
                >
                  Confirm
                </Button>
              )}
            </DialogActions>
          </Dialog>
        </Paper>
      </div>
    </Container>
  );
}

export default ReserveForm;
