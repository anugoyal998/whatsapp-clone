import React, { useEffect } from 'react'
// import base64 from 'file-base64'

export default function FilePreview({file}) {
    console.log(URL.createObjectURL(file))
    return (
        <div>
            hello
            <img src={URL.createObjectURL(file)} />
        </div>
    )
}
