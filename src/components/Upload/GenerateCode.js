import { Button, Grid } from "@material-ui/core";
import React, { useState } from "react";
import QRCode from "qrcode";
import FileSaver, { saveAs } from "file-saver";

function GenerateCode({ nameList }) {
	const [imageUrl, setImageUrl] = useState([
		{
			url: "",
			name: "",
		},
	]);

	const generateQrCode = async (text) => {
		try {
			const response = await QRCode.toDataURL(text);

			const obj = {
				url: response,
				name: text,
			};
			setImageUrl((imageUrl) => [...imageUrl, obj]);
		} catch (error) {
			console.log(error);
		}
	};

	const onButtonHandler = () => {
		nameList.map((name) => {
			if (name.firstName !== undefined && name.lastname !== undefined) {
				let fullName = `${name.firstName} ${name.lastname}`;
				generateQrCode(fullName);
			}
			return null;
		});
	};

	const onClickDownload = () => {
		if (imageUrl.length > 0) {
			imageUrl.map((image) => FileSaver.saveAs(`${image.url}`, `${image.name}.png`));
		}
	};

	return (
		<div>
			<Grid item xl={4} lg={4} md={6} sm={12} xs={12}>
				<Button variant="contained" color="primary" onClick={onButtonHandler}>
					Generate
				</Button>
				<br />
				<br />
				<Button variant="contained" color="primary" onClick={onClickDownload}>
					Download
				</Button>
			</Grid>
		</div>
	);
}

export default GenerateCode;
