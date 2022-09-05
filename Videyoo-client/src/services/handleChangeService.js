import { Component } from "react";
import "./videoService";

class VideoExtends extends Component {
  handleChange = (e) => {
    const data = [...this.state.data];
    let videos = data;
    const searchTerm = e.target.value;
    const videosFiltered = videos.filter((video) => {
      return (
        video.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        video.description.includes(searchTerm.toLowerCase())
      );
    });
    this.setState({ videos: videosFiltered });
  };
}

export default VideoExtends;
