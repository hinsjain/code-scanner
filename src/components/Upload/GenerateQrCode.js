import JSZip from "jszip";
import JSZipUtils from "jszip-utils";
import saveAs from "save-as";
import React from "react";

function GenerateQrCode({ urls }) {
	console.log(urls);
	const zip = new JSZip();
	let count = 0;
	const zipFilename = "QR.zip";

	urls.forEach(async function (data) {
		const filename = data.name
		try {
			const file = await JSZipUtils.getBinaryContent(data.url);
			zip.file(filename, file, { binary: true });
			count++;
			if (count === urls.length) {
				zip.generateAsync({ type: "blob" }).then(function (content) {
					saveAs(content, zipFilename);
				});
			}
		} catch (err) {
			console.log(err);
		}
	});
}

export default GenerateQrCode;