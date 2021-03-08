import React, { useState } from "react";
import clsx from "clsx";
import { makeStyles } from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";
import Drawer from "@material-ui/core/Drawer";
import Box from "@material-ui/core/Box";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import List from "@material-ui/core/List";
import Typography from "@material-ui/core/Typography";
import MUIDataTable from "mui-datatables";
import Divider from "@material-ui/core/Divider";
import IconButton from "@material-ui/core/IconButton";
import Container from "@material-ui/core/Container";
import Paper from "@material-ui/core/Paper";
import Link from "@material-ui/core/Link";
import MenuIcon from "@material-ui/icons/Menu";
import Collapse from "@material-ui/core/Collapse";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Radio from "@material-ui/core/Radio";
import ExpandLess from "@material-ui/icons/ExpandLess";
import ExpandMore from "@material-ui/icons/ExpandMore";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import Brightness6Icon from "@material-ui/icons/Brightness6";
import AddCircleIcon from "@material-ui/icons/AddCircle";
import LocalOfferIcon from "@material-ui/icons/LocalOffer";
import MeetingRoomIcon from "@material-ui/icons/MeetingRoom";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import Button from "@material-ui/core/Button";
import Slide from "@material-ui/core/Slide";
import Grid from "@material-ui/core/Grid";
import RefreshIcon from "@material-ui/icons/Refresh";
import Input from "@material-ui/core/Input";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import Chip from "@material-ui/core/Chip";
import Checkbox from "@material-ui/core/Checkbox";
import history from "../history";
import CloseIcon from "@material-ui/icons/Close";
import GavelIcon from "@material-ui/icons/Gavel";
import SupervisorAccountIcon from "@material-ui/icons/SupervisorAccount";
import RemoveCircleIcon from "@material-ui/icons/RemoveCircle";
import DateFnsUtils from "@date-io/date-fns";
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from "@material-ui/pickers";
import { ThemeProvider } from "@material-ui/core";
import { createMuiTheme } from "@material-ui/core/styles";
import CircularProgress from "@material-ui/core/CircularProgress";
const axios = require("axios");

const light = {
  palette: {
    type: "light",
  },
};

const dark = {
  palette: {
    type: "dark",
  },
};

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

const drawerWidth = 250;

