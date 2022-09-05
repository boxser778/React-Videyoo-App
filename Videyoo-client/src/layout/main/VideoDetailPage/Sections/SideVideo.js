import React, { useEffect, useState } from 'react';
import Axios from 'axios';
import "./SideVideo.scss"
const apiUrl = process.env.REACT_APP_API_URL;
function SideVideo() {

    const [SideVideos, setSideVideos] = useState([])

    useEffect(() => {

        Axios.get(`${apiUrl}/videos/getVideos`)
            .then(response => {
                if(response.data.success){
                    setSideVideos(response.data.videos)
                } else {
                    alert('ERROR: Side videos import failed.')
                }
            })

    }, [])

    const renderSideVideo = SideVideos.map((video, index) => {
        
        var minutes = Math.floor(video.duration / 60);
        var seconds = Math.floor(video.duration - minutes * 60);
        
        return <div key={index} className="side-vid-con">
           
           <div style={{ width: '80%' }} className="vidTitle">
                <a href={`/video/${video._id}`} >
                    <span className='title' > {video.title} </span><br/>
                    <span className='userName'>{video.writer.name} </span><br/>
                    <span className='views'> {video.views} views </span><br/>
                </a>
            </div>
           
            <div className="img-con">
                <a href={`/video/${video._id}`} >
                    <img  src={`http://localhost:8181/${video.thumbnail}`} alt='thumbnail'/>
                    <span className='time'> {minutes} : {seconds} </span>   
                </a>
            </div>
            
            
        </div>  
    })

    return (
        <React.Fragment>
            <div style={{ marginTop:'3rem' }}></div>
            {renderSideVideo}
        </React.Fragment>
    )
}

export default SideVideo
