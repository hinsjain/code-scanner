import { Button, FormControl } from "@material-ui/core";
import { useState } from "react";
import GenerateCode from "./GenerateCode";
import TableData from "./TableData";
import './CsvReader.css'

function CsvReader() {
  const [csvFile, setCsvFile] = useState();
  const [csvArray, setCsvArray] = useState([]);

  const [buttonValue, setButtonValue] = useState(true)

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
    setButtonValue(false)
  };

  const submit = () => {
    const file = csvFile;
    const reader = new FileReader();

    reader.onload = function (e) {
      const text = e.target.result;
      processCSV(text);
    };

    reader.readAsText(file);
    setButtonValue(true)
  };

  return (
    <div  className="csvReader">
      <div>
        <FormControl className="csvReader__form">
          <p>Please upload CSV file</p>
          <input
            type="file"
            accept=".csv"
            id="csvFile"
            onChange={(e) => {
              setCsvFile(e.target.files[0]);
            }}
          ></input>
          <br />
          <Button
            type="submit"
            variant="contained"
            color="primary"
            disabled={!csvFile}
            onClick={(e) => {
              if (csvFile) submit();
            }}
          >
            Submit
          </Button>
			<br/>
          <GenerateCode nameList={csvArray} value={buttonValue} />
        </FormControl>
      </div>

      <div className="csvReader__table">
        {csvArray.length > 0 ? <TableData data={csvArray} /> : null}
      </div>
    </div>
  );
}

export default CsvReader;
