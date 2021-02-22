import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Paper, TextField, Grid } from "@material-ui/core";
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
    marginVertical: "2%",
  },
}));

const getAirports = () => {
  console.log("Getting info from API...");

  axios
    .post("/api/upload_board_decisions/delete")
    .then(function (response) {
      console.log(response);
      console.log(alldecisions.length);
      alldecisions.splice(index - 1, 1);
      console.log(alldecisions.length);
      setBoardDecisions(alldecisions);
      //history.push("/dashboard");
    })
    .catch(function (error) {
      console.log(error);
      if (error) {
        setErrorMessage("An error occured. Please try again.");
        setAuthError(true);
      }
    });
};

function SearchForm() {
  const classes = useStyles();
  const { control } = useForm();

  const [departureAirport, setDepartureAirport] = useState("");
  const [arrivalAirport, setArrivalAirport] = useState("");

  return (
    <Paper elevation={10} className={classes.form}>
      <Grid
        container
        direction={"column"}
        spacing={1}
        className={classes.dflex}
      >
        <Grid item>
          <Controller
            name="departureAirport"
            className={classes.field}
            as={
              <TextField
                value={departureAirport}
                //variant="outlined"
                margin="normal"
                fullWidth
                id="departureAirport"
                label="Departure Airport"
                name="departureAirport"
                onChange={(e) => {
                  setDepartureAirport(e.target.value);
                }}
              />
            }
            control={control}
          />
        </Grid>

        <Grid item>
          <Controller
            name="arrivalAirport"
            className={classes.field}
            as={
              <TextField
                value={arrivalAirport}
                //variant="outlined"
                margin="normal"
                fullWidth
                id="arrivalAirport"
                label="Arrival Airport"
                name="arrivalAirport"
                onChange={(e) => {
                  setArrivalAirport(e.target.value);
                }}
              />
            }
            control={control}
          />
        </Grid>
      </Grid>
    </Paper>
  );
}

export default SearchForm;
