import { Button, FormControl } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import QRCode from "qrcode";
import './CsvReader.css'
import JSZip from "jszip";
import JSZipUtils from "jszip-utils";
import saveAs from "save-as";

function GenerateCode({ nameList, value }) {

	const [disabledDownload, setDisabledDownload] = useState(true)
    const [disabledGenerate, setDisabledGenerate] = useState(true)
	const [imageUrl, setImageUrl] = useState([
		{
			url: "",
			name: "",
		},
	]);

    useEffect( () => {
        setDisabledGenerate(value)
    }, [value])

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
        setDisabledGenerate(!value)
	};

    function generateZip(imageUrls) {
        const zip = new JSZip();
        let count = 0;
        const zipFilename = "QR.zip";
    
        imageUrls.forEach(async function (image) {
            const filename = image.name
            try {
                const img = await JSZipUtils.getBinaryContent(`${image.url}`);
                zip.file(`${filename}.png`, img, { base64: true });
                count++;
                if (count === imageUrls.length) {
                    zip.generateAsync({ type: "blob" }).then(function (content) {
                        saveAs(content, zipFilename);
                    });
                }
            } catch (err) {
                console.log(err);
            }
        });
    }

	const onClickDownload = () => {
		// if (imageUrl.length > 0) {
		// 	imageUrl.map((image) => FileSaver.saveAs(`${image.url}`, `${image.name}.png`));
		// }
        generateZip(imageUrl)

        setImageUrl( (imageUrl) => [])

        setDisabledDownload(true)
	};

	return (
		<div>
			<FormControl className="generateQrCode">
				<Button type="submit" disabled={disabledGenerate} variant="contained" color="primary" onClick={onButtonHandler}>
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
