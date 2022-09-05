import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { List } from 'antd';
import Axios from 'axios';
import SideVideo from './Sections/SideVideo';

const apiUrl = process.env.REACT_APP_API_URL;

function VideoDetailPage(props) {

    const {videoId} =  useParams();

    const [VideoDetail, setVideoDetail] = useState([])
    const [userDetails,setUserDetails] = useState([])
  

    useEffect(() => {
        Axios.post(`${apiUrl}/videos/getVideoDetail`, {videoId:videoId})
            .then(response => {
                if(response.data.success){
                    setVideoDetail(response.data.videoDetail)
                    // setUserDetails(response.data.videoDetail.writer)
                } else {
                    alert("ERROR: Failed to get video information.")
                }      
            })
    }, [videoId])
     

    

    return (
        <div className='grid-container' >
                     <div>
                        
         {VideoDetail&& VideoDetail.filePath &&<video style={{display:"run-in"}} src={`http://localhost:8181/${VideoDetail.filePath.replace("\\","/")}`} controls/>}

                    <List.Item>
                        
                        <List.Item.Meta
                            title={VideoDetail.title}
                        />                       
                        <hr style={{color:"#fff", weight:"400"}}/>
                        <div className='vid-uname-combo'>
                            <a>
                            <img src={userDetails.url} className="account-image" alt="avatar"/>
                            <h1>{userDetails.name}</h1>
                            </a>
                        </div>
                        <br></br>
                        <div className='description'>
                            {VideoDetail.description}
                        </div>
                        </List.Item>                       
            </div>
            
               <div className='va'><SideVideo/></div>
            </div>


                    
    )
}

export default VideoDetailPage;