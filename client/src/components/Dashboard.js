import React, { useState, useRef } from "react";
import clsx from "clsx";
import { makeStyles } from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";
import Drawer from "@material-ui/core/Drawer";
import TextField from "@material-ui/core/TextField";
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
import FlightIcon from "@material-ui/icons/Flight";
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
import { CustomButtonStyles } from "./CustomButton";
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from "@material-ui/pickers";
import { ThemeProvider } from "@material-ui/core";
import { createMuiTheme } from "@material-ui/core/styles";
import CircularProgress from "@material-ui/core/CircularProgress";
import Print from "./Print";
import { pdf } from "@react-pdf/renderer";
import ReactToPrint from "react-to-print";
import { saveAs } from "file-saver";
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
    reservationViewDialog: {
      top: "10%",
    },
    content: {
      flexGrow: 1,
      height: "100vh",
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
  const [reservationViewDialog, setReservationViewDialog] = useState(false);
  const [userDialog, setUserDialog] = useState(false);
  const [showPassengers, setShowPassengers] = useState(false);
  const [reservationStatus, setReservationStatus] = useState("");
  const [statusOpen, setStatusOpen] = React.useState(false);
  const [privilegeOpen, setPrivilegeOpen] = React.useState(false);
  const [refresh, setRefresh] = React.useState(false);
  const [email, setEmail] = useState(localStorage.getItem("email"));
  const [firstName, setFirstName] = useState(localStorage.getItem("firstName"));
  const [lastName, setLastName] = useState(localStorage.getItem("lastName"));
  const [phone, setPhone] = useState(localStorage.getItem("phone"));
  const [userId, setUserId] = useState(localStorage.getItem("userId"));
  const [privilege, setprivilege] = useState(localStorage.getItem("privilege"));
  const [currentUser, setCurrentUser] = useState("");
  const [userPrivilege, setUserPrivilege] = useState("");
  const [userViewDialog, setUserViewDialog] = useState(false);
  const [users, setUsers] = useState([]);
  const [usersTable, setUsersTable] = useState(false);
  const [authError, setAuthError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [pnr, setPNR] = useState("");
  const [PNRDialog, setPNRDialog] = useState("");
  const componentRef = useRef();

  const CustomButton = CustomButtonStyles({ chubby: true });

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
        display: false,
      },
    },
    {
      name: "ref",
      label: "Ref",
      options: {
        filter: false,
      },
    },
    {
      name: "reservationDate",
      label: "Reservation Date",
    },
    {
      name: "pnr",
      label: "PNR",
    },
    {
      name: "status",
      label: "Status",
    },
    {
      name: "total",
      label: "Total",
    },
    {
      name: "deleteButton",
      label: "Delete",
      options: {
        sort: false,
        searchable: false,
        filter: false,
        display: privilege == 6,
        customBodyRenderLite: (dataIndex, rowIndex) => {
          //console.log(params.row.viewButton);
          //var index = params.row.id;

          return (
            <Button
              variant="contained"
              color="secondary"
              onClick={async () => {
                var reservation = reservations[dataIndex];
                var allreservations = reservations;
                axios
                  .post("/api/reservation/delete", {
                    _id: reservation._id,
                  })
                  .then(function (response) {
                    console.log(response);
                    console.log(allreservations.length);
                    allreservations.splice(dataIndex, 1);
                    console.log(allreservations.length);
                    setReservations(allreservations);
                    setRefresh(!refresh);
                    //history.push("/dashboard");
                  })
                  .catch(function (error) {
                    console.log(error);
                    if (error) {
                      setErrorMessage("An error occured. Please try again.");
                      setAuthError(true);
                    }
                  });
              }}
            >
              Delete
            </Button>
          );
        },
      },
    },
    {
      name: "viewButton",
      label: "View",
      options: {
        sort: false,
        searchable: false,
        filter: false,
        customBodyRenderLite: (dataIndex, rowIndex) => {
          //console.log(params.row.viewButton);
          //var index = params.row.id;

          return (
            <Button
              variant="contained"
              color="primary"
              onClick={() => {
                setCurrentReservation(reservations[dataIndex]);
                setReservationStatus(reservations[dataIndex].status);
                setReservationViewDialog(true);
              }}
            >
              View
            </Button>
          );
        },
      },
    },
    {
      name: "pnrButton",
      label: "PNR",
      options: {
        sort: false,
        searchable: false,
        filter: false,
        display: privilege == 6,
        customBodyRenderLite: (dataIndex, rowIndex) => {
          //console.log(params.row.viewButton);
          //var index = params.row.id;

          return (
            <Button
              variant="contained"
              color="primary"
              onClick={() => {
                setCurrentReservation(reservations[dataIndex]);
                //setReservationStatus(reservations[dataIndex].status);
                setPNRDialog(true);
              }}
            >
              PNR
            </Button>
          );
        },
      },
    },
    {
      name: "printButton",
      label: "print",
      options: {
        sort: false,
        searchable: false,
        filter: false,
        customBodyRenderLite: (dataIndex, rowIndex) => {
          //console.log(params.row.viewButton);
          //var index = params.row.id;

          return (
            <Button
              variant="contained"
              color="secondary"
              onClick={async () => {
                const blob = await pdf(
                  <Print reservation={reservations[dataIndex]} />
                ).toBlob();
                saveAs(blob, reservations[dataIndex].reservationId + ".pdf");
                setCurrentReservation(reservations[dataIndex]);
              }}
            >
              Print
            </Button>
          );
        },
      },
    },
  ];

  const usersColumns = [
    {
      name: "id",
      label: "ID",
      options: {
        searchable: false,
        filter: false,
        display: false,
      },
    },
    {
      name: "firstName",
      label: "First Name",
      options: {
        searchable: false,
        filter: false,
      },
    },
    {
      name: "lastName",
      label: "Last Name",
      options: {
        searchable: false,
        filter: false,
      },
    },
    {
      name: "email",
      label: "Email",
      options: {
        filter: false,
      },
    },
    {
      name: "phone",
      label: "Phone",
      options: {
        filter: false,
      },
    },
    {
      name: "privilege",
      label: "Privilege",
    },
    {
      name: "deleteButton",
      label: "Delete",
      options: {
        sort: false,
        searchable: false,
        filter: false,
        display: privilege == 6,
        customBodyRenderLite: (dataIndex, rowIndex) => {
          //console.log(params.row.viewButton);
          //var index = params.row.id;

          return (
            <Button
              variant="contained"
              color="secondary"
              onClick={async () => {
                var user = users[dataIndex];
                var allusers = users;
                axios
                  .post("/api/user/delete", {
                    _id: user._id,
                  })
                  .then(function (response) {
                    console.log(response);
                    console.log(allusers.length);
                    allusers.splice(dataIndex, 1);
                    console.log(allusers.length);
                    setUsers(allusers);
                    setRefresh(!refresh);
                    //history.push("/dashboard");
                  })
                  .catch(function (error) {
                    console.log(error);
                    if (error) {
                      setErrorMessage("An error occured. Please try again.");
                      setAuthError(true);
                    }
                  });
              }}
            >
              Delete
            </Button>
          );
        },
      },
    },
  ];

  const getAllReservations = async () => {
    //console.log(history.location.state.privilege);
    var loggedIn = localStorage.getItem("token");
    var privilege = localStorage.getItem("privilege");
    console.log(privilege);
    console.log(loggedIn);
    console.log(email);
    if (loggedIn != null && privilege == 6) {
      setReady(false);
      axios.create({ baseURL: window.location.origin });
      await axios
        .get("/api/reservation/all", {
          headers: {
            Authorization: `Bearer ${loggedIn}`,
          },
        })
        .then(function (response) {
          console.log(response);
          var modifedReservations = response.data.reservations.reverse();
          modifedReservations.forEach((value, index) => {
            modifedReservations[index].id = index + 1;
            if (modifedReservations[index].ref) {
              modifedReservations[index].ref =
                "TVR" +
                modifedReservations[index].ref.toString().padStart(7, "0");
            }

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
    } else if (loggedIn != null && privilege == 1) {
      setReady(false);
      axios.create({ baseURL: window.location.origin });
      await axios
        .post("/api/reservation/all/specific-user", {
          email: email,
          headers: {
            Authorization: `Bearer ${loggedIn}`,
          },
        })
        .then(function (response) {
          console.log(response);
          var modifedReservations = response.data.reservations.reverse();
          modifedReservations.forEach((value, index) => {
            modifedReservations[index].id = index + 1;
            if (modifedReservations[index].ref) {
              modifedReservations[index].ref =
                "TVR" +
                modifedReservations[index].ref.toString().padStart(7, "0");
            }

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

  const getAllUsers = async () => {
    //console.log(history.location.state.privilege);
    setReady(false);
    await axios
      .get("/api/user/all-information")
      .then(function (response) {
        var users = response.data.users;
        users.forEach((value, index) => {
          users[index].id = index + 1;
          if (users[index].privilege === 0) {
            users[index].privilege = "None";
          } else if (users[index].privilege === 1) {
            users[index].privilege = "Standard";
          } else if (users[index].privilege === 2) {
            users[index].privilege = "Elite Club";
          } else if (users[index].privilege === 3) {
            users[index].privilege = "Corporate";
          } else if (users[index].privilege === 4) {
            users[index].privilege = "Partner";
          } else if (users[index].privilege === 5) {
            users[index].privilege = "Moderator";
          } else if (users[index].privilege === 6) {
            users[index].privilege = "Admin";
          }
        });
        console.log(users);
        setUsers(users);
      })
      .catch(function (error) {
        console.log(error);
        setAuthError(true);
        setErrorMessage("An error occured. Please try again.");
      });
    setReady(true);
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
              {localStorage.getItem("privilege") == 6 && (
                <ListItem
                  button
                  onClick={() => {
                    getAllUsers();
                    setUsersTable(!usersTable);
                  }}
                >
                  <ListItemIcon>
                    {!usersTable && <SupervisorAccountIcon />}
                    {usersTable && <FlightIcon />}
                  </ListItemIcon>
                  <ListItemText
                    primary={usersTable ? "Reservations" : "All Users"}
                  />
                </ListItem>
              )}
              <ListItem
                button
                onClick={() => {
                  setUserDialog(true);
                }}
              >
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
              {!usersTable && (
                <MUIDataTable
                  title={"Reservations"}
                  data={reservations}
                  columns={reservationsColumns}
                  options={{
                    selectableRows: privilege == 6 ? "multiple" : "none",
                    selectableRowsHeader: privilege == 6,
                    onCellClick: (rowData, cellMeta) => {
                      if (cellMeta.colIndex <= 4) {
                        console.log(cellMeta.rowIndex);
                        console.log(cellMeta.dataIndex);
                        console.log(rowData);
                        console.log(reservations[cellMeta.dataIndex]);
                        setCurrentReservation(reservations[cellMeta.dataIndex]);
                        setReservationStatus(
                          reservations[cellMeta.dataIndex].status
                        );
                        setReservationViewDialog(true);
                      }
                    },
                    onRowsDelete: (rowsDeleted, data, newTableData) => {
                      console.log(rowsDeleted);
                      rowsDeleted.data.map(async (data) => {
                        var reservation = reservations[data.dataIndex];
                        var allreservations = reservations;
                        await axios
                          .post("/api/reservation/delete", {
                            _id: reservation._id,
                          })
                          .then(function (response) {
                            console.log(response);
                            console.log(allreservations.length);
                            allreservations.splice(data.dataIndex, 1);
                            console.log(allreservations.length);
                            setReservations(allreservations);
                            //history.push("/dashboard");
                          })
                          .catch(function (error) {
                            console.log(error);
                            if (error) {
                              setErrorMessage(
                                "An error occured. Please try again."
                              );
                              setAuthError(true);
                            }
                          });
                      });
                      setRefresh(!refresh);
                    },
                  }}
                />
              )}
              {usersTable && (
                <MUIDataTable
                  title={"Users"}
                  data={users}
                  columns={usersColumns}
                  options={{
                    selectableRows: privilege == 6 ? "multiple" : "none",
                    selectableRowsHeader: privilege == 6,
                    onCellClick: (rowData, cellMeta) => {
                      if (cellMeta.colIndex <= 4) {
                        console.log(cellMeta.rowIndex);
                        console.log(cellMeta.dataIndex);
                        console.log(rowData);
                        console.log(users[cellMeta.dataIndex]);
                        setCurrentUser(users[cellMeta.dataIndex]);
                        setUserPrivilege(users[cellMeta.dataIndex].privilege);
                        setUserViewDialog(true);
                      }
                    },
                    onRowsDelete: (rowsDeleted, data, newTableData) => {
                      console.log(rowsDeleted);
                      rowsDeleted.data.map(async (data) => {
                        var user = users[data.dataIndex];
                        var allusers = users;
                        await axios
                          .post("/api/user/delete", {
                            _id: user._id,
                          })
                          .then(function (response) {
                            console.log(response);
                            console.log(allusers.length);
                            allusers.splice(data.dataIndex, 1);
                            console.log(allusers.length);
                            setUsers(allusers);
                            //history.push("/dashboard");
                          })
                          .catch(function (error) {
                            console.log(error);
                            if (error) {
                              setErrorMessage(
                                "An error occured. Please try again."
                              );
                              setAuthError(true);
                            }
                          });
                      });
                      setRefresh(!refresh);
                    },
                  }}
                />
              )}
            </Paper>
          </Container>
        </main>
      </div>

      <Dialog
        open={PNRDialog}
        TransitionComponent={Transition}
        keepMounted
        onClose={() => setPNRDialog(false)}
        aria-labelledby="alert-dialog-slide-title"
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle id="alert-dialog-slide-title">
          {"Set PNR Status"}
        </DialogTitle>
        <DialogContent>
          <TextField
            autoComplete="pnr"
            name="pnr"
            variant="outlined"
            required
            fullWidth
            id="pnr"
            label="PNR"
            autoFocus
            onChange={(e) => {
              setPNR(e.target.value);
            }}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setPNRDialog(false)} variant="contained">
            Close
          </Button>
          <Button
            variant="contained"
            color="secondary"
            component="span"
            fullWidth
            onClick={(event) => {
              event.preventDefault();
              event.stopPropagation();
              axios.create({ baseURL: window.location.origin });
              axios
                .post("/api/reservation/reserve/pnr", {
                  reservationId: currentReservation.reservationId,
                  pnr: pnr,
                })
                .then(function (response) {
                  //console.log(newTagOrIssuer);
                  setPNRDialog(false);
                  var temp = reservations;
                  temp[currentReservation.id - 1].pnr = pnr;
                  setReservations(temp);
                  setPNR("");
                  setRefresh(!refresh);
                })
                .catch(function (error) {
                  console.log(error);
                  if (error) {
                    setErrorMessage("An error occured. Please try again.");
                    setPNRDialog(false);
                    setPNR("");
                    setAuthError(true);
                  }
                });
            }}
          >
            Submit
          </Button>
        </DialogActions>
      </Dialog>
      {ready && reservations.length > 0 && (
        <Dialog
          fullScreen
          open={reservationViewDialog}
          onClose={() => {
            setReservationViewDialog(false);
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
                  setReservationViewDialog(false);
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
          <List className={classes.reservationViewDialog}>
            <ListItem>
              <ListItemText primary="PNR" secondary={currentReservation.pnr} />
            </ListItem>
            <Divider />
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
                    : currentReservation.passengers.map((data, index) => {
                        return (
                          `${index + 1}. ${data.firstName} ${data.lastName}` +
                          (index === currentReservation.passengers.length - 1
                            ? ""
                            : "---")
                        );
                      })
                }
              />
            </ListItem>
            <Divider />
            <ListItem>
              <ListItemText
                primary="Departure Airline"
                secondary={
                  currentReservation.selectedGoingTicket[0].planeCode.substring(
                    0,
                    2
                  ) === "BG"
                    ? "Biman Airlines"
                    : currentReservation.selectedGoingTicket[0].planeCode.substring(
                        0,
                        2
                      ) === "BS"
                    ? "US Bangla"
                    : "Novo Air"
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
                primary="Return Airline"
                secondary={
                  currentReservation.oneWay
                    ? "N/A"
                    : currentReservation.selectedReturningTicket[0].planeCode.substring(
                        0,
                        2
                      ) === "BG"
                    ? "Biman Airlines"
                    : currentReservation.selectedReturningTicket[0].planeCode.substring(
                        0,
                        2
                      ) === "BS"
                    ? "US Bangla"
                    : "Novo Air"
                }
              />
            </ListItem>
            <Divider />
            <ListItem>
              <ListItemText
                primary="Return Flight Code"
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
                primary="Return Date"
                secondary={
                  currentReservation.oneWay
                    ? "N/A"
                    : currentReservation.arrivalDate
                }
              />
            </ListItem>
            <Divider />
            <ListItem>
              <ListItemText
                primary="Total"
                secondary={currentReservation.total + " BDT"}
              />
            </ListItem>
            <Divider />
            <ListItem
              button
              disabled={localStorage.getItem("privilege") != 6}
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

      {ready && users.length > 0 && (
        <Dialog
          fullScreen
          open={userViewDialog}
          onClose={() => {
            setUserViewDialog(false);
            setPrivilegeOpen(false);
            setUserPrivilege("");
          }}
          TransitionComponent={Transition}
        >
          <AppBar className={classes.appBar}>
            <Toolbar>
              <IconButton
                edge="start"
                color="inherit"
                onClick={() => {
                  setUserViewDialog(false);
                  setPrivilegeOpen(false);
                  setUserPrivilege("");
                }}
                aria-label="close"
              >
                <CloseIcon />
              </IconButton>
              <Typography variant="h6" className={classes.title}>
                View User
              </Typography>
            </Toolbar>
          </AppBar>
          <List className={classes.reservationViewDialog}>
            <ListItem>
              <ListItemText
                primary="First Name"
                secondary={currentUser.firstName}
              />
            </ListItem>
            <Divider />
            <ListItem>
              <ListItemText
                primary="Last Name"
                secondary={currentUser.lastName}
              />
            </ListItem>
            <Divider />
            <ListItem>
              <ListItemText primary="Email" secondary={currentUser.email} />
            </ListItem>
            <Divider />
            <ListItem>
              <ListItemText primary="Phone" secondary={currentUser.phone} />
            </ListItem>
            <Divider />
            <ListItem
              button
              disabled={localStorage.getItem("privilege") != 6}
              onClick={() => {
                setPrivilegeOpen(!privilegeOpen);
              }}
            >
              <ListItemText primary="Status" secondary={userPrivilege} />
              {privilegeOpen ? <ExpandLess /> : <ExpandMore />}
            </ListItem>
            <Collapse in={privilegeOpen} timeout="auto" unmountOnExit>
              <List component="div" disablePadding>
                <ListItem
                  button
                  className={classes.nested}
                  onClick={() => {
                    axios.create({ baseURL: window.location.origin });
                    axios
                      .post("/api/user/privilege", {
                        email: currentUser.email,
                        privilege: 0,
                      })
                      .then(function (response) {
                        var temp = users;
                        temp[currentUser.id - 1].privilege = "None";
                        setUsers(temp);
                        setRefresh(!refresh);
                      });
                    setUserPrivilege("None");
                  }}
                >
                  <FormControlLabel
                    checked={userPrivilege === "None"}
                    value="None"
                    control={<Radio color="primary" />}
                    label="None"
                  />
                </ListItem>
                <ListItem
                  button
                  className={classes.nested}
                  onClick={() => {
                    axios.create({ baseURL: window.location.origin });
                    axios
                      .post("/api/user/privilege", {
                        email: currentUser.email,
                        privilege: 1,
                      })
                      .then(function (response) {
                        var temp = users;
                        temp[currentUser.id - 1].privilege = "Standard";
                        setUsers(temp);
                        setRefresh(!refresh);
                      });
                    setUserPrivilege("Standard");
                  }}
                >
                  <FormControlLabel
                    checked={userPrivilege === "Standard"}
                    value="Standard"
                    control={<Radio color="primary" />}
                    label="Standard"
                  />
                </ListItem>
                <ListItem
                  button
                  className={classes.nested}
                  onClick={() => {
                    axios.create({ baseURL: window.location.origin });
                    axios
                      .post("/api/user/privilege", {
                        email: currentUser.email,
                        privilege: 2,
                      })
                      .then(function (response) {
                        var temp = users;
                        temp[currentUser.id - 1].privilege = "Elite Club";
                        setUsers(temp);
                        setRefresh(!refresh);
                      });
                    setUserPrivilege("Elite Club");
                  }}
                >
                  <FormControlLabel
                    checked={userPrivilege === "Elite Club"}
                    value="Elite Club"
                    control={<Radio color="primary" />}
                    label="Elite Club"
                  />
                </ListItem>
                <ListItem
                  button
                  className={classes.nested}
                  onClick={() => {
                    axios.create({ baseURL: window.location.origin });
                    axios
                      .post("/api/user/privilege", {
                        email: currentUser.email,
                        privilege: 3,
                      })
                      .then(function (response) {
                        var temp = users;
                        temp[currentUser.id - 1].privilege = "Corporate";
                        setUsers(temp);
                        setRefresh(!refresh);
                      });
                    setUserPrivilege("Corporate");
                  }}
                >
                  <FormControlLabel
                    checked={userPrivilege === "Corporate"}
                    value="Corporate"
                    control={<Radio color="primary" />}
                    label="Corporate"
                  />
                </ListItem>
                <ListItem
                  button
                  className={classes.nested}
                  onClick={() => {
                    axios.create({ baseURL: window.location.origin });
                    axios
                      .post("/api/user/privilege", {
                        email: currentUser.email,
                        privilege: 4,
                      })
                      .then(function (response) {
                        var temp = users;
                        temp[currentUser.id - 1].privilege = "Partner";
                        setUsers(temp);
                        setRefresh(!refresh);
                      });
                    setUserPrivilege("Partner");
                  }}
                >
                  <FormControlLabel
                    checked={userPrivilege === "Partner"}
                    value="Partner"
                    control={<Radio color="primary" />}
                    label="Partner"
                  />
                </ListItem>
                <ListItem
                  button
                  className={classes.nested}
                  onClick={() => {
                    axios.create({ baseURL: window.location.origin });
                    axios
                      .post("/api/user/privilege", {
                        email: currentUser.email,
                        privilege: 5,
                      })
                      .then(function (response) {
                        var temp = users;
                        temp[currentUser.id - 1].privilege = "Moderator";
                        setUsers(temp);
                        setRefresh(!refresh);
                      });
                    setUserPrivilege("Moderator");
                  }}
                >
                  <FormControlLabel
                    checked={userPrivilege === "Moderator"}
                    value="Moderator"
                    control={<Radio color="primary" />}
                    label="Moderator"
                  />
                </ListItem>
                <ListItem
                  button
                  className={classes.nested}
                  onClick={() => {
                    axios.create({ baseURL: window.location.origin });
                    axios
                      .post("/api/user/privilege", {
                        email: currentUser.email,
                        privilege: 6,
                      })
                      .then(function (response) {
                        var temp = users;
                        temp[currentUser.id - 1].privilege = "Admin";
                        setUsers(temp);
                        setRefresh(!refresh);
                      });
                    setUserPrivilege("Admin");
                  }}
                >
                  <FormControlLabel
                    checked={userPrivilege === "Admin"}
                    value="Admin"
                    control={<Radio color="primary" />}
                    label="Admin"
                  />
                </ListItem>
              </List>
            </Collapse>
            <Divider />
          </List>
        </Dialog>
      )}

      <Dialog
        open={userDialog}
        onClose={() => setUserDialog(false)}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">Update User</DialogTitle>
        <DialogContent>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                autoComplete="fname"
                name="firstName"
                variant="outlined"
                required
                fullWidth
                id="firstName"
                label="First Name"
                autoFocus
                onChange={(e) => {
                  setFirstName(e.target.value);
                }}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="lastName"
                label="Last Name"
                name="lastName"
                autoComplete="lname"
                onChange={(e) => {
                  setLastName(e.target.value);
                }}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                onChange={(e) => {
                  setEmail(e.target.value);
                }}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="phone"
                label="Phone"
                name="phone"
                autoComplete="phone"
                onChange={(e) => {
                  setPhone(e.target.value);
                }}
              />
            </Grid>
          </Grid>
          <DialogActions>
            <Button onClick={() => setUserDialog(false)} variant="contained">
              Cancel
            </Button>
            <Button
              type="submit"
              variant="contained"
              color="primary"
              onClick={() => {
                axios.create({ baseURL: window.location.origin });
                axios
                  .post("/api/user/update", {
                    firstName: firstName,
                    lastName: lastName,
                    email: email,
                    phone: phone,
                    _id: userId,
                  })
                  .then(function (response) {
                    console.log(response);
                    setUserDialog(false);
                  })
                  .catch(function (error) {
                    console.log(error);
                    if (error) {
                      setUserDialog(false);
                      setErrorMessage("An error occured. Please try again.");
                      setAuthError(true);
                    }
                  });
              }}
            >
              Update
            </Button>
          </DialogActions>
        </DialogContent>
      </Dialog>
      <Dialog
        open={authError}
        TransitionComponent={Transition}
        keepMounted
        onClose={() => setAuthError(false)}
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
          <Button onClick={() => setAuthError(false)} color="primary">
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </ThemeProvider>
  );
}
