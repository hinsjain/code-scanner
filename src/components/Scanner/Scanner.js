import React, { useEffect, useState } from "react";
import { Card, CardContent, Grid } from "@material-ui/core";
import QrReader from "react-qr-reader";
import "./Scanner.css";
import axios from "axios";

const baseURL = "http://localhost:3001/users/list";

function Scanner() {
  const [scanResultWebCam, setScanResultWebCam] = useState("");
  const [result, setResult] = useState("");

  const [userList, setUserList] = useState([]);

  useEffect(() => {
    axios.get(baseURL).then((response) => {
      const resultData = response.data.data;
      setUserList(resultData);
    });
  }, []);

  const handleErrorWebCam = (error) => {
    console.log(error);
  };

  const handleScanWebCam = (result) => {
    if (result) {
      userList.map((user) => {
        if (parseInt(user.qr_code) === parseInt(result)) {
          setScanResultWebCam(`${user.full_name}`)
        }
      });
    }
  };

  return (
    <Card className="container">
      <h4 className="scanner_title">Scan QR Code</h4>
      <CardContent className="scanner__cardContent">
        <Grid>
          <QrReader
            className="qrReader"
            delay={300}
            onError={handleErrorWebCam}
            onScan={handleScanWebCam}
          />
          <h3>{scanResultWebCam ? `${scanResultWebCam}: Verified` : `Not found`}</h3>
        </Grid>
      </CardContent>
    </Card>
  );
}

export default Scanner;
