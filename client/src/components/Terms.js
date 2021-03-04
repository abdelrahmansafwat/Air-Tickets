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
            <Typography>
                This web site (the "Site") is published and maintained by business named Travel Vela ("travelvela"), which is incorporated and existing in accordance with the laws of Bangladesh. When you access, browse or use this Site you accept, without limitation or qualification, the terms and conditions set forth below. When you access any sub-site (whether belonging to an ‘associate’ of travelvela or otherwise) through this site, then such sub-site may have its own terms and conditions of use which is specific to such sub-site. Sub-sites may contain such additional terms and conditions of use as may be set out in such sub-site.

                These Terms and Conditions of Use and any additional terms posted on this Site together constitute the entire agreement between Travel Vela and you with respect to your use of this Site.

          </Typography>
            <Typography style={{ textAlign: "center" }} variant="h5">
                Part 1 - Service Terms
          </Typography>
            <Typography>
                {" "}
                By agreeing to these Terms of Service, you represent that you are at least the age of majority in your state or province of residence, or that you are the age of majority in your state or province of residence and you have given us your consent to allow any of your minor dependents to use this site. You may not use our products for any illegal or unauthorized purpose nor may you, in the use of the Service, violate any laws in your jurisdiction (including but not limited to copyright laws). You must not transmit any worms or viruses or any code of a destructive nature. A breach or violation of any of the Terms will result in an immediate termination of your Services.
          </Typography>
            <Typography style={{ textAlign: "center" }} variant="h5">
                Part 2 - Website Contents
            </Typography>{" "}
            <Typography>
                This Site is only for your personal use. You shall not distribute, exchange, modify, sell or transmit anything you copy from this Site, including but not limited to any text, images, audio and video, for any business, commercial or public purpose.

                As long as you comply with the terms of these Terms and Conditions of Use, Travel Vela grants you a non-exclusive, non-transferable, limited right to enter, view and use this Site. You agree not to interrupt or attempt to interrupt the operation of this Site in any way.

                Access to certain areas of the Site may only be available to registered members. To become a registered member, you may be required to answer certain questions. Answers to such questions may be mandatory and/or optional. You represent and warrant that all information you supply to us, about yourself, and others, is true and accurate.

            </Typography>{" "}
            <Typography style={{ textAlign: "center" }} variant="h5">
                Part 3 - Ownership
            </Typography>{" "}
            <Typography>
                All materials on this Site, including but not limited to audio, images, software, text, icons and such like (the "Content"), are protected by copyright under international conventions and copyright laws. You cannot use the Content, except as specified herein. You agree to follow all instructions on this Site limiting the way you may use the Content.

                There are a number of proprietary logos, service marks and trademarks found on this Site whether owned/used by Travel Vela or otherwise. By displaying them on this SiteTravel Vela is not granting you any license to utilize those proprietary logos, service marks, or trademarks. Any unauthorized use of the Content may violate copyright laws, trademark laws, the laws of privacy and publicity, and civil and criminal statutes.

                You may download such copy/copies of the Content to be used only by you for your personal use at home unless the subsite you are accessing states that you may not. If you download any Content from this Site, you shall not remove any copyright or trademark notices or other notices that go with it.

            </Typography>
            <Typography style={{ textAlign: "center" }} variant="h5">
                Part 4 - Additional rights
          </Typography>
            <Typography>
                If this Site contains bulletin boards, chat rooms, access to mailing lists or other message or communication facilities, you agree to use the same only to send and receive messages and materials that are proper and related thereto. By way of example and not as a limitation, you agree that when using the Site or any facility available herefrom, you shall not do any of the following:
