import { makeStyles } from "@material-ui/core/styles";
import CheckCircleIcon from "@material-ui/icons/CheckCircle";
import { Paper, Typography, Grid } from "@material-ui/core";

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
    width: "200px",
    height: "200px",
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
}));

function Success() {
  const classes = useStyles();

  var getUrl = window.location;
  var baseUrl = getUrl.protocol + "//" + getUrl.host;

  setTimeout(function () {
    window.location.href = baseUrl;
  }, 5000);

  return (
    <Paper elevation={10} className={classes.form}>
      <Grid container className={classes.oneWayGrid} direction={"column"}>
      <Grid xs={1} item></Grid>
        <Grid xs={10} item>
          <CheckCircleIcon className={classes.passengerIcons} />
          <Typography style={{ textAlign: "center" }}>Success</Typography>
          <Typography style={{ textAlign: "center" }}>Redirecting in 5 seconds...</Typography>
        </Grid>
        <Grid xs={1} item></Grid>
      </Grid>
    </Paper>
  );
}

export default Success;
