import React from "react";
import {
  Page,
  Text,
  View,
  Document,
  StyleSheet,
  Font,
  Image,
} from "@react-pdf/renderer";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import { Grid, Typography, Card, CardActionArea } from "@material-ui/core";
import { FlightTakeoff, FlightLand, ArrowForward } from "@material-ui/icons";
import logo from "../resources/logo.png";
import BG from "../resources/BG.png";
import BS from "../resources/BS.png";
import VQ from "../resources/VQ.png";
const _ = require("underscore");

const useStyles = makeStyles((theme) => ({
  body: {
    paddingTop: 35,
    paddingBottom: 65,
    paddingHorizontal: 35,
    border: 30,
  },
  title: {
    fontSize: 16,
    textAlign: "center",
  },
  author: {
    fontSize: 12,
    textAlign: "center",
    marginBottom: 40,
  },
  subtitle: {
    fontSize: 18,
    margin: 12,
  },
  text: {
    margin: "5 12 5 12",
    fontSize: 12,
  },
  image: {
    marginVertical: 15,
    maxWidth: 100,
    marginRight: 100,
  },
  header: {
    fontSize: 12,
    marginBottom: 20,
    textAlign: "center",
    color: "grey",
  },
  pageNumber: {
    position: "absolute",
    fontSize: 12,
    bottom: 30,
    left: 0,
    right: 0,
    textAlign: "center",
    color: "grey",
  },
  section: {
    margin: 5,
    padding: 5,
    //flexGrow: 1,
  },
  department: {
    backgroundColor: "#2193b0",
    color: "white",
    paddingTop: 3,
    margin: 12,
    fontSize: 14,
    display: "inline-block",
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
  oneWayGrid: {
    alignItems: "center",
    justifyContent: "center",
  },
}));

class Print extends React.PureComponent {
  render() {
    const classes = this.props;
    console.log(this.props.reservation.selectedGoingTicket);
    var reservation = this.props.reservation;
    return (
      <Grid container>
        <Grid item xs={1}></Grid>
        <Grid item xs={10}>
          <Card
            elevation={10}
            className={classes.paper}
            style={{ backgroundColor: "gray" }}
          >
            <CardActionArea disabled>
              <Grid direction={"row"} className={classes.oneWayGrid} container>
                <Grid xs={4} item>
                  <img
                    src={
                      reservation.selectedGoingTicket[0].planeCode.substring(
                        0,
                        2
                      ) === "BG"
                        ? BG
                        : reservation.selectedGoingTicket[0].planeCode.substring(
                            0,
                            2
                          ) === "BS"
                        ? BS
                        : VQ
                    }
                    alt={reservation.selectedGoingTicket[0].planeCode.substring(
                      0,
                      2
                    )}
                  />
                  <Typography style={{ textAlign: "center" }}>
                    {reservation.selectedGoingTicket[0].planeCode.substring(
                      0,
                      2
                    ) === "BG"
                      ? "Biman Airlines"
                      : reservation.selectedGoingTicket[0].planeCode.substring(
                          0,
                          2
                        ) === "BS"
                      ? "US Bangla"
                      : "Novo Air"}
                  </Typography>
                  <Typography style={{ textAlign: "center" }}>
                    {reservation.selectedGoingTicket[0].planeCode.replace(
                      "-",
                      ""
                    )}
                  </Typography>
                  <Typography style={{ textAlign: "center" }}>
                    {new Date(reservation.departureDate).toLocaleDateString()}
                  </Typography>
                </Grid>
                <Grid xs={4} container direction={"column"}>
                  <Grid
                    container
                    direction={"column"}
                    style={{ textAlign: "center" }}
                    justify="center"
                  >
                    <Typography
                      style={{
                        textAlign: "center",
                        fontSize: 24,
                      }}
                    >
                      Departure Flight
                    </Typography>
                    <Grid item>
                      <FlightTakeoff />
                      <Typography style={{ textAlign: "center" }}>
                        {reservation.selectedGoingTicket[0].take_off}
                      </Typography>
                    </Grid>

                    <Grid item>
                      <ArrowForward style={{ transform: "rotate(90deg)" }} />
                    </Grid>
                    <Grid item>
                      <Typography style={{ textAlign: "center" }}>
                        {reservation.selectedGoingTicket[0].landing}
                      </Typography>
                      <FlightLand />
                    </Grid>
                  </Grid>
                  <Grid container direction={"row"}>
                    <Grid xs={0} md={4}></Grid>
                    <Grid xs={12} md={4}>
                      <Typography style={{ textAlign: "center" }}>
                        {"Duration"}
                      </Typography>
                      <Typography style={{ textAlign: "center" }}>
                        {reservation.duration}
                      </Typography>
                    </Grid>
                    <Grid xs={0} md={4}></Grid>
                  </Grid>
                </Grid>
                <Grid xs={4} item></Grid>
              </Grid>
            </CardActionArea>
          </Card>
        </Grid>
        <Grid item xs={1}></Grid>
      </Grid>
    );
  }
}

export default withStyles(useStyles)(Print);
