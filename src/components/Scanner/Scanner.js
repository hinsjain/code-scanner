import React, {useState} from 'react';
import {Card, CardContent, Grid} from '@material-ui/core';
import QrReader from 'react-qr-reader';
import './Scanner.css'


function Scanner() { 
  const [scanResultWebCam, setScanResultWebCam] =  useState('');

  const handleErrorWebCam = (error) => {
    console.log(error);
  }
  const handleScanWebCam = (result) => {
    if (result){
        setScanResultWebCam(result);
    }
   }
  return (
          <Card className="conatiner">
              <h4 className="scanner_title">Scan QR Code</h4>
              <CardContent className="scanner__cardContent">
                      <Grid>
                         <QrReader className="qrReader"
                         delay={300}
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