<ul><li>Defame, abuse, harass, stalk, threaten or otherwise violate the legal rights (such as rights of privacy and publicity) of others</li>
                    <li>Publish, post, distribute or disseminate any defamatory, infringing, obscene, indecent or unlawful material or information</li>
                    <li>Upload or attach files that contain software or other material protected by intellectual property laws (or by rights of privacy and publicity) unless the User owns or controls the rights thereto or has received all consents therefor as may be required by law</li>
                    <li>Upload or attach files that contain viruses, corrupted files or any other similar software or programs that may damage the operation of another’s computer</li>
                    <li>Delete any author attributions, legal notices or proprietary designations or labels in any file that is uploaded</li>
                    <li>Falsify the origin or source of software or other material contained in a file that is uploaded</li>
                    <li>Advertise or offer to sell any goods or services, or conduct or forward surveys, contests or chain letters, or download any file posted by another user of a Forum that the User knows, or reasonably should know, cannot be legally distributed in such manner.</li></ul>

            </Typography>{" "}
            <Typography style={{ textAlign: "center" }} variant="h5">
                Part 5 : User's Manual
            </Typography>
            <Typography>
                You are prohibited from posting or transmitting any defamatory, libelous, obscene, pornographic, profane, threatening or unlawful material or any material that could constitute or encourage conduct that would be considered a criminal offense or give rise to civil liability, or otherwise violate any law.

                Travel Vela assumes no liability or responsibility arising from the contents of any communications containing any defamatory, erroneous, inaccurate, libelous, obscene or profane material. Travel Vela may change, edit, or remove any user material or conversations that are illegal, indecent, obscene or offensive, or that violates our policies in any way.

                Travel Vela will fully cooperate with any law enforcement authorities or court order requesting or directing Travel Vela to disclose the identity of anyone posting such materials.

          </Typography>{" "}
            <Typography style={{ textAlign: "center" }} variant="h5">
                Part 6 - Rights Reserved By Travel Vela
          </Typography>{" "}
            <Typography>
                If you send any communications or materials to the Site by electronic mail or otherwise, including any comments, data, chat, questions, suggestions or the like, all such communications are, and will be treated by Travel Vela, as non-confidential.

                You hereby give up any and all claim that any use of such material violates any of your rights including moral rights, privacy rights, proprietary or other property rights, publicity rights, rights to credit for material or ideas, or any other right, including the right to approve the way Travel Vela uses such material.

                Any material submitted to this Site may be adapted, broadcast, changed, copied, disclosed, licensed, performed, posted, published, sold, transmitted or used by Travel Vela anywhere in the world, in any medium, forever.

            </Typography>{" "}
            <Typography style={{ textAlign: "center" }} variant="h5">
                Part 7 - Transmitted Material
          </Typography>{" "}
            <Typography>
                Internet transmissions are never completely private or secure. You understand that any message or information you send to this Site may be read or intercepted by others unless there is a special notice that a particular message (for example, credit card information) is encrypted (send in code). Sending a message to Travel Vela does not cause Travel Vela to have any special responsibility to you.

                The copyright in the contents of this website belong to Travel Vela. AccordinglyTravel Vela reserves all rights. Copying of part or all the contents of this website without permission ofTravel Vela is prohibited except to the extent that such copying/printing is necessary for the purposes of availing of the paid services provided.
          </Typography>
            <Typography style={{ textAlign: "center" }} variant="h5">
                Part 8 - Disclaimer
          </Typography>{" "}
            <Typography>
                The material in this Site could include technical inaccuracies or typographical errors. Travel Vela may make changes or improvements at any time.

                The materials on this site are provided on an “As Is” basis, without warranties of any kind either expressed or implied. Tot the fullest extent permissible pursuant to applicable law, Travel Vela disclaims all warranties of merchantibility and fitness for a particular purpose.

                Travel Vela does not warrant that the functions contained in this site will be uninterrupted or error free, that defects will be corrected, or that this site or the servers that make it available are free of viruses or other harmful components, but shall endeavour to ensure your fullest satisfaction.

                Travel Vela does not warrant or make any representations regarding the use of or the result of the use of the material on the site in terms of their correctness, accuracy, reliability, or otherwise, insofar as such material is derived from other service providers such as airlines, hotel owners and tour operators.

                You acknowledge that this Website is provided only on the basis set out in these terms and conditions. Your uninterrupted access or use of this Website on this basis may be prevented by certain factors outside our reasonable control including, without limitation, the unavailability, inoperability or interruption of the Internet or other telecommunications services or as a result of any maintenance or other service work carried out on this Website. Travel Vela does not accept any responsibility and will not be liable for any loss or damage whatsoever arising out of or in connection with any ability/inability to access or to use the Site.

                You also acknowledge that through this Site, Travel Vela merely provides intermediary services in order to facilitate highest quality services to you. Travel Vela is not the last-mile service provider to you and therefore, Travel Vela shall not be or deemed to be responsible for any lack or deficiency of services provided by any person (airline, travel/tour operator, hotel, facility or similar agency) you shall engage or hire or appoint pursuant to or resulting from, the material available in this Site.

                Travel Vela will not be liable to you or to any other person for any direct, indirect, incidental, punitive or consequential loss, damage, cost or expense of any kind whatsoever and howsoever caused from out of your usage of this Site.

                Notwithstanding anything else to the contrary contained elsewhere herein or otherwise at law, Travel Vela's liability (whether by way of indemnification to you or otherwise) shall be restricted to the minimum value. However, we won't be liable for any occurrences caused for your direct interactions with other parties where the presence of Travel Vela is non-existent.

          </Typography>
            <Typography style={{ textAlign: "center" }} variant="h5">
                Part 9 - Availability

          </Typography>{" "}
            <Typography>
                The products and services displayed on the Site may not be available for purchase in your particular country or locality. The reference to such products and services on the Site does not imply or warrant that these products or services will be available at any time in your particular geographical location. You should check with your local Travel Vela authorized representative for the availability of specific products and services in your area.

          </Typography>
            <Typography style={{ textAlign: "center" }} variant="h5">
                Part 10 - Terms and Conditions of Use
          </Typography>{" "}
            <Typography>
                Travel Vela may add to, change or remove any part of these Terms and Conditions of Use at any time, without notice. Any changes to these Terms and Conditions of Use or any terms posted on this Site apply as soon as they are posted. By continuing to use this Site after any changes are posted, you are indicating your acceptance of those changes.

                Travel Vela may add, change, discontinue, remove or suspend any other Content posted on this Site, including features and specifications of products described or depicted on the Site, temporarily or permanently, at any time, without notice and without liability.

                Travel Vela reserves the right to undertake all necessary steps to ensure that the security, safety and integrity of Travel Vela's systems as well as its clients’ interests are and remain, well-protected. Towards this end, Travel Vela may take various steps to verify and confirm the authenticity, enforceability and validity of orders placed by you.

          </Typography>
            <Typography style={{ textAlign: "center" }} variant="h5">
                Part 11 - General Provisions
          </Typography>{" "}
            <Typography>
                You may travel to certain destinations which involve greater risks than others, entirely at your risk as to cost and consequences.

                Travel Vela requests you to consult your local authorities and evaluate travel prohibitions, warning, announcements, and advisories issued by them before booking travel to certain international destinations.

                By offering for sale travel to particular international destinations, Travel Vela does not represent or warrant that travel to such point is advisable or without risk. Travel Vela does not accept liability for damages, losses, or delays that may result from improper documents for entry, exit, length of stay, or from travel to such destinations.

                Travel Vela reserves its exclusive right in its sole discretion to alter, limit or discontinue the Site or any material posted herein, in any respect. Travel Vela shall have no obligation to take the needs of any User into consideration in connection therewith.

                Travel Vela reserves its right to deny in its sole discretion any user access to this Site or any portion hereof without notice.

                No waiver by Travel Vela of any provision of these Terms and Conditions shall be binding except as set forth in writing and signed by its duly authorized representative.

                If any dispute arises between you and Travel Vela during your use of the Site or thereafter, in connection with and arising from your use or attempt to use this Site, the dispute shall be referred to arbitration. The place of arbitration shall be Barishal, Bangladesh. The arbitration proceedings shall be in the Bangla language.

                These terms and conditions are governed by and shall be construed in accordance with the laws of the Bangladesh and any dispute shall exclusively be subject to the jurisdiction of the appropriate Courts situated at Barishal, Bangladesh.

          </Typography>
            <Typography style={{ textAlign: "center" }} variant="h5">
                Part 12 - Contact Information
          </Typography>{" "}
            <Typography>
                If you have any Questions about the Terms of Service should be sent to us at admin@travelvela.com. We will get back to you at the earlier possible time.

          </Typography>
        </Paper>
    );
}

export default Success;
