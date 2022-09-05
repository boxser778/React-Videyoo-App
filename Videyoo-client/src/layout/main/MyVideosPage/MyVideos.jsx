import React, { useEffect, useState } from "react";
import axios from "axios";
import moment from "moment";
import { getCurrentUser } from "../../../services/userService";
import PageHeader from "../../common/pageHeader";
import { MdDeleteForever } from "@react-icons/all-files/md/MdDeleteForever";
import { BsPencil } from "@react-icons/all-files/bs/BsPencil";
import { toast } from "react-toastify";
import Swal from "sweetalert2";

import { useNavigate } from "react-router-dom";
const apiUrl = process.env.REACT_APP_API_URL;

function MyVideos() {
  const user = getCurrentUser();

  if (user === null) {
    window.location.href = "/";
  }
  const [Videos, setVideos] = useState([]);

  useEffect(() => {
    axios.post(`${apiUrl}/videos/my-videos/`, user).then((response) => {
      if (response.data) {
        setVideos(response.data);
      } else {
        console.log(response);
        alert("ERROR: Video import failed.");
      }
    });
  }, []);

  const nav = useNavigate();
  const updateVideo = (id) => {
    nav(`/edit-video/${id}`);
  };

  const renderCards = Videos.map((video, index) => {
    var minutes = Math.floor(video.duration / 60);
    var seconds = Math.floor(video.duration - minutes * 60);

    const deleteVideo = () => {
      Swal.fire({
        title: "Are You Sure You Want To Delete This Video?",
        showCancelButton: true,
        confirmButtonText: "Delete!",
        confirmButtonColor: "#dc3545",
      }).then(async (result) => {
        if (result.isConfirmed) {
          axios.delete(`${apiUrl}/videos/delete-one/${video._id}`).then(() => {
            toast.success(`${video.title} Deleted!`);
            window.location.replace("/my-videos");
          });
        }
      });
    };

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
        <div className="video-card-info-container">
          <div className="my-vid-layer">
            <h3 className="h3-title">{video.title} </h3>{" "}
            <div className="lower-info">
              <span>{moment(video.createdAt).format("MMM Do YY")} </span> &bull;
              <span> {video.views} views </span>
            </div>{" "}
          </div>
          <div className="video-actions">
            <button onClick={deleteVideo}>
              <MdDeleteForever className="deleteIcon" />
            </button>

            <button onClick={() => updateVideo(video._id)}>
              <BsPencil className="updateIcon" />
            </button>
          </div>
        </div>
      </div>
    );
  });

  return (
    <div>
      <PageHeader
        title="Your Videos"
        subTitle="Check The Videos You Uploaded"
      />
      <div className="video-cards">{renderCards}</div>
    </div>
  );
}

export default MyVideos;
