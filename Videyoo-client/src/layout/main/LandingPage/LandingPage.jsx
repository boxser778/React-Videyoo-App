import React, { useEffect, useState } from "react";
import axios from "axios";
import moment from "moment";
import PageHeader from "../../common/pageHeader";
import "../../../scss/videoVisualSetup.scss";

const apiUrl = process.env.REACT_APP_API_URL;

function LandingPage() {
  const [Videos, setVideos] = useState([]);

  useEffect(() => {
    axios.get(`${apiUrl}/videos/getVideos`).then((response) => {
      if (response.data.success) {
        setVideos(response.data.videos);
      } else {
        alert("ERROR: Video import failed.");
      }
    });
  }, []);

  const renderCards = Videos.map((video, index) => {
    let minutes = Math.floor(video.duration / 60);
    let seconds = Math.floor(video.duration - minutes * 60);

    return (
      <div key={index} className="videos-col">
        <div style={{ position: "relative" }}>
          <a href={`/video/${video._id}`}>
            <img
              alt="thumbnail"
              src={`http://localhost:8181/${video.thumbnail}`}
              className="thumbnailImage"
            />
            <div className="duration">
              <span>
                {" "}
                {minutes} : {seconds}{" "}
              </span>
            </div>
          </a>
        </div>
        <br />
        <div className="card-info-container">
          <div className="text-layer">
            <h2>{video.title}</h2>
            <h1 className="writername">{video.writer.name} </h1>
            <span className="creation-date">
              {moment(video.createdAt).format("MMM Do YY")}{" "}
            </span>{" "}
            &bull;
            <span className="views"> {video.views} views</span>{" "}
          </div>
          <div className="avatar-layer">
            <img src={video.writer.url} alt="account avatar" />
          </div>
        </div>
      </div>
    );
  });

  return (
    <div>
      <PageHeader
        title="Videyoo Share Your Videos Here"
        subTitle="Enjoying sharing your creative videos? upload and share with others"
      />
      <div className="video-cards">{renderCards}</div>
    </div>
  );
}

export default LandingPage;
