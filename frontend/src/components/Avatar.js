import axios from 'axios'
import React from 'react'

function Avatar() {
    handleFileUpload = (e) => {
        this.setState({
           image: e.target.files[0]
        })
    }

    return(
        <div>
            <label>Profile Image</label>
            <input
            type="file"
            accept="image/jpeg" /// for images
            onChange={this.handleFileUpload}
            />
        </div>
    )
}

export default Avatar