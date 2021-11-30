import React, { useEffect, useState } from "react";
import { Card, CardContent, Grid } from "@material-ui/core";
import QrReader from "react-qr-reader";
import "./Scanner.css";
import axios from "axios";

const baseURL = "http://localhost:3001/users";

function Scanner() {
	const [scanResultWebCam, setScanResultWebCam] = useState("");
	// const [result1, setResult1] = useState("");

	// const [post, setPost] = useState("");

	const [userList, setUserList] = useState([]);

	useEffect(() => {
		axios.get(`${baseURL}/list`).then((response) => {
			const resultData = response.data.data;
			setUserList(resultData);
		});
	}, []);

	const handleScanResult = (userData) => {
		axios.get(`${baseURL}/tracker_list`).then((response) => {
			const tracker_list = response.data.data;
            console.log(tracker_list)
			tracker_list.map((list) => {
				switch (parseInt(list.user_id) === parseInt(userData.id)) {
					case true:
						setScanResultWebCam(`${userData.full_name}: Already Verified`);
						break;
                    
					case false:
						axios.post(`${baseURL}/tracker_new`, {
							user_id: userData.id,
							verified: 1,
						});

						setScanResultWebCam(`${userData.full_name}: Verified`);
						break;
                    
                    default: break;
				}
			});
		});
	};

	const handleErrorWebCam = (error) => {
		console.log(error);
	};

    // const handleResult = (output) => {
    //     const result1 = userList.map(user => {
    //         if(parseInt(user.qr_code) === parseInt(output)){
    //            return user.full_name                    
    //         }            
    //         else {
    //             return null
    //         }            
    //     })

    //     console.log(result1)
    // }

	const handleScanWebCam = (result) => {
		setScanResultWebCam("");
		if (result) {
            let userFound = {};
            let flag = false
			userList.map((user) => {
				if (parseInt(user.qr_code) === parseInt(result)) {
					userFound = user
                    flag = true
                    //handleScanResult(userFound);
				} 
                // else {
				// 	console.log(userList);
				// 	setScanResultWebCam("Not found");
				// }
			});

            if(flag){
                handleScanResult(userFound);
            }
            
            // setScanResultWebCam(handleResult(result))
		}
	};

	return (
		<Card className="container">
			<h4 className="scanner_title">Scan QR Code</h4>
			<CardContent className="scanner__cardContent">
				<Grid>
					<QrReader
						className="qrReader"
						delay={500}
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
