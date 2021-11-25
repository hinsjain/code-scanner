import { Button, FormControl } from "@material-ui/core";
import React, { useState } from "react";
import QRCode from "qrcode";
import FileSaver, { saveAs } from "file-saver";
import './CsvReader.css'

function GenerateCode({ nameList }) {

	const [disabledDownload, setDisabledDownload] = useState(true)
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
		setDisabledDownload(false)
	};

	const onClickDownload = () => {
		if (imageUrl.length > 0) {
			imageUrl.map((image) => FileSaver.saveAs(`${image.url}`, `${image.name}.png`));
		}

		setImageUrl([{
			url: "",
			name: "",
		}])
	};

	return (
		<div>
			<FormControl className="generateQrCode">
				<Button type="submit" disabled={!(nameList[0])} variant="contained" color="primary" onClick={onButtonHandler}>
					Generate
				</Button>
				<br />
				<Button type="submit" disabled={disabledDownload} variant="contained" color="primary" onClick={onClickDownload}>
					Download
				</Button>
			</FormControl>
		</div>
	);
}

export default GenerateCode;
