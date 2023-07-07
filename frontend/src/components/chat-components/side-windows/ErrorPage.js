import React, { useState } from 'react'
import "./ErrorBox.css";
import { useSelector } from 'react-redux';

function ErrorPage() {
    const channelError = useSelector((state) => state.channel.error)
    const userError = useSelector((state) => state.user.error)
    const [errors, setErrors] = useState([])

    // channelError ? setErrors(channelError) : userError ? setErrors(userError) : setErrors([])
    // console.log(errors)
    return(
        <div>
            {/* {errors.length > 0 ? errors.map((error)=><div>{error}</div>) : null} */}
            </div>
    )
}

export default ErrorPage