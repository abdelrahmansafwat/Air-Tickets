import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
//import clsx from "clsx";
import {
  Paper,
  TextField,
  Grid,
  Button,
  Typography,
  Switch,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  IconButton,
  DialogTitle,
  Slide,
  InputAdornment,
  ListItemText,
  ListItem,
  List,
  Divider,
  AppBar,
  Toolbar,
  ListItemIcon,
  Radio,
  ListItemSecondaryAction,
  CircularProgress,
} from "@material-ui/core";
import { Autocomplete } from "@material-ui/lab";
import { MuiPickersUtilsProvider, DatePicker } from "@material-ui/pickers";
import {
  RemoveCircle,
  AddCircle,
  LocationOn,
  Wc,
  Today,
  ImportExport,
  Close,
} from "@material-ui/icons";
import { CustomSwitchStyles } from "./CustomSwitch";
import { CustomButtonStyles } from "./CustomButton";
import DateFnsUtils from "@date-io/date-fns";
//import { useForm, Controller } from "react-hook-form";
import axios from "axios";
import _ from "underscore";
import BG from "../resources/BG.png";
import BS from "../resources/BS.png";
import VQ from "../resources/VQ.png";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const useStyles = makeStyles((theme) => ({
  form: {
    display: "flex",
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
  dialog: {
    [theme.breakpoints.up("md")]: {
      width: "35%",
    },
    [theme.breakpoints.down("md")]: {
      width: "50%",
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
  },
  title: {
    marginLeft: theme.spacing(2),
    flex: 1,
  },
}));

function SearchForm() {
  const classes = useStyles();
  //const { control } = useForm();

  //const [departureAirport, setDepartureAirport] = useState("");
  const [selectedDepartureAirport, setSelectedDepartureAirport] = useState("");
  //const [arrivalAirport, setArrivalAirport] = useState("");
  const [selectedArrivalAirport, setSelectedArrivalAirport] = useState("");
  const [retrievedAirports, setRetrievedAirports] = useState([]);
  const [departureDate, setDepartureDate] = useState(new Date());
  const [arrivalDate, setArrivalDate] = useState(new Date());
  const [adults, setAdults] = useState(1);
  const [children, setChildren] = useState(0);
  const [infants, setInfants] = useState(0);
  const [oneWay, setOneWay] = useState(false);
  const [passengersDialog, setPassengersDialog] = useState(false);
  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState(false);
  const [availableReservationsGoing, setAvailableReservationsGoing] = useState(
    []
  );
  const [
    availableReservationsReturning,
    setAvailableReservationsReturning,
  ] = useState([]);
  const [reservationsDialog, setReservationsDialog] = useState(false);
  const [selectedValue, setSelectedValue] = useState("");
  const [ready, setReady] = useState(true);
  const [secondPage, setSecondPage] = useState(false);

  const CustomSwitch = CustomSwitchStyles();
  const CustomButton = CustomButtonStyles({ chubby: true });

  const getAirports = async (query) => {
    console.log("Getting info from API...");
    axios.create({ baseURL: window.location.origin });
    await axios
      .get("/api/airport/find/" + query)
      .then(function (response) {
        //console.log(response.data.data.length);
        console.log(response.data.data);
        if (response.data.data && response.data.data.length > 0) {
          console.log(response.data.data);
          setRetrievedAirports(response.data.data);
        } else {
          setRetrievedAirports([]);
        }
        //history.push("/dashboard");
      })
      .catch(function (error) {
        console.log(error);
        if (error) {
        }
      });
  };

  const handleInputChange = async (e) => {
    //setDepartureAirport(e.target.value);
    //console.log(e.target.value);
    if (e.target.value && e.target.value.length > 0) {
      console.log(e.target.value);
      await getAirports(e.target.value);
    } else {
      setRetrievedAirports([]);
    }
  };

  const handleChange = (event) => {
    setSelectedValue(event.currentTarget.value);
  };

  const preprocessData = (data) => {
    var birman = data.birman;
    var flynovoair = data.flynovoair;
    var usbair = data.usbair;
    var going = [];
    var returning = [];
    var lowestPrice = [];

    if (!oneWay) {
      if (!birman.hasOwnProperty("Error")) {
        for (const [ticketKey, ticket] of Object.entries(birman)) {
          lowestPrice = [];
          birman[ticketKey]["planeCode"] = ticketKey;
          for (const [priceKey, price] of Object.entries(ticket.prices)) {
            birman[ticketKey]["prices"][priceKey] = price
              .split(" ")[1]
              .replace(",", "");
            lowestPrice.push(parseInt(birman[ticketKey]["prices"][priceKey]));
          }
          birman[ticketKey]["lowestPrice"] = Math.min(...lowestPrice);
          going.push(birman[ticketKey]);
        }
      }

      if (!flynovoair.hasOwnProperty("Error")) {
        for (const [ticketKey, ticket] of Object.entries(flynovoair)) {
          lowestPrice = [];
          flynovoair[ticketKey]["planeCode"] = ticketKey;
          for (const [priceKey, price] of Object.entries(ticket.prices)) {
            lowestPrice.push(
              parseInt(flynovoair[ticketKey]["prices"][priceKey])
            );
          }
          flynovoair[ticketKey]["lowestPrice"] = Math.min(...lowestPrice);
          going.push(flynovoair[ticketKey]);
        }
      }

      if (!usbair.hasOwnProperty("Error")) {
        for (const [ticketKey, ticket] of Object.entries(usbair)) {
          lowestPrice = [];
          usbair[ticketKey]["planeCode"] = ticketKey;
          for (const [priceKey, price] of Object.entries(ticket.prices)) {
            console.log(price.replace(",", ""));
            usbair[ticketKey]["prices"][priceKey] = price.replace(",", "");
            console.log(usbair[ticketKey]["prices"][priceKey]);
            lowestPrice.push(parseInt(usbair[ticketKey]["prices"][priceKey]));
          }
          usbair[ticketKey]["lowestPrice"] = Math.min(...lowestPrice);
          going.push(usbair[ticketKey]);
        }
      }

      going = _.sortBy(going, "lowestPrice");

      console.log(going);
      setAvailableReservationsGoing(going);
    } else {
      if (!birman.hasOwnProperty("Error")) {
        for (const [ticketKey, ticket] of Object.entries(birman)) {
          lowestPrice = [];
          birman[ticketKey]["planeCode"] = ticketKey;
          for (const [priceKey, price] of Object.entries(ticket.prices)) {
            birman[ticketKey]["prices"][priceKey] = price
              .split(" ")[1]
              .replace(",", "");
            lowestPrice.push(parseInt(birman[ticketKey]["prices"][priceKey]));
          }
          birman[ticketKey]["lowestPrice"] = Math.min(...lowestPrice);
          if (ticket["from"] === String(selectedDepartureAirport.code)) {
            going.push(birman[ticketKey]);
          } else {
            returning.push(birman[ticketKey]);
          }
        }
      }

      if (!flynovoair.hasOwnProperty("Error")) {
        for (const [ticketKey, ticket] of Object.entries(flynovoair)) {
          lowestPrice = [];
          flynovoair[ticketKey]["planeCode"] = ticketKey;
          for (const [priceKey, price] of Object.entries(ticket.prices)) {
            lowestPrice.push(
              parseInt(flynovoair[ticketKey]["prices"][priceKey])
            );
          }
          flynovoair[ticketKey]["lowestPrice"] = Math.min(...lowestPrice);
          if (ticket["from"] === String(selectedDepartureAirport.code)) {
            going.push(flynovoair[ticketKey]);
          } else {
            returning.push(flynovoair[ticketKey]);
          }
        }
      }

      if (!usbair.hasOwnProperty("Error")) {
        for (const [ticketKey, ticket] of Object.entries(usbair)) {
          lowestPrice = [];
          usbair[ticketKey]["planeCode"] = ticketKey;
          for (const [priceKey, price] of Object.entries(ticket.prices)) {
            console.log(price.replace(",", ""));
            usbair[ticketKey]["prices"][priceKey] = price.replace(",", "");
            console.log(usbair[ticketKey]["prices"][priceKey]);
            lowestPrice.push(parseInt(usbair[ticketKey]["prices"][priceKey]));
          }
          usbair[ticketKey]["lowestPrice"] = Math.min(...lowestPrice);
          if (ticket["from"] === String(selectedDepartureAirport.cityName)) {
            going.push(usbair[ticketKey]);
          } else {
            returning.push(usbair[ticketKey]);
          }
        }
      }

      console.log(going);
      console.log(returning);

      going = _.sortBy(going, "lowestPrice");
      returning = _.sortBy(returning, "lowestPrice");

      setAvailableReservationsGoing(going);
      setAvailableReservationsReturning(returning);
    }
  };

  return (
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
            <Switch
              checked={oneWay}
              onChange={(value) => setOneWay(value.target.checked)}
              name="checkedB"
              classes={CustomSwitch}
            />
          </Grid>
          <Grid item xs={"auto"}></Grid>
        </Grid>
        <Grid item>
          <Autocomplete
            id="combo-box-demo"
            fullWidth
            freeSolo
            disableClearable
            filterOptions={(x) => x}
            options={retrievedAirports}
            value={
              selectedDepartureAirport.name
                ? String(selectedDepartureAirport.name)
                : ""
            }
            renderOption={(option) => {
              //console.log(retrievedAirports);
              if (retrievedAirports && retrievedAirports.length > 0) {
                return (
                  <Grid container alignItems="center">
                    <Grid item>
                      <LocationOn className={classes.icon} />
                    </Grid>
                    <Grid item xs>
                      <span key={option.name} style={{ fontWeight: 700 }}>
                        {option.name + " (" + option.code + ")"}
                      </span>
                      <Typography variant="body2" color="textSecondary">
                        {option.cityName}
                      </Typography>
                    </Grid>
                  </Grid>
                );
              }
            }}
            onChange={(event, newValue) => {
              console.log(newValue.name);
              setSelectedDepartureAirport(newValue);
              setRetrievedAirports([]);
              console.log(selectedDepartureAirport);
            }}
            onInputChange={handleInputChange}
            renderInput={(params) => (
              <TextField
                //variant="outlined"
                classes={{ root: classes.textField }}
                {...params}
                margin="normal"
                fullWidth
                id="departureAirport"
                label="Departure Airport"
                name="departureAirport"
                placeholder="From where?"
                InputProps={{
                  ...params.InputProps,
                  startAdornment: (
                    <InputAdornment position="start">
                      <LocationOn className={classes.icon} />
                    </InputAdornment>
                  ),
                }}
                onFocus={() => {
                  setSelectedDepartureAirport("");
                }}
              />
            )}
          />
        </Grid>

        <Grid
          container
          direction={"row"}
          spacing={3}
          className={classes.oneWayGrid}
        >
          <Grid item xs={"auto"}></Grid>
          <Grid item xs={"auto"}>
            <IconButton
              onClick={() => {
                var arrivalTemp = selectedArrivalAirport;
                var departureTemp = selectedDepartureAirport;
                setSelectedDepartureAirport(arrivalTemp);
                setSelectedArrivalAirport(departureTemp);
              }}
            >
              <ImportExport className={classes.icon} />
            </IconButton>
          </Grid>
          <Grid item xs={"auto"}></Grid>
        </Grid>

        <Grid item>
          <Autocomplete
            id="combo-box-demo"
            fullWidth
            freeSolo
            disableClearable
            filterOptions={(x) => x}
            options={retrievedAirports}
            value={
              selectedArrivalAirport.name
                ? String(selectedArrivalAirport.name)
                : ""
            }
            renderOption={(option) => {
              //console.log(retrievedAirports);
              if (retrievedAirports && retrievedAirports.length > 0) {
                return (
                  <Grid container alignItems="center">
                    <Grid item>
                      <LocationOn className={classes.icon} />
                    </Grid>
                    <Grid item xs>
                      <span key={option.name} style={{ fontWeight: 700 }}>
                        {option.name + " (" + option.code + ")"}
                      </span>
                      <Typography variant="body2" color="textSecondary">
                        {option.cityName}
                      </Typography>
                    </Grid>
                  </Grid>
                );
              }
            }}
            onChange={(event, newValue) => {
              console.log(newValue.name);
              setSelectedArrivalAirport(newValue);
              setRetrievedAirports([]);
            }}
            onInputChange={handleInputChange}
            renderInput={(params) => (
              <TextField
                //variant="outlined"
                classes={{ root: classes.textField }}
                {...params}
                margin="normal"
                fullWidth
                id="arrivalAirport"
                label="Arrival Airport"
                name="arrivalAirport"
                placeholder="To where?"
                InputProps={{
                  ...params.InputProps,
                  startAdornment: (
                    <InputAdornment position="start">
                      <LocationOn className={classes.icon} />
                    </InputAdornment>
                  ),
                }}
                onFocus={() => {
                  setSelectedArrivalAirport("");
                }}
              />
            )}
          />
        </Grid>
        <Grid item>
          <MuiPickersUtilsProvider utils={DateFnsUtils}>
            <DatePicker
              disableToolbar
              classes={{ root: classes.textField }}
              fullWidth
              variant="outlined"
              margin="normal"
              id="date"
              label="Departure Date"
              disablePast
              value={departureDate}
              onChange={(date) => {
                setDepartureDate(date);
                setArrivalDate(date);
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
        <Grid item>
          <MuiPickersUtilsProvider utils={DateFnsUtils}>
            <DatePicker
              disableToolbar
              classes={{ root: classes.textField }}
              fullWidth
              variant="outlined"
              margin="normal"
              id="date"
              label="Return Date"
              minDate={departureDate}
              value={arrivalDate}
              disabled={!oneWay}
              onChange={(date) => setArrivalDate(date)}
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
        <Grid item>
          <TextField
            classes={{ root: classes.textField }}
            id="outlined-number"
            label="Passengers"
            fullWidth
            value={
              adults +
              " Adults, " +
              children +
              " Children, " +
              infants +
              " Infants"
            }
            //value={passengers}
            //onChange={(value) => setAdults(value)}
            onClick={() => setPassengersDialog(true)}
            InputLabelProps={{
              shrink: true,
            }}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Wc className={classes.icon} />
                </InputAdornment>
              ),
            }}
          />
        </Grid>

        <Grid item className={classes.field}>
          <Grid
            container
            direction={"row"}
            spacing={3}
            className={classes.oneWayGrid}
          >
            <Grid item xs={"auto"}></Grid>
            <Grid item xs={"auto"}>
              <Button
                variant="contained"
                color="primary"
                component="span"
                classes={CustomButton}
                onClick={async (event) => {
                  setReady(false);
                  setReservationsDialog(true);
                  axios.create({ baseURL: window.location.origin });

                  await axios
                    .post("/api/reservation/find/", {
                      departure_code: String(selectedDepartureAirport.code),
                      arrival_code: String(selectedArrivalAirport.code),
                      departure_date: departureDate.toISOString().split("T")[0],
                      arrival_date: arrivalDate.toISOString().split("T")[0],
                      adult: String(adults),
                      child: String(children),
                      infant: String(infants),
                      oneway: String(!oneWay),
                    })
                    .then(function (response) {
                      console.log(response.data);
                      preprocessData(response.data);
                    })
                    .catch(function (error) {
                      console.log(error);
                      if (error) {
                      }
                    });
                  setReady(true);
                }}
              >
                Search
              </Button>
            </Grid>
            <Grid item xs={"auto"}></Grid>
          </Grid>
        </Grid>
      </Grid>
      <Dialog
        open={passengersDialog}
        TransitionComponent={Transition}
        keepMounted
        onClose={() => setPassengersDialog(false)}
        aria-labelledby="alert-dialog-slide-title"
        aria-describedby="alert-dialog-slide-description"
        classes={{ paper: classes.dialog }}
      >
        <DialogTitle id="alert-dialog-slide-title">
          {"Add Passengers"}
        </DialogTitle>
        <DialogContent>
          <Grid
            container
            direction={"row"}
            spacing={3}
            className={classes.field}
            xs={"auto"}
          >
            <Grid item xs={12} md={"auto"}>
              <Grid container direction={"column"} xs={"auto"}>
                <Grid item style={{ textAlign: "center" }} xs={"auto"}>
                  <Typography variant="h6">{"Adults"}</Typography>
                </Grid>
                <Grid
                  container
                  direction={"row"}
                  className={classes.oneWayGrid}
                  xs={"auto"}
                >
                  <Grid item xs={"auto"}>
                    <IconButton
                      color="primary"
                      aria-label="upload picture"
                      component="span"
                      onClick={() => {
                        if (adults > 1) {
                          setAdults(adults - 1);
                          if (adults < infants) {
                            setInfants(0);
                            setError(true);
                            setErrorMessage(
                              "Number of infants can't be more than the number of adults."
                            );
                          }
                        }
                      }}
                    >
                      <RemoveCircle />
                    </IconButton>
                  </Grid>
                  <Grid item xs={"auto"}>
                    {adults}
                  </Grid>
                  <Grid item xs={"auto"}>
                    <IconButton
                      color="primary"
                      aria-label="upload picture"
                      component="span"
                      onClick={() => {
                        if (adults + children + infants < 9) {
                          setAdults(adults + 1);
                        } else {
                          setError(true);
                          setErrorMessage(
                            "Number of passengers can't be more than 9."
                          );
                        }
                      }}
                    >
                      <AddCircle />
                    </IconButton>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
            <Grid item xs={12} md={"auto"}>
              <Grid container direction={"column"}>
                <Grid item style={{ textAlign: "center" }} xs={"auto"}>
                  <Typography variant="h6">{"Children"}</Typography>
                </Grid>
                <Grid
                  container
                  direction={"row"}
                  className={classes.oneWayGrid}
                  xs={"auto"}
                >
                  <Grid item xs={"auto"}>
                    <IconButton
                      color="primary"
                      aria-label="upload picture"
                      component="span"
                      onClick={() => {
                        if (children > 0) {
                          setChildren(children - 1);
                        }
                      }}
                    >
                      <RemoveCircle />
                    </IconButton>
                  </Grid>
                  <Grid item xs={"auto"}>
                    {children}
                  </Grid>
                  <Grid item xs={"auto"}>
                    <IconButton
                      color="primary"
                      aria-label="upload picture"
                      component="span"
                      onClick={() => {
                        if (adults + children + infants < 9) {
                          setChildren(children + 1);
                        } else {
                          setError(true);
                          setErrorMessage(
                            "Number of passengers can't be more than 9."
                          );
                        }
                      }}
                    >
                      <AddCircle />
                    </IconButton>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
            <Grid item xs={12} md={"auto"}>
              <Grid container direction={"column"} xs={"auto"}>
                <Grid item style={{ textAlign: "center" }} xs={"auto"}>
                  <Typography variant="h6">{"Infants"}</Typography>
                </Grid>
                <Grid
                  container
                  direction={"row"}
                  className={classes.oneWayGrid}
                  xs={"auto"}
                >
                  <Grid item xs={"auto"}>
                    <IconButton
                      color="primary"
                      aria-label="upload picture"
                      component="span"
                      onClick={() => {
                        if (infants > 0) {
                          setInfants(infants - 1);
                        }
                      }}
                    >
                      <RemoveCircle />
                    </IconButton>
                  </Grid>
                  <Grid item xs={"auto"}>
                    {infants}
                  </Grid>
                  <Grid item xs={"auto"}>
                    <IconButton
                      color="primary"
                      aria-label="upload picture"
                      component="span"
                      onClick={() => {
                        if (
                          adults + children + infants < 9 &&
                          adults > infants
                        ) {
                          setInfants(infants + 1);
                        } else if (adults <= infants) {
                          setError(true);
                          setErrorMessage(
                            "Number of infants can't be more than the number of adults."
                          );
                        } else {
                          setError(true);
                          setErrorMessage(
                            "Number of passengers can't be more than 9."
                          );
                        }
                      }}
                    >
                      <AddCircle />
                    </IconButton>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={() => setPassengersDialog(false)}
            variant="contained"
          >
            Close
          </Button>
        </DialogActions>
      </Dialog>
      <Dialog
        fullScreen
        open={reservationsDialog}
        onClose={() => {
          setAvailableReservationsGoing([]);
          setAvailableReservationsReturning([]);
          setReservationsDialog(false);
        }}
        TransitionComponent={Transition}
      >
        <AppBar className={classes.appBar}>
          <Toolbar>
            <IconButton
              edge="start"
              color="inherit"
              onClick={() => {
                setAvailableReservationsGoing([]);
                setAvailableReservationsReturning([]);
                setReservationsDialog(false);
              }}
              aria-label="close"
            >
              <Close />
            </IconButton>
            <Typography variant="h6" className={classes.title}>
              {secondPage
                ? "From " +
                  selectedArrivalAirport.cityName +
                  " to " +
                  selectedDepartureAirport.cityName +
                  " on " +
                  arrivalDate.toISOString().split("T")[0]
                : "From " +
                  selectedDepartureAirport.cityName +
                  " to " +
                  selectedArrivalAirport.cityName +
                  " on " +
                  departureDate.toISOString().split("T")[0]}
            </Typography>
            <Button
              autoFocus
              color="inherit"
              onClick={() => {
                if (oneWay) {
                  setSecondPage(true);
                } else {
                  setAvailableReservationsGoing([]);
                  setAvailableReservationsReturning([]);
                  setReservationsDialog(false);
                }
              }}
            >
              Next
            </Button>
          </Toolbar>
        </AppBar>
        {ready && !secondPage && (
          <List>
            {availableReservationsGoing.map((data) => (
              <React.Fragment>
                <ListItem
                  button
                  onClick={() => setSelectedValue(data.planeCode)}
                >
                  <ListItemIcon>
                    <Radio
                      checked={selectedValue === data.planeCode}
                      onChange={() => setSelectedValue(data.planeCode)}
                      value={data.planeCode}
                      name="radio-button-demo"
                      inputProps={{ "aria-label": "A" }}
                    />
                  </ListItemIcon>
                  <ListItemText
                    primary={"Price: " + data.lowestPrice + " BDT"}
                    secondary={"Take off: " + data.take_off.substring(0, 5)}
                  />
                  <ListItemSecondaryAction>
                    <img
                      src={
                        data.planeCode.substring(0, 2) === "BG"
                          ? BG
                          : data.planeCode.substring(0, 2) === "BS"
                          ? BS
                          : VQ
                      }
                      alt={data.planeCode.substring(0, 2)}
                    />
                  </ListItemSecondaryAction>
                </ListItem>
                <Divider />
              </React.Fragment>
            ))}
          </List>
        )}

        {ready && secondPage && (
          <List>
            {availableReservationsReturning.map((data) => (
              <React.Fragment>
                <ListItem
                  button
                  onClick={() => setSelectedValue(data.planeCode)}
                >
                  <ListItemIcon>
                    <Radio
                      checked={selectedValue === data.planeCode}
                      onChange={() => setSelectedValue(data.planeCode)}
                      value={data.planeCode}
                      name="radio-button-demo"
                      inputProps={{ "aria-label": "A" }}
                    />
                  </ListItemIcon>
                  <ListItemText
                    primary={"Price: " + data.lowestPrice + " BDT"}
                    secondary={"Take off: " + data.take_off.substring(0, 5)}
                  />
                  <ListItemSecondaryAction>
                    <img
                      src={
                        data.planeCode.substring(0, 2) === "BG"
                          ? BG
                          : data.planeCode.substring(0, 2) === "BS"
                          ? BS
                          : VQ
                      }
                      alt={data.planeCode.substring(0, 2)}
                    />
                  </ListItemSecondaryAction>
                </ListItem>
                <Divider />
              </React.Fragment>
            ))}
          </List>
        )}

        {!ready && (
          <Grid
            container
            spacing={0}
            direction="column"
            alignItems="center"
            justify="center"
            style={{ position: "absolute", top: "50%" }}
          >
            <CircularProgress />

            <Grid item xs={3}>
              <Typography style={{ textAlign: "center" }}>
                {"We are searching the best fares for you."}
              </Typography>
              <Typography style={{ textAlign: "center" }}>
                {"Please wait a moment."}
              </Typography>
            </Grid>
          </Grid>
        )}
      </Dialog>
      <Dialog
        open={error}
        TransitionComponent={Transition}
        keepMounted
        onClose={() => setError(false)}
        aria-labelledby="alert-dialog-slide-title"
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle id="alert-dialog-slide-title">{"Error"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-slide-description">
            {errorMessage}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setError(false)} color="primary">
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </Paper>
  );
}

export default SearchForm;
