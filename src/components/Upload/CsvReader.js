import { Table, TableBody, TableCell, TableRow } from "@material-ui/core";
import { useState } from "react";
import GenerateCode from "./GenerateCode";

function CsvReader() {
	const [csvFile, setCsvFile] = useState();
	const [csvArray, setCsvArray] = useState([]);

	const processCSV = (str, delim = ",") => {
		const headers = str.slice(0, str.indexOf("\n")).split(delim);
		const rows = str.slice(str.indexOf("\n") + 1).split("\n");

		const newArray = rows.map((row) => {
			const values = row.split(delim);
			const eachObject = headers.reduce((obj, header, i) => {
				obj[header] = values[i];
				return obj;
			}, {});
			return eachObject;
		});

		setCsvArray(newArray);
	};

	const submit = () => {
		const file = csvFile;
		const reader = new FileReader();

		reader.onload = function (e) {
			const text = e.target.result;
			processCSV(text);
		};

		reader.readAsText(file);
	};

	return (
		<form id="csv-form">
			<input
				type="file"
				accept=".csv"
				id="csvFile"
				onChange={(e) => {
					setCsvFile(e.target.files[0]);
				}}
			></input>
			<br />
			<button
				onClick={(e) => {
					e.preventDefault();
					if (csvFile) submit();
				}}
			>
				Submit
			</button>

            {csvArray.length > 0 ? (
				<>
					<Table>
						<TableBody>
                                <TableRow>
									<TableCell>First Name</TableCell>
									<TableCell>Last name</TableCell>
								</TableRow>
							{csvArray.map((item, i) => (
								<TableRow key={i}>
									<TableCell>{item.firstName}</TableCell>
									<TableCell>{item.lastname}</TableCell>
								</TableRow>
							))}
						</TableBody>
					</Table>
				</>
			) : null}

			<GenerateCode nameList={csvArray} />
		</form>
	);
}

export default CsvReader;
