import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { channelSearchSelector } from '../features/channel/ChannelSelectors';
import "./SearchChannel.css"
import { clearSearch } from '../features/channel/ChannelSlice';
function SearchChannel() {
    const dispatch = useDispatch()
    const channelSearchResult = useSelector(channelSearchSelector)
    function handleClearSearch() {
        dispatch({type: "channel/clear", payload: []})
    }
    return(
        <div id="search">
            <p>Search Results:</p>
            {channelSearchResult && channelSearchResult.map(({id,name})=><Link to={"/channel/"+id} onClick={()=>clearSearch([])} key={id}>
                {/* <img src={image ? image : logo} style={{height: "50px", width: "50px"}}/> */}
                <p>{name}</p></Link>)}
        <button onClick={handleClearSearch}>X</button>
        </div>
    );
}

export default SearchChannel