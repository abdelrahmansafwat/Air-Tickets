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
import logo from "../resources/logo.png";
const _ = require("underscore");

const styles = StyleSheet.create({
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
});

function Print(props) {
  console.log(props);
  var reservation = props.reservation;

  return (
    <Document>
      <Page size="A4" style={styles.body}>
        <Image style={styles.image} src={logo} />
        <View style={styles.section}>
          <Text style={styles.department}>Booking Details</Text>
          <Text style={styles.text}>
            Client:{" "}
            {reservation.passengers[0].firstName +
              " " +
              reservation.passengers[0].lastName}
          </Text>
          <Text style={styles.text}>
            Trip Type: {reservation.oneWay ? "One Way" : "Round Trip"}
          </Text>
          <Text style={styles.text}>
            Number of Travellers: {reservation.passengers.length}
          </Text>
        </View>
        <View style={styles.section}>
          <Text style={styles.department}>Flight Details</Text>
          <Text style={styles.text}>
            {reservation.selectedGoingTicket[0].planeCode.substring(0, 2) ===
            "BG"
              ? "Biman Airlines"
              : reservation.selectedGoingTicket[0].planeCode.substring(0, 2) ===
                "BS"
              ? "US Bangla"
              : "Novo Air"}
          </Text>
          <Text style={styles.text}>
            {reservation.selectedGoingTicket[0].planeCode}
          </Text>
          <Text style={styles.text}>
            From: {reservation.selectedGoingTicket[0].from}
          </Text>
          <Text style={styles.text}>
            To: {reservation.selectedGoingTicket[0].into}
          </Text>
          <Text style={styles.text}>
            Date: {reservation.departureDate.split("T")[0]}
          </Text>
          <Text style={styles.text}>
            Take off: {reservation.selectedGoingTicket[0].take_off}
          </Text>
          <Text style={styles.text}>
            Landing: {reservation.selectedGoingTicket[0].landing}
          </Text>
        </View>
        <View style={styles.section}>
          <Text style={styles.department}>Passenger Details</Text>
          {reservation.passengers.map((passenger, index) => {
            return (
              <View>
                <Text style={styles.text}>Passenger #{index + 1}</Text>
                <Text style={styles.text}>
                  Name: {passenger.firstName + " " + passenger.lastName}
                </Text>
                <Text style={styles.text}>
                  Date of Birth: {passenger.dateOfBirth}
                </Text>
                <Text style={styles.text}>Gender: {passenger.gender}</Text>
                <Text style={styles.text}>Email: {passenger.email}</Text>
                <Text style={styles.text}>Phone: {passenger.phone}</Text>
              </View>
            );
          })}
        </View>
        <View style={styles.section}>
          <Text style={styles.department}>Pricing Details</Text>
          <Text style={styles.text}>Total: {reservation.total}</Text>
        </View>
        <Text
          style={styles.pageNumber}
          render={({ pageNumber, totalPages }) =>
            `${pageNumber} / ${totalPages}`
          }
          fixed
        />
      </Page>
    </Document>
  );
}

export default Print;
