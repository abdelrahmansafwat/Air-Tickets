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
import history from "../history";

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

  const [adults, setAdults] = useState(history.location.state.adults);
  const [children, setChildren] = useState(history.location.state.children);
  const [infants, setInfants] = useState(history.location.state.infants);
  const [discount, setDiscount] = useState(false);
  const [coupon, setCoupon] = useState("");
  const [couponCode, setCouponCode] = useState("");

  const [passengers, setPassengers] = useState(history.location.state.passengers);
  const [index, setIndex] = useState(0);
  const [oneWay, setOneWay] = useState(history.location.state.oneWay);
  const [confirm, setConfirm] = useState(false);
  const [arrivalDate, setArrivalDate] = useState(
    history.location.state.arrivalDate
  );
  const [departureDate, setDepartureDate] = useState(
    history.location.state.departureDate
  );
  const [message, setMessage] = useState("");
  const [messageDialog, setMessageDialog] = useState(false);
  const [messageLevel, setMessageLevel] = useState("");
  const [render, setRender] = useState(false);
  const [selectedGoingTicket, setSelectedGoingTicket] = useState(
    history.location.state.selectedGoingTicket
  );
  const [terms, setTerms] = useState(false);
  const [selectedReturningTicket, setSelectedReturningTicket] = useState(
    history.location.state.selectedReturningTicket
  );

  const CustomButton = CustomButtonStyles({ chubby: true });

  //setPassengers(passengersTemp);

  console.log(passengers);

  return (
    <Container component="main" maxWidth="md">
      <CssBaseline />
      <div className={classes.root}>
        <Paper elevation={10} className={classes.form}>
          <Grid container direction={"column"}>
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
                          (selectedGoingTicket.lowestPrice - 725 * 1) * 0.75 +
                            725 * 1 +
                            (oneWay
                              ? (selectedGoingTicket.lowestPrice - 725 * 1) *
                                  0.75 +
                                725 * 1
                              : 0)
                        ) +
                        " = "}
                      {Math.floor(
                        children *
                          ((selectedGoingTicket.lowestPrice - 725 * 1) * 0.75 +
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
                          (selectedGoingTicket.lowestPrice - 725 * 1) * 0.1 +
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
                          ((selectedGoingTicket.lowestPrice - 725 * 1) * 0.1 +
                            200) +
                          (oneWay
                            ? (selectedReturningTicket.lowestPrice - 725 * 1) *
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
                          ((selectedGoingTicket.lowestPrice - 725 * 1) * 0.75 +
                            725 * 1) +
                        infants *
                          ((selectedGoingTicket.lowestPrice - 725 * 1) * 0.1 +
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
                    {(discount
                      ? coupon.fixed
                        ? coupon.value
                        : Math.floor(
                            (coupon.value / 100) *
                              (selectedGoingTicket === ""
                                ? 0
                                : Math.floor(
                                    adults * selectedGoingTicket.lowestPrice +
                                      children *
                                        ((selectedGoingTicket.lowestPrice -
                                          725 * 1) *
                                          0.75 +
                                          725 * 1) +
                                      infants *
                                        ((selectedGoingTicket.lowestPrice -
                                          725 * 1) *
                                          0.1 +
                                          200)
                                  )) +
                              (selectedReturningTicket === ""
                                ? 0
                                : Math.floor(
                                    adults *
                                      selectedReturningTicket.lowestPrice +
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
                                  ))
                          )
                      : 0) *
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
                        (discount
                          ? coupon.fixed
                            ? coupon.value
                            : Math.floor(
                                (coupon.value / 100) *
                                  (selectedGoingTicket === ""
                                    ? 0
                                    : Math.floor(
                                        adults *
                                          selectedGoingTicket.lowestPrice +
                                          children *
                                            ((selectedGoingTicket.lowestPrice -
                                              725 * 1) *
                                              0.75 +
                                              725 * 1) +
                                          infants *
                                            ((selectedGoingTicket.lowestPrice -
                                              725 * 1) *
                                              0.1 +
                                              200)
                                      )) +
                                  (selectedReturningTicket === ""
                                    ? 0
                                    : Math.floor(
                                        adults *
                                          selectedReturningTicket.lowestPrice +
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
                                      ))
                              )
                          : 0) *
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
                          (discount
                            ? coupon.fixed
                              ? coupon.value
                              : Math.floor(
                                  (coupon.value / 100) *
                                    (selectedGoingTicket === ""
                                      ? 0
                                      : Math.floor(
                                          adults *
                                            selectedGoingTicket.lowestPrice +
                                            children *
                                              ((selectedGoingTicket.lowestPrice -
                                                725 * 1) *
                                                0.75 +
                                                725 * 1) +
                                            infants *
                                              ((selectedGoingTicket.lowestPrice -
                                                725 * 1) *
                                                0.1 +
                                                200)
                                        )) +
                                    (selectedReturningTicket === ""
                                      ? 0
                                      : Math.floor(
                                          adults *
                                            selectedReturningTicket.lowestPrice +
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
                                        ))
                                )
                            : 0) *
                            (adults + children))}
                  </Typography>
                </Grid>
              </Grid>
            </Grid>

            <Grid item>
              <Grid
                container
                direction={"row"}
                spacing={1}
                className={classes.dflex}
                alignItems="center"
              >
                <Grid item xs={9}>
                  <TextField
                    value={couponCode}
                    variant="outlined"
                    margin="normal"
                    required
                    fullWidth
                    id="couponCode"
                    label="Coupon Code"
                    name="couponCode"
                    onChange={(e) => {
                      setCouponCode(e.target.value);
                    }}
                  />
                </Grid>
                <Grid item xs={3}>
                  <Button
                    variant="contained"
                    color="primary"
                    component="span"
                    fullWidth
                    onClick={() => {
                      console.log(couponCode);
                      axios.create({ baseURL: window.location.origin });
                      axios
                        .post("/api/coupon/find", {
                          code: couponCode,
                        })
                        .then(function (response) {
                          console.log(response);
                          setCoupon(response.data.coupon);
                          setDiscount(true);
                        })
                        .catch(function (error) {
                          console.log(error);
                          /*
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
                              */
                        });
                    }}
                  >
                    Apply
                  </Button>
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
                    style={{ width: "320px" }}
                    classes={CustomButton}
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
                              ((selectedGoingTicket.lowestPrice - 725 * 1) *
                                0.75 +
                                725 * 1) +
                            infants *
                              ((selectedGoingTicket.lowestPrice - 725 * 1) *
                                0.1 +
                                200)
                        ) -
                        (discount
                          ? coupon.fixed
                            ? coupon.value
                            : Math.floor(
                                (coupon.value / 100) *
                                  (selectedGoingTicket === ""
                                    ? 0
                                    : Math.floor(
                                        adults *
                                          selectedGoingTicket.lowestPrice +
                                          children *
                                            ((selectedGoingTicket.lowestPrice -
                                              725 * 1) *
                                              0.75 +
                                              725 * 1) +
                                          infants *
                                            ((selectedGoingTicket.lowestPrice -
                                              725 * 1) *
                                              0.1 +
                                              200)
                                      )) +
                                  (selectedReturningTicket === ""
                                    ? 0
                                    : Math.floor(
                                        adults *
                                          selectedReturningTicket.lowestPrice +
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
                                      ))
                              )
                          : 0) *
                          (adults + children) +
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
                            ) -
                            (discount
                              ? coupon.fixed
                                ? coupon.value
                                : Math.floor(
                                    (coupon.value / 100) *
                                      (selectedGoingTicket === ""
                                        ? 0
                                        : Math.floor(
                                            adults *
                                              selectedGoingTicket.lowestPrice +
                                              children *
                                                ((selectedGoingTicket.lowestPrice -
                                                  725 * 1) *
                                                  0.75 +
                                                  725 * 1) +
                                              infants *
                                                ((selectedGoingTicket.lowestPrice -
                                                  725 * 1) *
                                                  0.1 +
                                                  200)
                                          )) +
                                      (selectedReturningTicket === ""
                                        ? 0
                                        : Math.floor(
                                            adults *
                                              selectedReturningTicket.lowestPrice +
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
                                          ))
                                  )
                              : 0) *
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
                  >
                    Confirm
                  </Button>
                </Grid>
                <Grid item xs={"auto"}></Grid>
              </Grid>
            </Grid>
          </Grid>
        </Paper>
      </div>
    </Container>
  );
}

export default ReserveForm;
