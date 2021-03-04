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
                The refund and return policy presented on this page includes the possible scenario which may arise when you purchase one of the services offered by Travel Vela. At most of the cases, all payments made to Travel Vela is non-refundable or non-returnable unless it is subjected to any criteria mentioned below at this section. Please read through the below sections to learn more about refund and return policy before purchasing or making any payments to Travel Vela. Please note, all amounts mentioned will be charged in respect to the currency used for payment and don't correlates to any exchange rates available at the time of execution.
          </Typography>
            <Typography style={{ textAlign: "center" }} variant="h5">
            Part 1 : Air Ticket Modifications
          </Typography>
            <Typography>
            All Air ticket modifications are subjected to fees and shall be applied as per individual airlines policy. As well as, on top of such fees we will charge service fees for modifications purposes.
            <ol>
                <li>Passenger Information Change : The minor mistakes on passenger name, birth date, ID number is subjected to correction depending on individual airlines policy. However, the change of passenger name completely isn't permitted and we won't entertain such requests for modification. As well as, for all modifications customers have to bear all the costs which is Charged By Airlines + 400 BDT or 5 USD Service fees</li>
                <li>Travel Date Change : The date change subjects to each airlines policy. There is type of tickets that don't support date changes. For such kind of tickets we won't provide any support for date change. However, there are some categories of tickets that support date change, and for such tickets, the passenger have to bear all costs charged by airlines as penalties, service fees + fare differences + Travel Vela Service fees 300 BDT or 5 USD. </li>
                <li>Prepaid Luggage or Other additional Purchase : For prepaid luggage or other additional purchases such as upgrades, inflight products, the passenger have to pay the cost of the purchase payable to airlines + 400 BDT or USD 5 service fees. </li>
            </ol>
          </Typography>
            <Typography style={{ textAlign: "center" }} variant="h5">
            Part 2 : Air Ticket Cancellations and Refunds
            </Typography>{" "}
            <Typography>
            For all air tickets cancellations and refunds, we shall abide by the specific cancellation and refund policy specified by each individual airlines for your specific type of ticket. Please read through the below rules to know about the cancellation and refunds terms.
            <ol>
                <li>For all cancellations and refunds, passengers should contact us directly to initiate such request with the airlines. In case, the passenger cooperate with the airlines directly, then they should keep us informed of the progress to have smooth processing. </li>
                <li>For all cancellation or refunds, we should follow and cooperate with the passengers as per airlines terms and conditions. The process can be completed by offering a replacement or offering refunds as per airlines policy. However, for all refunds cases , the refund should be processed at the actual mode of payment or as form of airlines credit to purchase tickets later in case the airlines confirms the refunds in Credit. </li>
                <li>For involuntary refunds such as cancellations made by airlines or took place due to natural disaster or unexpected events should be handled as per individual airlines policy. In such instances, we will keep our customers informed about the processes with utmost priorities.  </li>
                <li>For all voluntary refunds, customers should pay the penalties associated with such refunds. Refunds will be confirmed in form of refund to same payment method or airlines credit as per offer made by airlines. </li>
                <li>Time-frame of refund processing varies by airlines, once a refund is submitted to us, we immediately send the refund requests directly to the airlines for further processing. Each airlines have it's specific workflows and may take their own processing time on which we don't have any control. However, refund will be processed to customer end within 3 working days after the clearance and funds are being received from airlines. However, each individual payment method may have specific duration of time until the funds are received by the customer. </li>
                <li>For all refunds, we won't refund any charges which are charged by payment gateway used by the customer, and the refunds will be made based on actual amount which are paid to us by customer. </li>
                <li>For all domestic flights, we will charge a processing fee of 200 BDT or 3 USD on top of penalties charged by airlines + payment gateway fees. </li>
                <li>For all international flights, we will charge a processing fee of 1000BDT or 15 USD on top of penalties charged by airlines + payment gateway fees.  </li>
                <li>Refund processing fees charged by Travel Vela will be completely waived for customers who are unable to take flight due to illness. In such cases, the proper documentations will be submitted. </li>
                <li>Refund processing fess charged by Travel Vela will be waived by 50% for senior citizens (aged above 60 ) , Military Personnel, Medical Personnel, Volunteers working for Social Cause under well-recognized charity organizations. Valid ID must be provided for verification of all such customers. </li>
                <li>Refund will be processed within 7 working days to the customer from the time of refund approval by the customers. </li>
                <li>Customer is eligible to submit a refund request up to the time of ticket validity specified by the airlines on the E-ticket copy. Refund will be processed as per the airlines refund terms and conditions. Flown tickets aren't eligble for refund or modification as the service is already taken by the customer. </li>
            </ol>
            </Typography>{" "}
            <Typography style={{ textAlign: "center" }} variant="h5">
            Part 3 - Hotel, Tours, Other Services Modifications
            </Typography>{" "}
            <Typography>
            For all other services except Air Tickets offered on Travel Vela has specific modification policy available at the offer details page. For such cases, modifications are done as per the individual suppliers policy available on offer details page at the time of purchase. For all modification, the customers should get in touch directly with the suppliers through the message option available on their dashboard. However, in case the issue can't be resolved by contacting suppliers should be referred to Travel Vela representative for further evaluation. 
For modifications, which has specific charges set by suppliers at time of purchase will be paid by Customers. For all such events, Travel Vela should charge a processing fee of BDT 100 or USD. As well as, all payment processing fees should be paid by the customer.

            </Typography>
            <Typography style={{ textAlign: "center" }} variant="h5">
            Part 4 - Hotel, Tours, Other Services Refunds
          </Typography>
            <Typography>
            For all refunds related to services other than Air Ticket, refund fees will be charged as per the policy set by the suppliers. For such instances, processing fees of 300 BDT or 5 USD will be charged by Travel Vela and all payment processing fees won't be refunded back to the customer. Refunds will be done within 3 working days. 
            </Typography>{" "}
            <Typography style={{ textAlign: "center" }} variant="h5">
            Part 5 - Acknowledgement
            </Typography>
            <Typography>
            By continuing with any purchase at Travel Vela, the customer should agree with our refund and return policy presented at this page. Travel Vela reserves the rights to update the page anytime without prior notices. Travel Vela reserves the right of changing the processing fees charged by Travel Vela without prior notices. For all refunds, Travel Vela will only refund the money to the same payment method or to the passenger oneself. Travel Vela reserves the rights to deny all the requests for refunds and adjustments submitted to Travel Vela by third parties including relatives of passengers and Travel Vela owes no explanation for such actions. Only refunds or modification requested through same email or phone with proper customer verification or request submitted by passenger visiting our office will be considered for refunds or modification. 
          </Typography>{" "}
            <Typography style={{ textAlign: "center" }} variant="h5">
            Part 6 - Complains and Contacts
          </Typography>{" "}
            <Typography>
            For any complains related to contents of this page should be submitted directly to admin@travelvela.com . For any clarification regarding the contents of the page , questions should be emailed to support@travelvela.com . Our team will get back to you within earlier possible time. 
            </Typography>{" "}
        </Paper>
    );
}

export default Success;
