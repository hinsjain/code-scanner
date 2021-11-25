import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from "@material-ui/core";
import './CsvReader.css'

function TableData({ data }) {
  return (
    <>
    <div className="table__data">
      <Table className="tabledata">
        <TableHead>
          <TableRow>
            <TableCell className="tabledata__cell">First Name</TableCell>
            <TableCell className="tabledata__cell">Last name</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map((item, i) => (
            <TableRow key={i}>
              <TableCell>{item.firstName}</TableCell>
              <TableCell>{item.lastname}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      </div>
    </>
  );
}

export default TableData;
