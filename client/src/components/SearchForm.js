import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Paper, TextField, Grid, Button } from "@material-ui/core";
import { Autocomplete } from "@material-ui/lab";
import {
  MuiPickersUtilsProvider,
  DatePicker,
} from "@material-ui/pickers";
import DateFnsUtils from "@date-io/date-fns";
import { useForm, Controller } from "react-hook-form";
import axios from "axios";

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
}));

function SearchForm() {
  const classes = useStyles();
  const { control } = useForm();

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
        <Grid item>
          <Autocomplete
            id="combo-box-demo"
            fullWidth
            filterOptions={(x) => x}
            options={retrievedAirports}
            renderOption={(option) => {
              //console.log(retrievedAirports);
              if (retrievedAirports && retrievedAirports.length > 0) {
                return option.name;
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
                return option.name;
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
              value={departureDate}
              onChange={(date) => setDepartureDate(date)}
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
              value={arrivalDate}
              onChange={(date) => setArrivalDate(date)}
              KeyboardButtonProps={{
                "aria-label": "change date",
              }}
            />
          </MuiPickersUtilsProvider>
        </Grid>
        <Grid container direction={"row"} spacing={3} className={classes.field}>
          <Grid item xs={4}>
            <TextField
              id="outlined-number"
              label="Adults"
              type="number"
              fullWidth
              onChange={(value) => setAdults(value)}
              InputLabelProps={{
                shrink: true,
                inputProps: {
                  min: 0,
                },
              }}
            />
          </Grid>
          <Grid item xs={4}>
            <TextField
              id="outlined-number"
              label="Children"
              type="number"
              fullWidth
              onChange={(value) => setChildren(value)}
              InputLabelProps={{
                shrink: true,
                inputProps: {
                  min: 0,
                },
              }}
            />
          </Grid>
          <Grid item xs={4}>
            <TextField
              id="outlined-number"
              label="Infants"
              type="number"
              fullWidth
              onChange={(value) => setInfants(value)}
              InputLabelProps={{
                shrink: true,
                inputProps: {
                  min: 0,
                },
              }}
            />
          </Grid>
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
    </Paper>
  );
}

export default SearchForm;
