import { Card } from '@material-ui/core'
import React from 'react'
import CsvReader from './CsvReader'
import './Upload.css'

function Upload() {
    return (
        <Card variant = "elevation" className="upload">
            <CsvReader />            
        </Card>
    )
}

export default Upload
