import React from 'react'

function Finder( value, userData ) {
    console.log(userData, value)

        let output  = ""
        if (parseInt(userData.qr_code) === parseInt(value)) {
          output = `${userData.full_name}`
        }
        else{
         output = `Not found`
        }
        return output;

    return (
        <div>
            Hello
        </div>
    )
}

export default Finder
