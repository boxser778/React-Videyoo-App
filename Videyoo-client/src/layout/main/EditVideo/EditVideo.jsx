import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import Axios from "axios";
import { toast } from "react-toastify";
import PageHeader from "../../common/pageHeader";
import "./EditVideo.scss";

const apiUrl = process.env.REACT_APP_API_URL;

const EditVideo = () => {
  const { videoId } = useParams();

  const [Private, setPrivate] = useState();
  const [Category, setCategory] = useState();
  const [Title, setTitle] = useState("");
  const [Des, setDescription] = useState("");

  const PrivateOptions = [
    { value: 0, label: "Private" },
    { value: 1, label: "Public" },
  ];

  const CategoryOptions = [
    { value: 0, label: "Film & Animation" },
    { value: 1, label: "Autos & Vehicles" },
    { value: 2, label: "Music" },
    { value: 3, label: "Pets & Animals" },
    { value: 4, label: "Sports" },
  ];

  const onPrivateChange = (e) => {
    setPrivate(e.currentTarget.value);
  };

  const onCategoryChange = (e) => {
    setCategory(e.currentTarget.value);
  };

  useEffect(() => {
    Axios.post(`${apiUrl}/videos/getVideoDetail`, { videoId: videoId }).then(
      (response) => {
        if (response.data.success) {
          setTitle(response.data.videoDetail.title);
          setDescription(response.data.videoDetail.description);
        } else {
          alert("ERROR: Failed to get video information.");
        }
      }
    );
  }, [videoId]);

  function editVideo(event) {
    event.preventDefault();

    const title = event.target[0].value;
    const description = event.target[1].value;
    const category = event.target[2].value;
    const privacy = event.target[3].value;

    if (title === "") {
      throw toast.error(`Video Title Cant Be Empty!`);
    }

    if (description === "") {
      throw toast.error(`Video Description Cant Be Empty!`);
    }

    Axios.put(`${apiUrl}/videos/${videoId}`, {
      title: title,
      description: description,
      category: category,
      privacy: privacy,
    }).then((response) => {
      if (response.data) {
        toast.success("Update Video Successfuly!");
      } else {
        console.log(response);
        alert("ERROR: Video import failed.");
      }
    });
  }

  return (
    <>
      <PageHeader
        title="Edit Video"
        subTitle="to update your video please fill all the fields and select all the boxes"
      />
      <form onSubmit={editVideo}>
        <div className="form-g">
          <label>Title</label>
          <input
            type="text"
            className="form-control"
            value={Title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Give a title to your video"
          />
          <label>Description</label>
          <input
            type="text"
            className="form-control"
            value={Des}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Describe your video"
          />
          <div className="search_categories">
            <div className="select">
              <select onChange={onPrivateChange}>
                {PrivateOptions.map((item, index) => (
                  <option key={index} value={item.value}>
                    {item.label}
                  </option>
                ))}
              </select>
            </div>
          </div>
          <br />
          <div className="search_categories">
            <div className="select">
              <select onChange={onCategoryChange}>
                {CategoryOptions.map((item, index) => (
                  <option key={index} value={item.value}>
                    {item.label}
                  </option>
                ))}
              </select>
            </div>
          </div>
          <br />
          <button type="submit" className="btn btn-primary">
            Submit
          </button>
        </div>
      </form>
    </>
  );
};

export default EditVideo;
