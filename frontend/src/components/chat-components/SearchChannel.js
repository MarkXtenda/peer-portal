import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import logo from '../chat-components/logo.svg'
import { channelSearchSelector } from '../features/channel/ChannelSelectors';
import "./SearchChannel.css"
import { clearSearch, getOneChannel } from '../features/channel/ChannelSlice';

function SearchChannel() {
    const dispatch = useDispatch()
    const channelSearchResult = useSelector(channelSearchSelector)

    function handleAddUserChannel(channelId) {
        dispatch(clearSearch([]))
        console.log(channelId)
        dispatch(getOneChannel(channelId))
    }
    return(
        <div id="search">
            <p>Search Results:</p><br/>
            {channelSearchResult && channelSearchResult.map(({id,image, name})=>
            <div onClick={()=>handleAddUserChannel(id)} key={id}>
                <img src={image ? image : logo} style={{height: "50px", width: "50px"}}/>
                <p>{name}</p>
            </div>
            // <Link to={"/channel/"+id} onClick={()=>clearSearch([])} key={id}>
            //     <img src={image ? image : logo} style={{height: "50px", width: "50px"}}/>
            //     <p>{name}</p>
            // </Link>
            )}
        <button onClick={()=>dispatch(clearSearch([]))}>X</button>
        </div>
    );
}

export default SearchChannel