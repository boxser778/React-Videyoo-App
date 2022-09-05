import { getCurrentUser } from "../../../services/userService";
import PageHeader from "../../common/pageHeader";
import "./About.scss";
const About = () => {
  const user = getCurrentUser();

  const aboutBtnHanble = () => {
    if (!user) {
      window.location.replace("/login-form");
    }
    if (user) {
      window.location.replace("/video/upload");
    }
  };
  return (
    <div className="container">
      <PageHeader
        title="About Videyoo"
        subTitle="Videyoo the website that you would like to share your videos in"
      />
      <div className="about-grid">
        <div>
          <h2>Upload Video</h2>
          <hr />
          <div className="information-p">
            <p>
              upload a video is a simple task, you the user simply have to click
              on the big squre on the top to add a favorite video file ,after
              fill all the video information below, at the end simply press
              Submit to start the uploading prossess.
            </p>
            <h5>
              just remember all the video field must <br />
              be filled befor you can upload the video
            </h5>
          </div>
          <a onClick={aboutBtnHanble}>
            <button className="about-upload-btn">Upload Now</button>
          </a>
        </div>
        <img
          className="priv-img"
          src={require("../../../assets/vortex.png")}
          alt="create video"
        />
        <img
          className="cc-img"
          src={require("../../../assets/videosPriv.png")}
          alt="create video"
        />
        <div>
          <h2>The Video Preview</h2>
          <hr />
          <p className="about-p">
            at the home page you would be able to see all the videos ever
            created by any other user include yours.
          </p>
        </div>
        <div>
          <h2>Contact Us</h2>
          <hr />
          <p className="about-p">
            as a user in our website you are able to contact us with any problem
            or idea possible.
          </p>
        </div>
        <a href="/contact-page" className="contact-btn">
          <button className="about-upload-btn">Contact Us</button>
        </a>
      </div>
    </div>
  );
};

export default About;
