import { Card } from '@material-ui/core'
import React from 'react'
import CsvReader from './CsvReader'
import './Upload.css'

function Upload() {
    return (
        <Card variant = "elevation" className="upload">
            {/* <p>Please upload excel</p>
            <input className="upload__select" type="file" accept=".csv, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel" />
            <br/>
            <Button type="submit" className="upload__button" variant="contained" color = "primary" >Upload</Button> */}

            <CsvReader />
            
        </Card>
    )
}

export default Upload
