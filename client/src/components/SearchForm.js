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
  IconButton,
  DialogTitle,
  Slide,
} from "@material-ui/core";
import { Autocomplete } from "@material-ui/lab";
import { MuiPickersUtilsProvider, DatePicker } from "@material-ui/pickers";
import { RemoveCircle, AddCircle, LocationOn } from "@material-ui/icons";

import DateFnsUtils from "@date-io/date-fns";
//import { useForm, Controller } from "react-hook-form";
import axios from "axios";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const useStyles = makeStyles((theme) => ({
  form: {
    display: "flex",
    width: "50%",
    margin: "10%",
    alignItems: "center",
    justifyContent: "center",
    padding: "2%",
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
    color: theme.palette.text.secondary,
    marginRight: theme.spacing(2),
  },
  dialog: {
    width: "35%",
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
  const [adults, setAdults] = useState(0);
  const [children, setChildren] = useState(0);
  const [infants, setInfants] = useState(0);
  const [oneWay, setOneWay] = useState(false);
  const [passengersDialog, setPassengersDialog] = useState(false);

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
          <Grid item xs={"auto"}>
            <Button
              className={classes.oneWayButton}
              onClick={() => setOneWay(false)}
            >
              <Typography
                variant="h5"
                className={oneWay ? classes.disabledText : classes.enabledText}
              >
                One way
              </Typography>
            </Button>
          </Grid>
          <Grid item xs={"auto"}>
            <Switch
              checked={oneWay}
              onChange={(value) => setOneWay(value.target.checked)}
              name="checkedB"
              color={"primary"}
              switchBase={{
                color: "#6dd5ed",
              }}
              colorPrimary={{
                color: "#2193b0",
              }}
            />
          </Grid>
          <Grid item xs={"auto"}>
            <Button
              className={classes.oneWayButton}
              onClick={() => setOneWay(true)}
            >
              <Typography
                variant="h5"
                className={oneWay ? classes.enabledText : classes.disabledText}
              >
                Roundtrip
              </Typography>
            </Button>
          </Grid>
        </Grid>
        <Grid item>
          <Autocomplete
            id="combo-box-demo"
            fullWidth
            filterOptions={(x) => x}
            options={retrievedAirports}
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
            }}
            onInputChange={handleInputChange}
            value={selectedDepartureAirport.name}
            renderInput={(params) => (
              <TextField
                //variant="outlined"
                {...params}
                margin="normal"
                fullWidth
                id="departureAirport"
                label="Departure Airport"
                name="departureAirport"
              />
            )}
          />
        </Grid>

        <Grid item>
          <Autocomplete
            id="combo-box-demo"
            fullWidth
            filterOptions={(x) => x}
            options={retrievedAirports}
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
            }}
            onInputChange={handleInputChange}
            value={selectedArrivalAirport.name}
            renderInput={(params) => (
              <TextField
                //variant="outlined"
                {...params}
                margin="normal"
                fullWidth
                id="arrivalAirport"
                label="Arrival Airport"
                name="arrivalAirport"
              />
            )}
          />
        </Grid>
        <Grid item>
          <MuiPickersUtilsProvider utils={DateFnsUtils}>
            <DatePicker
              disableToolbar
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
            />
          </MuiPickersUtilsProvider>
        </Grid>
        <Grid item>
          <MuiPickersUtilsProvider utils={DateFnsUtils}>
            <DatePicker
              disableToolbar
              fullWidth
              variant="outlined"
              margin="normal"
              id="date"
              label="Arrival Date"
              minDate={departureDate}
              value={arrivalDate}
              disabled={!oneWay}
              onChange={(date) => setArrivalDate(date)}
              KeyboardButtonProps={{
                "aria-label": "change date",
              }}
            />
          </MuiPickersUtilsProvider>
        </Grid>
        <Grid item>
          <TextField
            id="outlined-number"
            label="Passengers"
            fullWidth
            //value={passengers}
            //onChange={(value) => setAdults(value)}
            onClick={() => setPassengersDialog(true)}
            InputLabelProps={{
              shrink: true,
            }}
          />
        </Grid>

        <Grid item className={classes.field}>
          <Button
            variant="contained"
            color="primary"
            component="span"
            fullWidth
            onClick={(event) => {}}
          >
            Submit
          </Button>
        </Grid>
      </Grid>
      <Dialog
        open={passengersDialog}
        TransitionComponent={Transition}
        keepMounted
        onClose={() => setPassengersDialog(false)}
        aria-labelledby="alert-dialog-slide-title"
        aria-describedby="alert-dialog-slide-description"
        classes={{ paper: classes.dialog}}
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
            <Grid item xs={"auto"}>
              <Grid container direction={"column"} xs={"auto"}>
                <Grid item style={{textAlign: "center"}} xs={"auto"}>
                  <Typography variant="h6">
                    {"Adults"}
                  </Typography>
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
                        if(adults > 0){
                          setAdults(adults-1);
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
                        setAdults(adults+1);
                      }}
                    >
                      <AddCircle />
                    </IconButton>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
            <Grid item xs={"auto"}>
              <Grid
                container
                direction={"column"}
                
              >
                <Grid item style={{textAlign: "center"}} xs={"auto"}>
                  <Typography variant="h6">
                    {"Children"}
                  </Typography>
                </Grid>
                <Grid container direction={"row"} className={classes.oneWayGrid} xs={"auto"}>
                  <Grid item xs={"auto"}>
                    <IconButton
                      color="primary"
                      aria-label="upload picture"
                      component="span"
                      onClick={() => {
                        if(children > 0){
                          setChildren(children-1);
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
                        setChildren(children+1);
                      }}
                    >
                      <AddCircle />
                    </IconButton>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
            <Grid item xs={"auto"}>
              <Grid container direction={"column"} xs={"auto"}>
                <Grid item style={{textAlign: "center"}} xs={"auto"}>
                  <Typography variant="h6">
                    {"Infants"}
                  </Typography>
                </Grid>
                <Grid container direction={"row"} className={classes.oneWayGrid} xs={"auto"}>
                  <Grid item xs={"auto"}>
                    <IconButton
                      color="primary"
                      aria-label="upload picture"
                      component="span"
                      onClick={() => {
                        if(infants > 0){
                          setInfants(infants-1);
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
                        setInfants(infants+1);
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
    </Paper>
  );
}

export default SearchForm;
