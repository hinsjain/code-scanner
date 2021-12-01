import React, { useEffect, useState } from "react";
import { Card, CardContent, Grid } from "@material-ui/core";
import QrReader from "react-qr-reader";
import "./Scanner.css";
import axios from "axios";
import baseURL from '../util'

function Scanner() {
  const [scanResultWebCam, setScanResultWebCam] = useState("");

  const [userList, setUserList] = useState([]);

  useEffect(() => {
    axios.get(`${baseURL}/list`).then((response) => {
      const resultData = response.data.data;
      setUserList(resultData);
    });
  }, []);

  const handleErrorWebCam = (error) => {
    console.log(error);
  };

  const handleResult = (output) => {
    //To check if user is present in the created user's QR
    const scannedUserDetails = userList.map((user) => {
      if (parseInt(user.qr_code) === parseInt(output)) {
        return user;
      } else {
        return null;
      }
    });

    scannedUserDetails.map((user) => {
      if (user !== null) {
        //To check if user is verified or not
        axios.get(`${baseURL}/tracker_list/${user.id}`).then((response) => {
          const trackerList = response.data.data;

          if (trackerList.length > 0) {
            setScanResultWebCam(`${user.full_name}: Already Verified`);
          } else {
            axios.post(`${baseURL}/tracker_new`, {
              user_id: user.id,
              verified: 1,
            });
            setScanResultWebCam(`${user.full_name}: Verified`);
          }
        });
      } else {
        setScanResultWebCam(`Not found`); //Not present in the QR created list
      }
    });
  };

  const handleScanWebCam = (result) => {
    setScanResultWebCam("");
    if (result) {
      handleResult(result);
    }
  };

  return (
    <Card className="container">
      <h4 className="scanner_title">Scan QR Code</h4>
      <CardContent className="scanner__cardContent">
        <Grid>
          <QrReader
            className="qrReader"
            delay={2000}
            onError={handleErrorWebCam}
            onScan={handleScanWebCam}
          />
          <h3>{scanResultWebCam}</h3>
        </Grid>
      </CardContent>
    </Card>
  );
}

export default Scanner;