export default function Dashboard() {
  const useStyles = makeStyles((theme) => ({
    root: {
      display: "flex",
    },
    toolbar: {
      paddingRight: 24,
    },
    toolbarIcon: {
      display: "flex",
      alignItems: "center",
      justifyContent: "flex-end",
      padding: "0 8px",
      ...theme.mixins.toolbar,
    },
    appBar: {
      zIndex: theme.zIndex.drawer + 1,
      transition: theme.transitions.create(["width", "margin"], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
      }),
    },
    appBarShift: {
      marginLeft: drawerWidth,
      width: `calc(100% - ${drawerWidth}px)`,
      transition: theme.transitions.create(["width", "margin"], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
      }),
    },
    menuButton: {
      marginRight: 36,
    },
    menuButtonHidden: {
      display: "none",
    },
    title: {
      flexGrow: 1,
    },
    drawerPaper: {
      position: "relative",
      whiteSpace: "nowrap",
      width: drawerWidth,
      transition: theme.transitions.create("width", {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
      }),
    },
    drawerPaperClose: {
      overflowX: "hidden",
      transition: theme.transitions.create("width", {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
      }),
      width: theme.spacing(7),
      [theme.breakpoints.up("sm")]: {
        width: theme.spacing(9),
      },
    },
    appBarSpacer: theme.mixins.toolbar,
    viewDialog: {
      top: "10%",
    },
    content: {
      flexGrow: 1,
      //height: "100vh",
      overflow: "auto",
    },
    container: {
      paddingTop: theme.spacing(4),
      paddingBottom: theme.spacing(4),
    },
    paper: {
      padding: theme.spacing(2),
      display: "flex",
      //overflow: "hidden",
      flexDirection: "column",
      //height: "75vh",
    },
    fixedHeight: {
      height: 240,
    },
    dflex: {
      display: "flex",
      flexDirection: "row",
      justifyContent: "center",
      alignItems: "center",
    },
    paperChips: {
      display: "flex",
      justifyContent: "center",
      flexWrap: "wrap",
      listStyle: "none",
      padding: theme.spacing(0.5),
      margin: 0,
    },
    chip: {
      margin: theme.spacing(0.5),
    },
  }));

  const classes = useStyles();

  //const [privilege, setPrivilege] = useState(history.location.state.privilege);
  const [open, setOpen] = React.useState(false);
  const [lightTheme, setLightTheme] = useState(true);
  const [ready, setReady] = useState(false);
  //const [privilege, setPrivilege] = useState(3);
  const [reservations, setReservations] = useState([]);
  const [constructorHasRun, setConstructorHasRun] = useState(false);
  const [currentReservation, setCurrentReservation] = useState("");
  const [viewDialog, setViewDialog] = useState(false);
  const [showPassengers, setShowPassengers] = useState(false);
  const [reservationStatus, setReservationStatus] = useState("");
  const [statusOpen, setStatusOpen] = React.useState(false);
  const [refresh, setRefresh] = React.useState(false);

  const handleDrawerOpen = () => {
    setOpen(true);
  };
  const handleDrawerClose = () => {
    setOpen(false);
  };

  const appliedTheme = createMuiTheme(lightTheme ? light : dark);

  const reservationsColumns = [
    {
      name: "id",
      label: "ID",
      options: {
        searchable: false,
        filter: false,
      },
    },
    {
      name: "reservationId",
      label: "Reservation ID",
      options: {
        sort: false,
        searchable: false,
        filter: false,
      },
    },
    {
      name: "reservationDate",
      label: "Reservation Date",
    },
    {
      name: "status",
      label: "Status",
    },
    /*{
      name: "deleteButton",
      label: "Delete",
      options: {
        sort: false,
        searchable: false,
        filter: false,
        customBodyRender: (value, tableMeta, updateValue) => {
          //console.log(params.row.viewButton);
          //var index = params.row.id;

          return (
            <Button
              variant="contained"
              color="secondary"
              disabled={privilege < 2}
            >
              Delete
            </Button>
          );
        },
      },
    },
    */
  ];

  const getAllReservations = async () => {
    //console.log(history.location.state.privilege);
    var loggedIn = localStorage.getItem("token");
    var privilege = localStorage.getItem("privilege");
    console.log(privilege);
    console.log(loggedIn);
    if (loggedIn != null && privilege == 6) {
      setReady(false);
      await axios
        .get("/api/reservation/all", {
          headers: {
            Authorization: `Bearer ${loggedIn}`,
          },
        })
        .then(function (response) {
          console.log(response);
          var modifedReservations = response.data.reservations;
          modifedReservations.forEach((value, index) => {
            modifedReservations[index].id = index + 1;
            modifedReservations[index].departureDate = modifedReservations[
              index
            ].departureDate.split("T")[0];
            modifedReservations[index].arrivalDate = modifedReservations[
              index
            ].arrivalDate.split("T")[0];
            modifedReservations[index].reservationDate = modifedReservations[
              index
            ].reservationDate.split("T")[0];
            modifedReservations[index].firstName =
              modifedReservations[index].passengers[0].firstName;
            modifedReservations[index].lastName =
              modifedReservations[index].passengers[0].lastName;
            modifedReservations[index].from =
              modifedReservations[index].selectedGoingTicket[0].from;
            modifedReservations[index].to =
              modifedReservations[index].selectedGoingTicket[0].into;
            if (!modifedReservations[index].oneWay) {
              modifedReservations[index].oneWay = "Yes";
              modifedReservations[index].arrivalDate = "N/A";
            } else {
              modifedReservations[index].oneWay = "No";
            }
          });
          console.log(modifedReservations[0]);
          setCurrentReservation(modifedReservations[0]);
          setReservations(modifedReservations);
        })
        .catch(function (error) {
          console.log(error);
          //setError(true);
          //setErrorMessage("An error occured. Please try again.");
        });
      setReady(true);
    } else {
      history.push("/login");
    }
  };

  const constructor = async () => {
    if (constructorHasRun) return;
    setConstructorHasRun(true);
    await getAllReservations();
  };

  constructor();

  return (
    <ThemeProvider theme={appliedTheme}>
      <div className={classes.root}>
        <CssBaseline />
        <AppBar
          position="absolute"
          className={clsx(classes.appBar, open && classes.appBarShift)}
        >
          <Toolbar className={classes.toolbar}>
            <IconButton
              edge="start"
              color="inherit"
              aria-label="open drawer"
              onClick={handleDrawerOpen}
              className={clsx(
                classes.menuButton,
                open && classes.menuButtonHidden
              )}
            >
              <MenuIcon />
            </IconButton>
            <Typography
              component="h1"
              variant="h6"
              color="inherit"
              noWrap
              className={classes.title}
            >
              Dashboard
            </Typography>
            <IconButton
              color="inherit"
              onClick={() => setLightTheme(!lightTheme)}
            >
              <Brightness6Icon />
            </IconButton>
          </Toolbar>
        </AppBar>
        <Drawer
          variant="permanent"
          classes={{
            paper: clsx(classes.drawerPaper, !open && classes.drawerPaperClose),
          }}
          open={open}
        >
          <div className={classes.toolbarIcon}>
            <IconButton onClick={handleDrawerClose}>
              <ChevronLeftIcon />
            </IconButton>
          </div>
          <Divider />
          <List>
            <div>
              <ListItem button>
                <ListItemIcon>
                  <RefreshIcon />
                </ListItemIcon>
                <ListItemText primary="Refresh" />
              </ListItem>
            </div>
          </List>
          <Divider />
          <List>
            <div>
              <ListItem button>
                <ListItemIcon>
                  <SupervisorAccountIcon />
                </ListItemIcon>
                <ListItemText primary="Admin" />
              </ListItem>

              <ListItem button>
                <ListItemIcon>
                  <AccountCircleIcon />
                </ListItemIcon>
                <ListItemText primary="User" />
              </ListItem>

              <ListItem
                button
                onClick={(event) => {
                  event.preventDefault();
                  event.stopPropagation();
                  localStorage.removeItem("token");
                  localStorage.removeItem("privilege");
                  history.push("/login");
                }}
              >
                <ListItemIcon>
                  <MeetingRoomIcon />
                </ListItemIcon>
                <ListItemText primary="Logout" />
              </ListItem>
            </div>
          </List>
        </Drawer>
        <main className={classes.content}>
          <div className={classes.appBarSpacer} />
          <Container maxWidth="lg" className={classes.container}>
            <Paper className={classes.paper}>
              <MUIDataTable
                title={"Reservations"}
                data={reservations}
                columns={reservationsColumns}
                options={{
                  onRowClick: (rowData, rowMeta) => {
                    console.log(rowMeta.rowIndex);
                    console.log(rowMeta.dataIndex);
                    console.log(rowData);
                    console.log(reservations[rowMeta.dataIndex]);
                    setCurrentReservation(reservations[rowMeta.dataIndex]);
                    setReservationStatus(
                      reservations[rowMeta.dataIndex].status
                    );
                    setViewDialog(true);
                  },
                }}
              />
            </Paper>
          </Container>
        </main>
      </div>
      {ready && (
        <Dialog
          fullScreen
          open={viewDialog}
          onClose={() => {
            setViewDialog(false);
            setStatusOpen(false);
            setReservationStatus("");
          }}
          TransitionComponent={Transition}
        >
          <AppBar className={classes.appBar}>
            <Toolbar>
              <IconButton
                edge="start"
                color="inherit"
                onClick={() => {
                  setViewDialog(false);
                  setStatusOpen(false);
                  setReservationStatus("");
                }}
                aria-label="close"
              >
                <CloseIcon />
              </IconButton>
              <Typography variant="h6" className={classes.title}>
                View Reservation
              </Typography>
            </Toolbar>
          </AppBar>
          <List className={classes.viewDialog}>
            <ListItem button>
              <ListItemText
                primary="Passengers"
                onClick={() => setShowPassengers(!showPassengers)}
                secondary={
                  showPassengers
                    ? currentReservation.passengers.map((data, index) => {
                        return (
                          <Typography>{`Passenger #${index + 1} --- Name: ${
                            data.firstName
                          } ${data.lastName} --- Gender: ${
                            data.gender
                          } --- Date of Birth: ${
                            data.dateOfBirth.split("T")[0]
                          } --- Email:  ${data.email} --- Phone: ${
                            data.phone
                          }`}</Typography>
                        );
                      })
                    : currentReservation.passengers.length
                }
              />
            </ListItem>
            <Divider />
            <ListItem>
              <ListItemText
                primary="Departure Flight Code"
                secondary={currentReservation.selectedGoingTicket[0].planeCode.replace(
                  "-",
                  ""
                )}
              />
            </ListItem>
            <Divider />
            <ListItem>
              <ListItemText
                primary="From"
                secondary={currentReservation.selectedGoingTicket[0].from}
              />
            </ListItem>
            <Divider />
            <ListItem>
              <ListItemText
                primary="To"
                secondary={currentReservation.selectedGoingTicket[0].into}
              />
            </ListItem>
            <Divider />
            <ListItem>
              <ListItemText
                primary="Departure Date"
                secondary={currentReservation.departureDate}
              />
            </ListItem>
            <Divider />
            <ListItem>
              <ListItemText
                primary="One Way"
                secondary={currentReservation.oneWay ? "Yes" : "No"}
              />
            </ListItem>
            <Divider />
            <ListItem>
              <ListItemText
                primary="Arrival Flight Code"
                secondary={
                  currentReservation.oneWay
                    ? "N/A"
                    : currentReservation.selectedReturningTicket[0].planeCode.replace(
                        "-",
                        ""
                      )
                }
              />
            </ListItem>
            <Divider />
            <ListItem>
              <ListItemText
                primary="Arrival Date"
                secondary={
                  currentReservation.oneWay
                    ? "N/A"
                    : currentReservation.arrivalDate
                }
              />
            </ListItem>
            <Divider />
            <ListItem
              button
              onClick={() => {
                setStatusOpen(!statusOpen);
              }}
            >
              <ListItemText
                primary="Status"
                secondary={currentReservation.status}
              />
              {statusOpen ? <ExpandLess /> : <ExpandMore />}
            </ListItem>
            <Collapse in={statusOpen} timeout="auto" unmountOnExit>
              <List component="div" disablePadding>
                <ListItem
                  button
                  className={classes.nested}
                  onClick={() => {
                    axios.create({ baseURL: window.location.origin });
                    axios
                      .post("/api/reservation/reserve/status", {
                        reservationId: currentReservation.reservationId,
                        status: "ticketing",
                      })
                      .then(function (response) {
                        var temp = reservations;
                        temp[currentReservation.id - 1].status = "ticketing";
                        setReservations(temp);
                        setRefresh(!refresh);
                      });
                    setReservationStatus("ticketing");
                  }}
                >
                  <FormControlLabel
                    checked={reservationStatus === "ticketing"}
                    value="ticketing"
                    control={<Radio color="primary" />}
                    label="Ticketing"
                  />
                </ListItem>
                <ListItem
                  button
                  className={classes.nested}
                  onClick={() => {
                    axios.create({ baseURL: window.location.origin });
                    axios
                      .post("/api/reservation/reserve/status", {
                        reservationId: currentReservation.reservationId,
                        status: "ticketed",
                      })
                      .then(function (response) {
                        var temp = reservations;
                        temp[currentReservation.id - 1].status = "ticketed";
                        setReservations(temp);
                        setRefresh(!refresh);
                      });
                    setReservationStatus("ticketed");
                  }}
                >
                  <FormControlLabel
                    checked={reservationStatus === "ticketed"}
                    value="ticketed"
                    control={<Radio color="primary" />}
                    label="Ticketed"
                  />
                </ListItem>
                <ListItem
                  button
                  className={classes.nested}
                  onClick={() => {
                    axios.create({ baseURL: window.location.origin });
                    axios
                      .post("/api/reservation/reserve/status", {
                        reservationId: currentReservation.reservationId,
                        status: "refundSubmitted",
                      })
                      .then(function (response) {
                        var temp = reservations;
                        temp[currentReservation.id - 1].status =
                          "refundSubmitted";
                        setReservations(temp);
                        setRefresh(!refresh);
                      });
                    setReservationStatus("refundSubmitted");
                  }}
                >
                  <FormControlLabel
                    checked={reservationStatus === "refundSubmitted"}
                    value="refundSubmitted"
                    control={<Radio color="primary" />}
                    label="Refund Submitted"
                  />
                </ListItem>
                <ListItem
                  button
                  className={classes.nested}
                  onClick={() => {
                    axios.create({ baseURL: window.location.origin });
                    axios
                      .post("/api/reservation/reserve/status", {
                        reservationId: currentReservation.reservationId,
                        status: "refundToBeVerified",
                      })
                      .then(function (response) {
                        var temp = reservations;
                        temp[currentReservation.id - 1].status =
                          "refundToBeVerified";
                        setReservations(temp);
                        setRefresh(!refresh);
                      });
                    setReservationStatus("refundToBeVerified");
                  }}
                >
                  <FormControlLabel
                    checked={reservationStatus === "refundToBeVerified"}
                    value="refundToBeVerified"
                    control={<Radio color="primary" />}
                    label="Refund To Be Verified"
                  />
                </ListItem>
                <ListItem
                  button
                  className={classes.nested}
                  onClick={() => {
                    axios.create({ baseURL: window.location.origin });
                    axios
                      .post("/api/reservation/reserve/status", {
                        reservationId: currentReservation.reservationId,
                        status: "refunded",
                      })
                      .then(function (response) {
                        var temp = reservations;
                        temp[currentReservation.id - 1].status = "refunded";
                        setReservations(temp);
                        setRefresh(!refresh);
                      });
                    setReservationStatus("refunded");
                  }}
                >
                  <FormControlLabel
                    checked={reservationStatus === "refunded"}
                    value="refunded"
                    control={<Radio color="primary" />}
                    label="Refunded"
                  />
                </ListItem>
              </List>
            </Collapse>
            <Divider />
          </List>
        </Dialog>
      )}
    </ThemeProvider>
  );
}
