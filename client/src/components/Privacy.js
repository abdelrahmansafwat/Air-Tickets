import { makeStyles } from "@material-ui/core/styles";
import CheckCircleIcon from "@material-ui/icons/CheckCircle";
import { Paper, Typography, Grid, Button } from "@material-ui/core";
import { CustomButtonStyles } from "./CustomButton";

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

  const CustomButton = CustomButtonStyles({ chubby: true });

  /*
  var getUrl = window.location;
  var baseUrl = getUrl.protocol + "//" + getUrl.host;

  setTimeout(function () {
    window.location.href = baseUrl;
  }, 5000);
  */

  return (
    <Paper elevation={10} className={classes.form}>
          <Typography style={{ textAlign: "center" }} variant="h5">Who we are</Typography>
          <Typography>
            Travel Vela is an Online Travel Agency based in Barisal, Bangladesh.
            We need to collect, use and disclose personal information in order
            to perform our business functions and activities, including making
            and managing travel bookings on behalf of our customers. We are
            firmly committed to protecting the privacy and confidentiality of
            personal information.{" "}
          </Typography>
          <Typography style={{ textAlign: "center" }} variant="h5">
            What personal data we collect and why we collect it
          </Typography>
          <Typography>
            {" "}
            Travel Vela collect some automatic information as soon as you reach
            our website, this information includes your IP, device, location etc
            to direct you toward the best suited webpage for your location. As
            well as, we collect data about the webpage you view and duration you
            stay at our website. We don't collect any personal information such
            as Name, Email or Phone at this point. Generally, the type of
            personal information Travel Vela collect about you is the
            information that is needed to facilitate your travel arrangements
            and bookings and to arrange travel related services and/or products
            on your behalf. For example, we may collect details such as your
            name, Date of Birth, Residential/mailing address, Contact number,
            Email address, Passport details, Frequent flyer details. As well as,
            at special circumstances, we may collect information about your
            health issues (if any), and other details relevant to your travel
            arrangements or required by the relevant travel service provider(s)
            or legal authorities. As well as, we may collect your contact
            information when you inquiry about any product or services through
            our customer support channel for follow up purposes. However, this
            information is only limited to the info provided by you for your
            inquiry purposes and we don't collect data beyond such use cases.
          </Typography>
          <Typography style={{ textAlign: "center" }} variant="h5">
            Who we share your data with{" "}
          </Typography>{" "}
          <Typography>
            {" "}
            We use several tools to determine the behaviors of our customers to
            serve them with better contents. As such, we use analytics tools
            such as Google Analytics to collect data and extract results from
            it. However, You can review how Google uses your Personal
            Information here: https://www.google.com/intl/en/policies/privacy/.
            You can also opt-out of Google Analytics here:
            https://tools.google.com/dlpage/gaoptout. We share your data with
            airlines or relative tour operators for your booking purposes
            whenever we make your travel booking on your behalf. We only share
            the portion of data that is required and collected during the
            booking process with your consent. Please note, we may also share
            your Personal Information to comply with applicable laws and
            regulations, to respond to a subpoena, search warrant or other
            lawful request for information we receive, or to otherwise protect
            our rights.{" "}
          </Typography>{" "}
          <Typography style={{ textAlign: "center" }} variant="h5"> 
            How long we retain your data{" "}
          </Typography>{" "}
          <Typography>
            We retain your data until you request deletion or your account is
            closed upon your request. You can always submit a request to delete
            your account data to admin@travelvela.com{" "}
          </Typography>
          <Typography style={{ textAlign: "center" }} variant="h5">
            What rights you have over your data
          </Typography>
          <Typography>
            {" "}
            If you have an account on this site, or have left orders or reviews,
            you can request to receive an exported file of the personal data we
            hold about you, including any data you have provided to us. You can
            also request that we erase any personal data we hold about you. This
            does not include any data we are obliged to keep for administrative,
            legal, or security purposes.{" "}
          </Typography>{" "}
          <Typography style={{ textAlign: "center" }} variant="h5">
            How we protect your data{" "}
          </Typography>
          <Typography>
            Our website is secured with SSL certificate and all data transmitted
            through our website is passed through secure transport layer to
            ensure your privacy.
          </Typography>{" "}
          <Typography style={{ textAlign: "center" }} variant="h5">
            Do you provide our data to third parties
          </Typography>{" "}
          <Typography>
            We don't provide data to third parties except the ones mentioned in
            this Privacy Policy. As such, in case you use any payment gateway or
            any other services which includes third party providers in such case
            we share the relevant information with your consent and we don't
            keep any liabilities about the data used by such parties involved.
            You can visit privacy policy of such sites before allowing any
            actions involved third parties.{" "}
          </Typography>{" "}
          <Typography style={{ textAlign: "center" }} variant="h5">
            Contact and Reports
          </Typography>{" "}
          <Typography>
            If you require more information about our Privacy Policy please
            contact at support@travelvela.com or call us at +8809678-230230 As
            well as , you can also report any abuse or critical issues to
            admin@travelvela.com . We will be glad to take prompt actions at our
            end. At the end, for any such issues, you can also contact us by
            visiting us at Travel Vela Barishal, Ward 25 , Rupatali, Barishal.
          </Typography>
    </Paper>
  );
}

export default Success;
